from django.http import HttpResponseRedirect, HttpResponse
from django.contrib import auth


def check(request):
    username = request.POST['username']
    password = request.POST['password']
    user = auth.authenticate(username=username, password=password)
    if user is not None and user.is_active:
        # Correct password, and the user is marked "active"
        auth.login(request, user)
        # Redirect to a success page.
        return HttpResponseRedirect("/security/success")
    else:
        return HttpResponse('Credenciais inválidas')


def success(request):
    if request.user.is_superuser or request.user.has_perm('security.ADMIN_PERMISSION'):
        return HttpResponse("ney")
    else:
        return HttpResponse("logout")
