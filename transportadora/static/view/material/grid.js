
Ext.define('ney.view.material.grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'material-grid',
    width: '100%',
    frame: true,
    selModel: 'checkboxmodel',
    scrollable: true,
    columnLines: true,

    initComponent: function() {
        var me = this;
        me.store = Ext.create('ney.store.material');
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
            tooltip: 'Adicionar materiais',
            iconCls: 'fa fa-plus',
            action: 'add'
        },'-',{
            xtype: 'button',
            iconCls: 'x-fa fa-edit',
            tooltip: 'Editar materiais',
            action: 'edit'
        },{
            xtype: 'button',
            iconCls: 'trash',
            tooltip: 'Remover materiais',
            action: 'remove'
        }];
        me.callParent(arguments);
    }
});