# Generated by Django 4.2.2 on 2024-01-13 11:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0010_alter_chats_mark'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chats',
            name='senderID',
            field=models.BigIntegerField(),
        ),
    ]
