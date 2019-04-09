from django.conf.urls import url
from django.urls import path, include
from transportadora.views import ney


urlpatterns = [
    url(r'^$', ney.index),
    path('security/', include('security.urls')),
    path('ney/', include('transportadora.urls'))
]
