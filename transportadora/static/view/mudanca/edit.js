
Ext.define('ney.view.mudanca.edit', {
    extend: 'Ext.window.Window',
    xtype: 'mudanca-edit-form',
    iconCls: 'x-fa ',
    layout: 'fit',
    width: 720,
    resizable: false,
    modal: true,
    title: 'Editar mudança',

    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            url: '/ney/mudanca/edit',
            padding: '5 5 0 5',
            bodyPadding: '3',
            border: false,
            style: 'background-color: #fff;',
            fieldDefaults: {
                labelAlign: 'top',
                allowBlank: false
            },
            items: [{
                xtype: 'fieldset',
                layout: 'hbox',
                title: 'Informações do Serviço',
                items: [{
                    flex: 1,
                    margin: '0 5 0 0',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Metragem',
                        emptyText: 'Metragem',
                        name: 'metragem',
                        maxLength: 198,
                        width: '100%'
                    }]
                },{
                    flex: 1,
                    margin: '0 5 0 0',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Valor do Seguro',
                        emptyText: 'Valor do Seguro',
                        name: 'valor_seguro',
                        maxLength: 198,
                        width: '100%'
                    }]
                },{
                    flex: 1,
                    margin: '0 5 0 0',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Valor do Serviço',
                        emptyText: 'Valor do Serviço',
                        name: 'valor_servicio',
                        maxLength: 198,
                        width: '100%'
                    }]
                },{
                    flex: 1,
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Serviço observação',
                        emptyText: 'Serviço observação',
                        name: 'observacao1',
                        maxLength: 30,
                        allowBlank: true,
                        width: '100%'
                    }]
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                title: 'Vistoria',
                items: [{
                    width: 130,
                    margin: '0 5 0 0',
                    items: [{
                        xtype: 'datefield',
                        fieldLabel: 'Data',
                        format: 'Y-m-d',
                        name: 'vistoria_data',
                        allowBlank: true,
                        editable: false,
                        width: '100%'
                    }]
                },{
                    width: 110,
                    margin: '0 5 0 0',
                    items: [{
                        xtype: 'timefield',
                        fieldLabel: 'Hora',
                        format: 'h:m:s',
                        name: 'vistoria_hora',
                        allowBlank: true,
                        editable: false,
                        width: '100%'
                    }]
                },{
                    flex: 7,
                    margin: '0 5 0 0',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Vistoriador',
                        name: 'vistoriador',
                        allowBlank: true,
                        width: '100%'
                    }]
                },{
                    flex: 1,
                    items: [{
                        xtype: 'checkboxfield',
                        fieldLabel: 'Fechada',
                        name: 'vistoria_fechada',
                        allowBlank: true,
                        width: '100%'
                    }]
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                title: 'Observação',
                items: [{
                    xtype: 'textareafield',
                    emptyText: 'Observação',
                    name: 'observacao2',
                    allowBlank: true,
                    grow: true,
                    width: '100%'
                }]
            },{
                xtype: 'hiddenfield',
                name: 'vistoria_id'
            },{
                xtype: 'hiddenfield',
                name: 'observacao_id'
            },{
                xtype: 'hiddenfield',
                name: 'id'
            }]
        }];
        me.buttons = [{
            text: 'Editar',
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