
Ext.define('ney.view.material.form', {
    extend: 'Ext.window.Window',
    xtype: 'material-form',
    iconCls: 'x-fa fa-archive',
    layout: 'fit',
    width: 450,
    resizable: false,
    modal: true,
    title: 'Tipo de materiais',

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
                xtype: 'textfield',
                emptyText: 'Tipo',
                name: 'tipo',
                maxLength: 125,
                width: '100%'
            },{
                xtype: 'hiddenfield',
                name: 'id'
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