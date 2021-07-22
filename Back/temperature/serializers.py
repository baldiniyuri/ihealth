from rest_framework import serializers
from authentication.serializers import UserSerializerForMedic

class TemperatureSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    temperature = serializers.FloatField()
    date_time = serializers.DateTimeField(required=False) 
    user = UserSerializerForMedic(required=False)