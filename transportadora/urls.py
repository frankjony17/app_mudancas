from django.conf.urls import url
from transportadora.views import ney, cliente, mudanca, endereco, servicio_tipo
from transportadora.views import material_tipo, search

urlpatterns = [
    url(r'^$', ney.index),
    # Cliente
    url(r'^cliente/list', cliente.listar),
    url(r'^cliente/add', cliente.add),
    url(r'^cliente/edit', cliente.edit),
    url(r'^cliente/remove', cliente.remove),
    # Mudança
    url(r'^mudanca/list', mudanca.listar),
    url(r'^mudanca/add', mudanca.add),
    url(r'^mudanca/edit', mudanca.edit),
    url(r'^mudanca/remove', mudanca.remove),
    url(r'^mudanca/estado', mudanca.estado),
    url(r'^mudanca/observacao', mudanca.observacao),
    # Servicio Tipo
    url(r'^servico/list', servicio_tipo.listar),
    url(r'^servico/add', servicio_tipo.add),
    url(r'^servico/edit', servicio_tipo.edit),
    url(r'^servico/remove', servicio_tipo.remove),
    url(r'^servico/tipo', servicio_tipo.tipo_add),
    # Material Tipo
    url(r'^material/list', material_tipo.listar),
    url(r'^material/add', material_tipo.add),
    url(r'^material/edit', material_tipo.edit),
    url(r'^material/remove', material_tipo.remove),
    url(r'^material/tipo', material_tipo.tipo_add),
    # Endereço
    url(r'^endereco/list_endereco', endereco.endereco_list),
    # Search
    url(r'^search/list', search.listar)
]
