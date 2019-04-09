# from django.contrib.auth.decorators import permission_required
from django.core.serializers.json import DjangoJSONEncoder
from django.core.exceptions import ValidationError
from django.http import HttpResponse
from transportadora.models import *
import json


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def listar(request):
    data = []
    total = Mudanca.objects.filter().count()
    mudanca = Mudanca.objects.filter()[int(request.GET['start']):(int(request.GET['page']) * 5)]
    for m in mudanca:
        estadoo = Estado.objects.filter(mudanca=m).first()
        observacaoo = ObservacaoMudanca.objects.filter(mudanca=m).first()
        servicioss = MudancaServicio.objects.filter(mudanca=m)
        materiales = MudancaMaterial.objects.filter(mudanca=m)
        # Var
        string_mat, string_ser, estado_id, apanha, entrega, plaso_entrega = '', '', '', '', '', ''
        fech_color, fech_text, vistoria_id, fechada, vistoriador = '', '', '', False, ''
        vistoria_data, hora, descricao, observacao_id = '', '', '', '',
        # Materiales/Serviços
        for mm in materiales:
            string_mat += mm.material_tipo.tipo + ', '
        for ms in servicioss:
            string_ser += ms.servicio_tipo.tipo + ', '
        # Estado
        if estadoo:
            if estadoo.apanha is not None:
                apanha = estadoo.apanha.strftime("%Y-%m-%d")
            if estadoo.entrega is not None:
                entrega = estadoo.entrega.strftime("%Y-%m-%d")
            if estadoo.plaso_entrega is not None:
                plaso_entrega = estadoo.plaso_entrega.strftime("%Y-%m-%d")
        str_estado = '<div style="color:green;"><b>Apanha:</b></div>'+apanha
        str_estado += '<div style="color:green;"><b>Entrega:</b></div>'+entrega
        str_estado += '<div style="color:green;"><b>Prazo de entrega:</b></div>'+plaso_entrega
        # Vistoria
        if m.vistoria:
            vistoria_id = m.vistoria.id
            fechada = m.vistoria.fechada
            if fechada:
                fech_text = '<b>SIM</b>'
                fech_color = 'blue'
            else:
                fech_text = '<b>NÂO</b>'
                fech_color = 'red'
            vistoriador = m.vistoria.vistoriador
            if m.vistoria.data is not None:
                vistoria_data = m.vistoria.data.strftime("%Y-%m-%d")
            if m.vistoria.hora is not None:
                hora = m.vistoria.hora.strftime("%H:%M:%S")
        str_vistoria = '<div style="color:green;"><b>Data:</b></div>'+str(vistoria_data)+' '+str(hora)
        str_vistoria += '<div style="color:green;"><b>Vistoriador:</b></div>'+str(vistoriador)
        str_vistoria += '<div style="color:green;"><b>Fechada:</b></div>'
        str_vistoria += '<div style="color:'+fech_color+';">'+str(fech_text)+'</div>'
        # Observação
        if observacaoo:
            descricao = observacaoo.descricao
            observacao_id = observacaoo.id
        # Dict
        data.append({
            'id': m.id,
            'metragem': m.metragem,
            'no_ordem': m.no_orden,
            'valor_seguro': m.valor_seguro,
            'valor_servicio': m.valor_servicio,
            'observacao1': m.observacao,
            'observacao2': descricao,
            'observacao_id': observacao_id,
            'vistoria_data': vistoria_data,
            'vistoria_hora': hora,
            'vistoria_fechada': fechada,
            'vistoriador': vistoriador,
            'vistoria_id': vistoria_id,
            'vistoria': str_vistoria,
            'endereco_id': m.endereco.id,
            'origem': m.endereco.origem,
            'destino': m.endereco.destino,
            'fone': m.endereco.cliente.fone,
            'materiales': string_mat.strip(', '),
            'servicioss': string_ser.strip(', '),
            'materiales_servicioss': 'Materiais:<br>' + string_mat.strip(', ') + 'Serviços<br>' + string_ser.strip(', '),
            'estado_apanha': apanha,
            'estado_entrega': entrega,
            'estado_plaso_entrega': plaso_entrega,
            'estado': str_estado,
            'group_field': 'Nome: <b>' + m.endereco.cliente.nome + ' </b>CPF: <b>' + m.endereco.cliente.cpf + ' </b>(NO: ' + str(
                m.no_orden) + ').</b>'
        })
    return HttpResponse('{"total":"'+str(total)+'","data":'+str(json.dumps(data, cls=DjangoJSONEncoder))+'}')


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def add(request):
    # Vistoria
    fecha, hora, vistoriador, fechada, v = '', '', '', False, False
    if 'vistoria_data' in request.POST:
        fecha = request.POST['vistoria_data']
    if 'vistoria_hora' in request.POST:
        hora = request.POST['vistoria_hora']
    if 'vistoriador' in request.POST:
        vistoriador = request.POST['vistoriador']
    if 'vistoria_fechada' in request.POST:
        fechada = request.POST['vistoria_fechada']

    if fecha or hora or vistoriador:
        v = Vistoria()
        if fecha != '':
            v.data = fecha
        if hora != '':
            v.hora = hora
        v.vistoriador = vistoriador
        if fechada == 'on':
            fechada = True
        if fechada == 'off':
            fechada = False
        v.fechada = fechada
        v.save()
    # Mudança
    m = Mudanca()
    if request.POST['no_ordem'] != 'Numero de ordem':
        m.no_orden = int(request.POST['no_ordem'])
    m.metragem = float(request.POST['metragem'])
    m.valor_seguro = float(request.POST['valor_seguro'])
    m.valor_servicio = float(request.POST['valor_servicio'])
    if request.POST['no_ordem'] != 'Serviço observação':
        m.observacao = request.POST['observacao1']
    m.endereco = Endereco.objects.get(pk=int(request.POST['enderecoid']))
    if v:
        m.vistoria = v
    m.validate_unique()
    m.save()
    # Observação
    if 'observacao2' in request.POST:
        if request.POST['observacao2'] != '':
            o = ObservacaoMudanca()
            o.descricao = request.POST['observacao2']
            o.mudanca = m
            o.save()
    return HttpResponse()


