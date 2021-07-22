from rest_framework import serializers


class PacientSerializers(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    gender = serializers.CharField()
    age = serializers.IntegerField()
    imc = serializers.IntegerField()