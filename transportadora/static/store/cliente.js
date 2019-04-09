
Ext.define('ney.store.cliente', {
    extend: 'Ext.data.Store',
    fields: ['id', 'cid', 'eid', 'cpf', 'nome', 'fone', 'origem', 'destino', 'data'],
    groupField: 'group_field',
    proxy : {
        url: '/ney/cliente/list',
        type : 'ajax'
    },
    autoLoad: true
});