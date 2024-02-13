from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Blog, Comment, Profile

class BlogSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    author_profile = serializers.ReadOnlyField(source='author.profile.id')
    comments = serializers.HyperlinkedRelatedField(many=True, view_name='comment-detail', read_only=True)
    class Meta:
        model = Blog
        fields = ['id', 'title', 'description', 'author','author_profile', 'image', 'comments', 'created']

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Comment
        fields = ['id', 'text', 'author', 'blog', 'reply_to', 'created']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    blogs = serializers.HyperlinkedRelatedField(many=True, view_name='blog-detail', read_only=True)
    picture = serializers.ReadOnlyField(source='profile.picture')
    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'picture', 'blogs']

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Profile
        fields = ['username', 'picture', 'bio']