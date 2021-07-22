from rest_framework import serializers
from authentication.serializers import UserSerializerForMedic

class BloodPressueSerializers(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    systolic_level = serializers.IntegerField()
    diastolic_level = serializers.IntegerField()
    bpm = serializers.IntegerField()
    date_time = serializers.DateTimeField(required=False)
    user = UserSerializerForMedic()