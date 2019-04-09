
Ext.define('ney.view.cliente.form', {
    extend: 'Ext.window.Window',
    xtype: 'cliente-form',
    iconCls: 'x-fa fa-address-book',
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
                padding: '5 5 5 5',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'CPF',
                    emptyText: 'CPF',
                    name: 'cpf',
                    margin: '0 5 0 0',
                    maxLength: 14,
                    flex: 1
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Nome',
                    emptyText: 'Nome',
                    name: 'nome',
                    margin: '0 5 0 0',
                    maxLength: 250,
                    flex: 2
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                padding: '5 5 5 5',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Fone',
                    emptyText: 'Fone',
                    name: 'fone',
                    maxLength: 124,
                    flex: 1
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                title: 'Endereço',
                padding: '5 5 5 5',
                items: [{
                    xtype: 'textareafield',
                    fieldLabel: 'Origem',
                    emptyText: 'Origem',
                    grow: true,
                    name: 'origem',
                    margin: '0 5 0 0',
                    maxLength: 198,
                    flex: 1
                },{
                    xtype: 'textareafield',
                    fieldLabel: 'Destino',
                    emptyText: 'Destino',
                    grow: true,
                    name: 'destino',
                    maxLength: 198,
                    flex: 1
                }]
            },{
                xtype: 'hiddenfield',
                value: me.clienteid,
                name: 'cid'
            },{
                xtype: 'hiddenfield',
                value: me.enderecoid,
                name: 'eid'
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