from typing import Text
from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    picture = models.ImageField(null=True, blank=True)
    bio = models.CharField(max_length=200,blank=True ,null=True)

class Blog(models.Model):
    title = models.CharField(max_length=70)
    description = models.CharField(max_length=500)
    image = models.ImageField(upload_to='uploads/images', blank=False, null=False)
    author = models.ForeignKey(User, related_name='blogs', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title
    class Meta:
        ordering = ['created']

class Comment(models.Model):
    text = models.CharField(max_length=400)
    author = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    blog = models.ForeignKey(Blog, related_name='comments', on_delete=models.CASCADE)
    reply_to = models.ForeignKey('self',  default=None, blank=True ,null=True,  on_delete=models.SET_NULL)
    created = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.text
    class Meta:
        ordering = ['created']

