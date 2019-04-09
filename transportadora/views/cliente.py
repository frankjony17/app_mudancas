# from django.contrib.auth.decorators import permission_required
from transportadora.models import Cliente, Endereco
from django.core.exceptions import ValidationError
from django.http import JsonResponse, HttpResponse
from datetime import datetime
import json


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def listar(request):
    data = []
    for e in Endereco.objects.all():
        data.append({
            'id': e.id,
            'cid': e.cliente.id,
            'eid': e.id,
            'cpf': e.cliente.cpf,
            'nome': e.cliente.nome,
            'fone': e.cliente.fone,
            'origem': e.origem,
            'destino': e.destino,
            'data': e.data,
            'group_field': e.cliente.nome + ' <b>' + e.cliente.cpf + '</b>'
        })
    return JsonResponse(data, safe=False)


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def add(request):
    c = Cliente.objects.filter(cpf=request.POST['cpf']).first()
    if not c:
        c = Cliente()
        c.cpf = request.POST['cpf']
        c.nome = request.POST['nome']
        c.fone = request.POST['fone']
        c.validate_unique()
        c.save()
    e = Endereco()
    e.data = datetime.now()
    e.destino = request.POST['destino']
    e.origem = request.POST['origem']
    e.cliente = c
    e.validate_unique()
    e.save()
    return HttpResponse()


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def edit(request):
    try:
        c = Cliente.objects.get(pk=request.POST['cid'])
        e = Endereco.objects.get(pk=request.POST['eid'])

        e.destino = request.POST['destino']
        e.origem = request.POST['origem']
        e.validate_unique()

        c.cpf = request.POST['cpf']
        c.nome = request.POST['nome']
        c.fone = request.POST['fone']
        c.validate_unique()

        e.save()
        c.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        Endereco.objects.get(pk=pk).delete()
    return HttpResponse('')


