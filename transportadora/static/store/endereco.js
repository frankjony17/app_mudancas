
Ext.define('ney.store.endereco', {
    extend: 'Ext.data.Store',
    fields: ['id', 'origem', 'destino', 'endereco', 'data'],
    sorters: ['data'],
    proxy : {
        url: '/ney/endereco/list_endereco',
        type : 'ajax'
    }
});