from urllib.parse import urlencode
from rest_framework import serializers
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.views import APIView
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.response import Response
from .mixins import PublicApiMixin, ApiErrorsMixin,ApiAuthMixin
from .utils import google_get_access_token, google_get_user_info, generate_tokens_for_user
from .models import User, Chats,ChatSession
from rest_framework import status
from .serializers import FileUploadSerializer
import jwt,json
import os 
import social_login.settings as settings
from django.core import serializers
from django.http import JsonResponse 

import requests
import os
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings, HuggingFaceEmbeddings
from langchain.vectorstores import FAISS, Chroma
from langchain.document_loaders import DirectoryLoader
import chromadb
import gradio as gr
from .llama import query_llama2_EP, query_google_API
# Hugging Face api token
HUGGINGFACEHUB_API_TOKEN = "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"

def initialize_embeddings():
    model_identifier = "sentence-transformers/all-mpnet-base-v2"
    print(">>>Embeddings setup completed successfully<<<")
    return HuggingFaceEmbeddings(model_name=model_identifier)

def process_and_embed_docs(dir_path, hf_model):
    chroma_instance = chromadb.Client()
    doc_loader = DirectoryLoader(dir_path)
    loaded_docs = doc_loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=0)
    split_docs = splitter.split_documents(loaded_docs)
    database = Chroma.from_documents(documents=split_docs, embedding=hf_model)
    print(">>>Embedding and chunking process completed successfully<<<")
    return database

def concatenate_documents(document_list):
    try:
        combined_content = "".join([doc.page_content for doc in document_list])
        print(">>>Few-shot prompting process completed successfully<<<")
        print(">>>Prompt engineering process completed successfully<<<")
    except:
        combined_content="No files are found having the answer. Kindly display a error message"
    return combined_content

hf = initialize_embeddings()

# Replace the path below with the path to your dataset
example_path = "./media/media"
db = process_and_embed_docs(example_path, hf)

endpoint = 'YOUR_ENDPOINT_URL_HERE'


def process_query(query, file):
    retrieved_docs = db.similarity_search(query)
    # print(retrieved_docs)
    for docs in retrieved_docs:
      if file in str(docs.metadata['source']):
          retrieved_docs= docs
          print("Only file:",docs)
    sourceout="Answers are found from the following source files:\n"
    combined_context = concatenate_documents(retrieved_docs)
    # print(combined_context)
    answer = query_google_API(combined_context, query)
    return answer.replace("\\n", "\n"),combined_context


# print(process_query("where did divij did his internship?",'media/media/Resume_DS.pdf'))


def getUserIDFromAccessToken(access_token):
    decoded = jwt.decode(access_token,algorithms=['HS256'], options={"verify_signature": False})
    return decoded["user_id"]

class gethistory(ApiErrorsMixin, APIView):
    def post(self, request, *args, **kwargs):
        print("Entered query api")
        try:
            access= (request.headers['Authorization'].split(' '))[1]
            print(access)
            userid= getUserIDFromAccessToken(access_token=access)
            print(userid)
            sessionid= ChatSession.objects.get(userID=userid,isActive= True)
            print(sessionid)
            chats=Chats.objects.filter(senderID=userid, sessionID= sessionid)
            dict= serializers.serialize('json',list(chats))
            return JsonResponse(list(chats.values()),
                    safe=False,
                )
        except Exception as e:
            print("Error occurred",type(e),":",e)
            return Response({'error':'Error occured while authenticating'},status=status.HTTP_401_UNAUTHORIZED)

class query(ApiErrorsMixin, APIView):
    def post(self, request, *args, **kwargs):
        print("Entered query api")
        try:
            access= (request.headers['Authorization'].split(' '))[1]
            print(access)
            userid= getUserIDFromAccessToken(access_token=access)
            print(userid)
            print(request.data)
            query = (request.data['query'])
            obj= ChatSession.objects.get(userID= userid, isActive=True)
            file= 'media/'+str(obj.file)
            response= process_query(query,file)
            chat=Chats(msg= response[0], query= query,senderID= userid, sessionID= obj )
            chat.save()
            return Response({'message':response,
                     },
                    status=status.HTTP_201_CREATED
                )
        except Exception as e:
            print("Error occurred",type(e),":",e)
            return Response({'error':'Error occured while authenticating'},status=status.HTTP_401_UNAUTHORIZED)




class newSession( ApiErrorsMixin, APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = FileUploadSerializer

    def post(self, request, *args, **kwargs):
        print("Entered New session post request\n")
        try:
            access= (request.headers['Authorization'].split(' '))[1]
            print(access)
            userid= getUserIDFromAccessToken(access_token=access)
            print(userid)
            serializer = self.serializer_class(data=request.data)
            print(request.data)
            if serializer.is_valid():
                # you can access the file like this from serializer
                # uploaded_file = serializer.validated_data["file"]

                user= User.objects.get(id=userid)
                sessions= ChatSession.objects.filter(userID=userid)
                for each in sessions:
                    each.isActive=False
                    file= str(settings.MEDIA_ROOT)+'/'+str(each.file)
                    print(file)
                    if os.path.exists(file):
                        os.remove(file) # removing previous files
                    each.save() # turning all of the sessions as false
                    
                print(sessions)
                serializer.save(userID= user,isActive=True)
                sessionid= ChatSession.objects.get(userID= user, isActive=True)
                return Response(
                    {'file':serializer.data['file'],
                     'sessionid':sessionid.pk}
                     ,
                    status=status.HTTP_201_CREATED
                )
            
        except Exception as e:
            print("Error occurred",type(e),":",e)
            return Response({'error':'Error occured while authenticating'},status=status.HTTP_401_UNAUTHORIZED)
        
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    

