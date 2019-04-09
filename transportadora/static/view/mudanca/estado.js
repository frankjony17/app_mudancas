
Ext.define('ney.view.mudanca.estado', {
    extend: 'Ext.window.Window',
    xtype: 'mudanca-estado-form',
    iconCls: 'x-fa fa-asterisk',
    layout: 'fit',
    width: 580,
    resizable: false,
    modal: true,
    title: 'Situação da mudança',

    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            url: '/ney/mudanca/estado',
            padding: '5 5 0 5',
            bodyPadding: '3',
            border: false,
            style: 'background-color: #fff;',
            fieldDefaults: {
                labelAlign: 'top'
            },
            items: [{
                xtype: 'fieldset',
                layout: 'hbox',
                title: 'Estado atual',
                items: [{
                    flex: 1,
                    margin: '0 5 0 0',
                    items: [{
                        xtype: 'datefield',
                        fieldLabel: 'Prazo de entrega',
                        emptyText: 'Prazo de entrega',
                        name: 'estado_plaso_entrega',
                        format: 'Y-m-d',
                        editable: false,
                        width: '100%'
                    }]
                },{
                    flex: 1,
                    margin: '0 5 0 0',
                    items: [{
                        xtype: 'datefield',
                        fieldLabel: 'Apanha',
                        emptyText: 'Apanha',
                        name: 'estado_apanha',
                        format: 'Y-m-d',
                        editable: false,
                        width: '100%'
                    }]
                },{
                    flex: 1,
                    margin: '0 5 0 0',
                    items: [{
                        xtype: 'datefield',
                        fieldLabel: 'Entrega',
                        emptyText: 'Entrega',
                        name: 'estado_entrega',
                        format: 'Y-m-d',
                        editable: false,
                        width: '100%'
                    }]
                }]
            },{
                xtype: 'hiddenfield',
                name: 'mudanca_id',
                value: me.mudanca_id
            }]
        }];
        me.buttons = [{
            text: 'Salvar',
            iconCls: 'check'
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