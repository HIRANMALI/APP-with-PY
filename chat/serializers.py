from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    
    class Meta:
        model = Message
        fields = ['content', 'sender', 'timestamp']
    
    def get_sender(self, obj):
        return 'guide' if obj.sender == obj.room.guide else 'user'