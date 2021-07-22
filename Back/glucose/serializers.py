from rest_framework import serializers
from authentication.serializers import UserSerializerForMedic

class GlucoseSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    glucose = serializers.IntegerField()
    date_time = serializers.DateTimeField(required=False)
    user = UserSerializerForMedic()