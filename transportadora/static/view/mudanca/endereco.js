
Ext.define('ney.view.mudanca.endereco', {
    extend: 'Ext.window.Window',
    xtype: 'endereco-form',
    iconCls: 'x-fa fa-tip',
    layout: 'fit',
    width: 970,
    resizable: false,
    modal: true,
    title: 'Selecione o endereço',

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
                xtype: 'combobox',
                emptyText: 'Endereço',
                store: me.enderecoStore,
                queryMode: 'local',
                displayField: 'endereco',
                valueField: 'id',
                editable: false,
                listeners: {
                    select: function (combo) {
                        me.endereco = combo.value;
                    }
                },
                width: '100%'
            }]
        }];
        me.buttons = [{
            text: 'Selecione',
            iconCls: 'check',
            listeners: {
                click: function(){
                    me.window.down('[name=enderecoid]').setValue(me.endereco);
                    me.close();
                }
            }
        }];
        me.callParent(arguments);
    }
});