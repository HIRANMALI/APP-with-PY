# backend/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser as User  # ✅ CORRECT
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.middleware import csrf
from django.contrib.auth import get_user_model
from .serializers import SignupSerializer
from rest_framework_simplejwt.views import TokenRefreshView


User = get_user_model()

class SignupView(APIView):
    def post(self, request):
        print("Incoming signup data:", request.data)

        serializer = SignupSerializer(data=request.data)
        if not serializer.is_valid():
            print("Serializer errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()
        print("User created with ID:", user.id)

        refresh = RefreshToken.for_user(user)
        response = Response({
            "access": str(refresh.access_token),
            "username": user.name,
        }, status=status.HTTP_201_CREATED)
        response.set_cookie(
            key='refresh',
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite='None',
             max_age=3600 * 24 * 7,
            domain='localhost',
            path='/'
        )
        return response


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            response = Response({
                "access": str(refresh.access_token),
                "username": user.username,
            }, status=200)
            response.set_cookie(
                key='refresh',
                value=str(refresh),
                httponly=False,
                secure=False,  # True in production
                samesite='None',
                max_age=3600 * 24 * 7,
                domain='localhost',
                path='/'
            )
            return response
        return Response({"error": "Invalid credentials"}, status=401)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get("name")  # changed from "username"
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            response = Response({
                "access": str(refresh.access_token),
                "username": user.username,
            }, status=200)
            response.set_cookie(
                key='refresh',
                value=str(refresh),
                httponly=True,
                secure=False,  # True in production
                samesite='None'
            )
            return response
        return Response({"error": "Invalid credentials"}, status=401)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.COOKIES.get('refresh')
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception:
                pass

        response = Response({"detail": "Logout successful"}, status=200)
        response.delete_cookie('refresh')
        return response

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        print("🍪 Refresh cookie in request:", request.COOKIES.get('refresh'))  # Debug line
        refresh_token = request.COOKIES.get('refresh')
        if refresh_token:
            request.data['refresh'] = refresh_token
        else:
            print("⚠️ No refresh token cookie found.")
        return super().post(request, *args, **kwargs)