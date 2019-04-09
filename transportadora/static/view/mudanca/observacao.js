
Ext.define('ney.view.mudanca.observacao', {
    extend: 'Ext.window.Window',
    xtype: 'mudanca-observacao-form',
    iconCls: 'x-fa fa-commenting',
    layout: 'fit',
    width: 400,
    resizable: false,
    modal: true,
    title: 'Observação de serviço',

    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            url: '/ney/mudanca/observacao',
            padding: '5 5 0 5',
            bodyPadding: '3',
            border: false,
            style: 'background-color: #fff;',
            fieldDefaults: {
                labelAlign: 'top'
            },
            items: [{
                xtype: 'textareafield',
                emptyText: 'Observação',
                name: 'observacao1',
                grow: true,
                width: '100%'
            },{
                xtype: 'hiddenfield',
                name: 'mudanca_id',
                value: me.mudanca_id
            }]
        }];
        me.buttons = [{
            text: 'Editar',
            iconCls: 'x-fa fa-edit'
        },{
            text: 'Cancelar',
            iconCls: 'close',
            listeners: {
                click: function(){ 
                    me.close();
                }
            }
        }];
        me.callParent(arguments);
    }
});