# # @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def edit(request):
    try:
        m = Mudanca.objects.get(pk=int(request.POST['id']))
        # Mudança
        m.metragem = float(request.POST['metragem'])
        m.valor_seguro = float(request.POST['valor_seguro'])
        m.valor_servicio = float(request.POST['valor_servicio'])
        m.observacao = request.POST['observacao1']
        # Vistoria
        if request.POST['vistoria_id'] != '':
            v = Vistoria.objects.get(pk=int(request.POST['vistoria_id']))
            if 'vistoria_data' in request.POST and request.POST['vistoria_data'] != '':
                v.data = request.POST['vistoria_data']
            if 'vistoria_hora' in request.POST and request.POST['vistoria_hora'] != '':
                v.hora = request.POST['vistoria_hora']
            if 'vistoriador' in request.POST:
                v.vistoriador = request.POST['vistoriador']
            if 'vistoria_fechada' in request.POST:
                if request.POST['vistoria_fechada'] == 'on':
                    fechada = True
                if request.POST['vistoria_fechada'] == 'off':
                    fechada = False
                v.fechada = fechada
        else:
            v = Vistoria()
        # Observação
        if request.POST['observacao_id'] != '':
            o = ObservacaoMudanca.objects.get(pk=int(request.POST['observacao_id']))
            o.descricao = request.POST['observacao2']
            o.mudanca = m
            o.save()
        else:
            o = ObservacaoMudanca()
            o.mudanca = m
            o.save()
        v.save()
        m.vistoria = v
        m.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        Mudanca.objects.get(pk=pk).delete()
    return HttpResponse('')


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def estado(request):
    try:
        e = Estado.objects.filter(mudanca_id=int(request.POST['mudanca_id'])).first()
        if e:
            e.delete()
        e = Estado()
        if request.POST['estado_plaso_entrega'] != 'Prazo de entrega':
            e.plaso_entrega = request.POST['estado_plaso_entrega']
        if request.POST['estado_apanha'] != 'Apanha':
            e.apanha = request.POST['estado_apanha']
        if request.POST['estado_entrega'] != 'Entrega':
            e.entrega = request.POST['estado_entrega']
        e.mudanca = Mudanca.objects.get(pk=int(request.POST['mudanca_id']))
        e.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def observacao(request):
    try:
        m = Mudanca.objects.get(pk=int(request.POST['mudanca_id']))
        m.observacao = request.POST['observacao1']
        m.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


