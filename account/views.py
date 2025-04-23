from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.core.mail import send_mail
from .models import CustomUser
from .serializers import SignupSerializer
from django.conf import settings
from django.http import JsonResponse

class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Send welcome email
            send_mail(
                subject='Welcome to Tour Guide!',
                message=f"Hello {user.email},\n\nThanks for signing up with Tour Guide. Get ready to explore the wonders with us!",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[user.email],
                fail_silently=False,
            )

            return Response({"message": "Signup successful"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'message': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=email, password=password)

        if user is not None:
            # ✅ Store session data
            request.session['userId'] = user.id
            request.session['email'] = user.email
            request.session['role'] = user.role

            # ✅ Send login success email
            send_mail(
                subject='Login Notification - Tour Guide',
                message=f"Hello {user.email},\n\nYou have successfully logged in to Tour Guide!",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[user.email],
                fail_silently=False,
            )

            print("SESSION DATA:", request.session.items())

            return Response({
                'email': user.email,
                'role': user.role,
                "userId": user.id,
            }, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)



class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
    
class ContactFormView(APIView):
    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        message = request.data.get('message')

        if not name or not email or not message:
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            send_mail(
                subject=f'Contact Form Submission from {name}',
                message=f'Name: {name}\nEmail: {email}\n\nMessage:\n{message}',
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=['tourguide1144@gmail.com'],  # 👈 replace with your Tour Guide email
                fail_silently=False,
            )
            return Response({"message": "Message sent successfully!"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Failed to send message: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def register_local_guide(request):
    if request.method == 'POST':
        user_id = request.POST.get('userId')

        if not user_id:
            return JsonResponse({'error': 'User ID missing from request'}, status=401)

        try:
            user = get_user_model().objects.get(id=user_id)
        except get_user_model().DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

        # Update user info...
        user.motive = request.POST.get('motive', '')
        user.profile_picture = request.FILES.get('profilePicture')
        user.about_me = request.POST.get('aboutMe', '')
        user.hourly_rate = request.POST.get('hourlyRate') or None
        user.city = request.POST.get('city', '')
        user.languages = request.POST.get('languages', '')
        user.activities = request.POST.get('activities', '')

        user.add_role('local')
        user.save()

        return JsonResponse({'message': 'Registration successful'}, status=200)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def get_local_guide_name(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
        roles = user.role.split(',')

        if 'local' in roles:
            return JsonResponse({
                'name': user.name,
                'role': user.role  # now also sending full role info
            }, status=200)
        else:
            return JsonResponse({
                'error': 'User is not a local guide',
                'role': user.role  # still return role for frontend decisions
            }, status=403)

    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

