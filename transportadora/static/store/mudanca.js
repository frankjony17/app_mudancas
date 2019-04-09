
Ext.define('ney.store.mudanca', {
    extend: 'Ext.data.Store',
    fields: [
        'id', 'no_orden', 'metragem', 'valor_seguro', 'valor_servicio', 'observacao1',
        'fone', 'origem', 'destino',  'observacao2', 'observacao_id',
        'vistoria_data', 'vistoria_hora', 'vistoria_fechada', 'vistoriador', 'vistoria_id', 'vistoria',
        'materiales', 'servicioss', 'materiales_servicioss', 'group_field', 'endereco_id',
        'estado_apanha', 'estado_entrega', 'estado_plaso_entrega', 'estado'
    ],
    pageSize: 5,
    groupField: 'group_field',
    sorters: ['data'],
    proxy: {
        type: 'ajax',
        url: '/ney/mudanca/list',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: true
});