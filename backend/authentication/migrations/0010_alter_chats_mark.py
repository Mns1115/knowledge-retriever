# Generated by Django 4.2.2 on 2024-01-13 11:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0009_chats_query_alter_chats_msgid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chats',
            name='mark',
            field=models.BooleanField(null=True),
        ),
    ]
