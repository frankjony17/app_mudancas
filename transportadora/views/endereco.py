# from django.contrib.auth.decorators import permission_required
from transportadora.models import Endereco
from django.http import JsonResponse


def endereco_list(request):
    data = []
    for e in Endereco.objects.filter(cliente_id=request.GET['clienteid']):
        data.append({
            'id': e.id,
            'data': e.data,
            'origem': e.origem,
            'destino': e.destino,
            'endereco': e.origem + ' <=> ' + e.destino
        })
    return JsonResponse(data, safe=False)

