from django.shortcuts import render
from django.contrib.auth.decorators import permission_required


@permission_required('transportadora.NEY_PERMISSION')
def index(request):
    return render(request, 'index.html')

