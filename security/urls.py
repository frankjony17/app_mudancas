from django.conf.urls import url
from django.urls import reverse_lazy
from security.views import login
from django.contrib.auth import views as auth_views

urlpatterns = [
    # LOGIN
    url(r'^login/$', auth_views.login, {'template_name': 'login.html'}, name='login'),
    url(r'^login/check/$', login.check),
    url(r'^logout/$', auth_views.logout, {'next_page': reverse_lazy('login')}, name='logout'),
    url(r'^success/$', login.success),
]

