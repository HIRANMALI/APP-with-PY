# chat/api_views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import ChatRoom, Message
from django.contrib.auth import get_user_model
from .serializers import MessageSerializer

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def guide_list(request):
    guides = User.objects.filter(is_guide=True)
    data = [{
        'id': guide.id,
        'name': guide.get_full_name(),
        'specialty': guide.guideprofile.specialty if hasattr(guide, 'guideprofile') else 'Local Guide'
    } for guide in guides]
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_chat_room(request):
    guide_id = request.data.get('guide_id')
    try:
        guide = User.objects.get(id=guide_id, is_guide=True)
    except User.DoesNotExist:
        return Response({'error': 'Guide not found'}, status=404)
    
    room, created = ChatRoom.objects.get_or_create(
        user=request.user,
        guide=guide
    )
    return Response({'room_id': room.id})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_chat_messages(request, room_id):
    try:
        room = ChatRoom.objects.get(id=room_id)
        if room.user != request.user and room.guide != request.user:
            return Response({'error': 'Not authorized'}, status=403)
        
        messages = room.messages.all().order_by('timestamp')
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    except ChatRoom.DoesNotExist:
        return Response({'error': 'Chat room not found'}, status=404)