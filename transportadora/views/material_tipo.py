# from django.contrib.auth.decorators import permission_required
from transportadora.models import MaterialTipo, Mudanca, MudancaMaterial
from django.core.exceptions import ValidationError
from django.http import JsonResponse, HttpResponse
import json


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def listar(request):
    data = []
    for m in MaterialTipo.objects.all():
        data.append({
            'id': m.id,
            'tipo': m.tipo
        })
    return JsonResponse(data, safe=False)


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def add(request):
    m = MaterialTipo()
    try:
        m.tipo = request.POST['tipo']
        m.validate_unique()
        m.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def edit(request):
    try:
        m = MaterialTipo.objects.get(pk=request.POST['id'])
        m.tipo = request.POST['tipo']
        m.validate_unique()
        m.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        MaterialTipo.objects.get(pk=pk).delete()
    return HttpResponse('')


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def tipo_add(request):
    try:
        mu = Mudanca.objects.get(pk=int(request.POST['mudanca_id']))
        for mti in MudancaMaterial.objects.filter(mudanca=mu):
            mti.delete()
        if request.POST['materiales'] != 'Tipo de materiais':
            for tipo in json.loads(request.POST['materiales']):
                mt = MaterialTipo.objects.filter(tipo=tipo).first()
                # Add
                mm = MudancaMaterial()
                mm.material_tipo = mt
                mm.mudanca = mu
                mm.save()
        return HttpResponse('')
    except ValidationError as e:
        return HttpResponse(e.messages)




