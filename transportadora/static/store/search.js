
Ext.define('ney.store.search', {
    extend: 'Ext.data.Store',
    fields: [
        'id', 'no_orden', 'metragem', 'valor_seguro', 'valor_servicio', 'observacao1',
        'fone', 'origem', 'destino',  'observacao2', 'observacao_id',
        'vistoria_data', 'vistoria_hora', 'vistoria_fechada', 'vistoriador', 'vistoria_id', 'vistoria',
        'materiales', 'servicioss', 'materiales_servicioss', 'group_field', 'endereco_id',
        'estado_apanha', 'estado_entrega', 'estado_plaso_entrega', 'estado'
    ],
    groupField: 'group_field',
    // pageSize: 5,
    proxy: {
        type: 'ajax',
        url: '/ney/search/list',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});