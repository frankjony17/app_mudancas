
Ext.define('ney.view.mudanca.servicios', {
    extend: 'Ext.window.Window',
    xtype: 'mudanca-servicios-form',
    iconCls: 'x-fa fa-road',
    layout: 'fit',
    width: 620,
    height: 200,
    resizable: false,
    modal: true,
    title: 'Adicionar tipo de serviço',

    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            url: '/ney/servico/tipo',
            padding: '5 5 0 5',
            bodyPadding: '3',
            border: false,
            style: 'background-color: #fff;',
            fieldDefaults: {
                labelAlign: 'top'
            },
            items: [{
                xtype: 'tagfield',
                emptyText: 'Tipo de serviço',
                name: 'servicioss',
                store: Ext.create('ney.store.servico'),
                displayField: 'tipo',
                valueField: 'tipo',
                queryMode: 'local',
                encodeSubmitValue: true,
                selectOnFocus: false,
                editable: false,
                anchor: '100%'
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