from rest_framework import serializers
from .models import CustomUser, Lead

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username', 'created_at']

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'
        extra_kwargs = {
            'created_by': {'read_only': True}  # Ensures 'created_by' is not required in POST data
        }
