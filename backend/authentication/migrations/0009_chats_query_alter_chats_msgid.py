# Generated by Django 4.2.2 on 2024-01-13 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0008_alter_chatsession_userid'),
    ]

    operations = [
        migrations.AddField(
            model_name='chats',
            name='query',
            field=models.CharField(default='na', max_length=1000),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='chats',
            name='msgID',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]
