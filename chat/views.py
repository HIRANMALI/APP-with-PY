from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import ChatRoom, Message
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model

User = get_user_model()

@login_required
def chat_room(request, guide_id):
    guide = get_object_or_404(User, id=guide_id, is_guide=True)  # Assuming you have is_guide field
    room, created = ChatRoom.objects.get_or_create(user=request.user, guide=guide)
    messages = room.messages.all().order_by('timestamp')
    return render(request, 'chat/room.html', {
        'room': room,
        'messages': messages,
        'guide': guide,
    })

@login_required
def get_messages(request, room_id):
    room = get_object_or_404(ChatRoom, id=room_id)
    messages = room.messages.all().order_by('timestamp')
    data = [{
        'sender': message.sender.username,
        'content': message.content,
        'timestamp': message.timestamp.strftime("%Y-%m-%d %H:%M"),
        'is_me': message.sender == request.user
    } for message in messages]
    return JsonResponse(data, safe=False)

@login_required
def send_message(request, room_id):
    if request.method == 'POST':
        room = get_object_or_404(ChatRoom, id=room_id)
        content = request.POST.get('content', '').strip()
        if content:
            Message.objects.create(
                room=room,
                sender=request.user,
                content=content
            )
            return JsonResponse({'status': 'ok'})
    return JsonResponse({'status': 'error'}, status=400)

@api_view(['GET'])
def guide_list(request):
    guides = User.objects.filter(is_guide=True)
    data = [{
        'id': guide.id,
        'name': guide.get_full_name() or guide.username,
        'specialty': getattr(guide, 'specialty', 'Local Guide')
    } for guide in guides]
    return Response(data)