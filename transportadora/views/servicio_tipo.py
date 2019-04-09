# from django.contrib.auth.decorators import permission_required
from transportadora.models import ServicioTipo, MudancaServicio, Mudanca
from django.core.exceptions import ValidationError
from django.http import JsonResponse, HttpResponse
import json


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def listar(request):
    data = []
    for s in ServicioTipo.objects.all():
        data.append({
            'id': s.id,
            'tipo': s.tipo
        })
    return JsonResponse(data, safe=False)


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def add(request):
    s = ServicioTipo()
    try:
        s.tipo = request.POST['tipo']
        s.validate_unique()
        s.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def edit(request):
    try:
        s = ServicioTipo.objects.get(pk=request.POST['id'])
        s.tipo = request.POST['tipo']
        s.validate_unique()
        s.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        ServicioTipo.objects.get(pk=pk).delete()
    return HttpResponse('')


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def tipo_add(request):
    try:
        mu = Mudanca.objects.get(pk=int(request.POST['mudanca_id']))
        for mse in MudancaServicio.objects.filter(mudanca=mu):
            mse.delete()
        if request.POST['servicioss'] != 'Tipo de serviço':
            for tipo in json.loads(request.POST['servicioss']):
                st = ServicioTipo.objects.filter(tipo__exact=tipo).first()
                # Add
                ms = MudancaServicio()
                ms.servicio_tipo = st
                ms.mudanca = mu
                ms.save()
        return HttpResponse('')
    except ValidationError as e:
        return HttpResponse(e.messages)




