from rest_framework import serializers


class MedicSerializers(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    crm = serializers.IntegerField()
