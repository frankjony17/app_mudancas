
Ext.define('ney.store.servico', {
    extend: 'Ext.data.Store',
    fields: ['id', 'tipo'],
    sorters: ['data'],
    proxy : {
        url: '/ney/servico/list',
        type : 'ajax'
    },
    autoLoad: true
});