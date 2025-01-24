from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser, Lead
from .serializers import UserSerializer, LeadSerializer
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
import json
from django.middleware.csrf import get_token
from rest_framework import generics, permissions

class SignupView(APIView):
    def post(self, request):
        data = request.data
        errors = {}

        email = data.get('email')
        password1 = data.get('password1')
        password2 = data.get('password2')

        # Validation checks
        if not email:
            errors['email'] = 'Email is required.'
        if not password1:
            errors['password1'] = 'Password is required.'
        if not password2:
            errors['password2'] = 'Please confirm your password.'

        if password1 and password2 and password1 != password2:
            errors['password_mismatch'] = 'Passwords do not match.'

        if email and CustomUser.objects.filter(email=email).exists():
            errors['email_exists'] = 'Email already exists.'

        # If no errors, create the user
        if not errors:
            username = email.split('@')[0]
            user = CustomUser.objects.create_user(
                email=email,
                username=username,
                password=password1
            )
            return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)

        return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

def login_view(request):
    if request.method == 'GET':
        # Return a CSRF token for the frontend
        csrf_token = get_token(request)
        print("CSRF token sent to frontend:", csrf_token)
        return JsonResponse({"csrfToken": csrf_token})
    if request.method == 'POST':
        print(f"Received CSRF token: {request.headers.get('X-CSRFToken')}")
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        errors = {}

        if not email:
            errors['email'] = 'Email is required.'
        if not password:
            errors['password'] = 'Password is required.'
        
        if email and password:
            user = authenticate(request, email=email, password=password)
            if user:
                login(request, user)
                return JsonResponse({'message': 'Login successful'}, status=200)
            else:
                errors['invalid_credentials'] = 'Invalid email or password.'

        return JsonResponse({'errors': errors}, status=400)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)

#################################### Leads #######################################################
# Create Lead
class LeadCreateView(generics.CreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

# List Leads
class LeadListView(generics.ListAPIView):
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Lead.objects.filter(created_by=self.request.user)

# Retrieve Single Lead
class LeadDetailView(generics.RetrieveAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]

# Update Lead
class LeadUpdateView(generics.UpdateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]

# Delete Lead
class LeadDeleteView(generics.DestroyAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]

