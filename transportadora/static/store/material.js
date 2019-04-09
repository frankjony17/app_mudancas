
Ext.define('ney.store.material', {
    extend: 'Ext.data.Store',
    fields: ['id', 'tipo'],
    sorters: ['data'],
    proxy : {
        url: '/ney/material/list',
        type : 'ajax'
    },
    autoLoad: true
});