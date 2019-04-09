
Ext.define('ney.view.mudanca.form', {
    extend: 'Ext.window.Window',
    xtype: 'mudanca-form',
    iconCls: 'x-fa ',
    layout: 'fit',
    width: 720,
    resizable: false,
    modal: true,

    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            url: me.url,
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
                items: [{
                    flex: 2,
                    margin: '0 5 0 0',
                    items: [{
                        xtype: 'combobox',
                        fieldLabel: 'Endereço',
                        emptyText: 'Selecione o endereço...',
                        store: Ext.create('ney.store.cliente'),
                        queryMode: 'local',
                        displayField: 'nome',
                        valueField: 'cid',
                        editable: false,
                        listConfig: {
                            itemTpl: [
                                '<div data-qtip="{nome}: {cpf}">Nome: {nome} <b>CPF: {cpf}</b></div>'
                            ]},
                        listeners: {
                            select: function (combo) {
                                var enderecoStore = Ext.create('ney.store.endereco');
                                enderecoStore.load({
                                    params: {
                                        clienteid: combo.value
                                    }
                                });
                                Ext.create('ney.view.mudanca.endereco', {
                                    window: me,
                                    enderecoStore: enderecoStore
                                }).show();
                            }
                        },
                        width: '100%'
                    }]
                },{
                    flex: 1,
                    items: [{
                        xtype: 'numberfield',
                        fieldLabel: 'Numero de ordem',
                        emptyText: 'Numero de ordem',
                        name: 'no_ordem',
                        decimalSeparator: '',
                        maxLength: 5,
                        allowBlank: true,
                        minValue: 0,
                        width: '100%'
                    }]
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                title: 'Informações do Serviço',
                items: [{
                    flex: 1,
                    margin: '0 5 0 0',
                    items: [{
                        xtype: 'numberfield',
                        fieldLabel: 'Metragem',
                        emptyText: 'Metragem',
                        name: 'metragem',
                        decimalSeparator: '.',
                        minValue: 0,
                        width: '100%'
                    }]
                },{
                    flex: 1,
                    margin: '0 5 0 0',
                    items: [{
                        xtype: 'numberfield',
                        fieldLabel: 'Valor do Seguro',
                        emptyText: 'Valor do Seguro',
                        decimalSeparator: '.',
                        name: 'valor_seguro',
                        minValue: 0,
                        width: '100%'
                    }]
                },{
                    flex: 1,
                    margin: '0 5 0 0',
                    items: [{
                        xtype: 'numberfield',
                        fieldLabel: 'Valor do Serviço',
                        emptyText: 'Valor do Serviço',
                        decimalSeparator: '.',
                        name: 'valor_servicio',
                        minValue: 0,
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
                name: 'cid'
            },{
                xtype: 'hiddenfield',
                name: 'enderecoid'
            }]
        }];
        me.buttons = [{
            text: me.buttontext,
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