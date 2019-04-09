from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db import models
import datetime


class UserManager(BaseUserManager):
    def create_user(self, username, password=None):
        user = self.model(
            username=username
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None):
        user = self.model(username=username)
        user.is_superuser = True
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_complete_user(self, username):
        user = self.model(username=username)
        user.set_password("Ney*{0}".format(str(datetime.datetime.now().year)))
        user.is_superuser = False
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.TextField(max_length=25, unique=True)
    last_login = models.DateTimeField(null=True)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'auth_user'
