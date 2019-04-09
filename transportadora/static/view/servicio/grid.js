
Ext.define('ney.view.servicio.grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'servicio-grid',
    width: '100%',
    frame: true,
    selModel: 'checkboxmodel',
    scrollable: true,
    columnLines: true,

    initComponent: function() {
        var me = this;
        me.store = Ext.create('ney.store.servico');
        me.columns = [{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true
        },{
            text: 'Tipo',
            dataIndex: 'tipo',
            sortable: false,
            menuDisabled: true,
            flex: 1
        }];
        me.lbar = [{
            xtype: 'button',
            tooltip: 'Adicionar serviço',
            iconCls: 'fa fa-plus',
            action: 'add'
        },'-',{
            xtype: 'button',
            iconCls: 'x-fa fa-edit',
            tooltip: 'Editar serviço',
            action: 'edit'
        },{
            xtype: 'button',
            iconCls: 'trash',
            tooltip: 'Remover serviço',
            action: 'remove'
        }];
        me.callParent(arguments);
    }
});