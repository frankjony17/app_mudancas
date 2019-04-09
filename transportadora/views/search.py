# from django.contrib.auth.decorators import permission_required
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from transportadora.models import *
from django.db.models import Q
import json


# @permission_required('nomenclador.NOMENCLADOR_PERMISSION')
def listar(request):
    data = []
    query = Q()
    query.add(Q(endereco__cliente__cpf__contains=request.GET['string']), Q.OR)
    query.add(Q(endereco__cliente__nome__contains=request.GET['string']), Q.OR)
    query.add(Q(endereco__cliente__fone__contains=request.GET['string']), Q.OR)
    query.add(Q(endereco__destino__contains=request.GET['string']), Q.OR)
    query.add(Q(endereco__origem__contains=request.GET['string']), Q.OR)
    query.add(Q(vistoria__vistoriador__contains=request.GET['string']), Q.OR)
    # Query
    total = Mudanca.objects.filter(query).count()
    mudanca = Mudanca.objects.filter(query)  # [int(request.GET['start']):(int(request.GET['page']) * 5)]
    # For
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
        # Dict
        data.append({
            'id': m.id,
            'metragem': m.metragem,
            'no_ordem': m.no_orden,
            'valor_seguro': m.valor_seguro,
            'valor_servicio': m.valor_servicio,
            'observacao1': m.observacao,
            'observacao2': descricao,
            'vistoria': str_vistoria,
            'origem': m.endereco.origem,
            'destino': m.endereco.destino,
            'fone': m.endereco.cliente.fone,
            'materiales': string_mat.strip(', '),
            'servicioss': string_ser.strip(', '),
            'materiales_servicioss': 'Materiais:<br>'+string_mat.strip(', ')+'Serviços<br>'+string_ser.strip(', '),
            'estado': str_estado,
            'group_field': 'Nome: <b>'+m.endereco.cliente.nome+' </b>CPF: <b>'+m.endereco.cliente.cpf+'</b>(NO: '+str(
                m.no_orden)+').</b>'
        })
    return HttpResponse('{"total":"' + str(total) + '","data":' + str(json.dumps(data, cls=DjangoJSONEncoder)) + '}')

