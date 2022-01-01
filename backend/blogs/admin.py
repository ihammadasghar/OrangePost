from django.contrib import admin
from .models import Blog,Comment, Profile
from rest_framework.authtoken.admin import TokenAdmin

TokenAdmin.raw_id_fields = ['user']
# Register your models here.
admin.site.register(Blog)
admin.site.register(Profile)
admin.site.register(Comment)
