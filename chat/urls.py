from django.urls import path
from . import views
from .api_views import guide_list, create_chat_room, get_chat_messages

urlpatterns = [
    path('room/<int:guide_id>/', views.chat_room, name='chat_room'),
    path('api/messages/<int:room_id>/', views.get_messages, name='get_messages'),
    path('api/send/<int:room_id>/', views.send_message, name='send_message'),
    path('api/guides/', guide_list, name='guide_list'),
    path('api/chat/create-room/', create_chat_room, name='create_chat_room'),
    path('api/chat/messages/<int:room_id>/', get_chat_messages, name='get_chat_messages'),
]