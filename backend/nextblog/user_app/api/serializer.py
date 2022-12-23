from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User

class RegisterSerializer(ModelSerializer):
    class Meta: 
        model = User
        fields = ['username', 'password', 'email']
        
    extra_kwargs ={
        'password': {
            'write_only': True
        }
    }
        
    def save(self):
        password = self.validated_data['password']
        emailData = self.validated_data['email']
        usernameData = self.validated_data['username']
        
        account = User(email = emailData, username= usernameData)
        account.set_password(password)
        account.save()
        
        return account