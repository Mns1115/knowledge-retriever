# Generated by Django 4.2.2 on 2024-01-11 10:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_chatsession_chats'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatsession',
            name='file',
            field=models.FileField(upload_to=''),
        ),
    ]
