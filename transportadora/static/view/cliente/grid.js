
Ext.define('ney.view.cliente.grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'cliente-grid',
    width: '100%',
    frame: true,
    selModel: 'checkboxmodel',
    features: [{
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: '{name} ({rows.length})'
    }],
    scrollable: true,
    columnLines: true,

    initComponent: function() {
        var me = this;
        me.store = Ext.create('ney.store.cliente');
        me.columns = [{
            text: 'eId',
            dataIndex: 'id',
            width: 35,
            hidden: true
        },{
            dataIndex: 'eid',
            width: 35,
            hidden: true
        },{
            dataIndex: 'cid',
            width: 35,
            hidden: true
        },{
            text: 'CPF',
            dataIndex: 'cpf',
            sortable: false,
            menuDisabled: true,
            renderer: function (value) {
                return '<b>'+ value +'</b>'
            },
            width: 120
        },{
            text: 'Nome',
            dataIndex: 'nome',
            sortable: false,
            menuDisabled: true,
            flex: 3
        },{
            text: 'Fone',
            dataIndex: 'fone',
            tdCls: 'wrap',
            flex: 2
        },{
            text: 'Origem',
            dataIndex: 'origem',
            tdCls: 'wrap',
            flex: 3
        },{
            text: 'Destino',
            dataIndex: 'destino',
            tdCls: 'wrap',
            flex: 3
        }];
        me.lbar = [{
            xtype: 'button',
            tooltip: 'Adicionar cliente',
            iconCls: 'fa fa-plus',
            action: 'add'
        },'-',{
            xtype: 'button',
            iconCls: 'x-fa fa-edit',
            tooltip: 'Editar cliente',
            action: 'edit'
        },{
            xtype: 'button',
            iconCls: 'trash',
            tooltip: 'Remover cliente',
            action: 'remove'
        }];
        me.callParent(arguments);
    }
});