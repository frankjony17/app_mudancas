
Ext.define('ney.view.mudanca.materiales', {
    extend: 'Ext.window.Window',
    xtype: 'mudanca-materiales-form',
    iconCls: 'x-fa fa-archive',
    layout: 'fit',
    width: 620,
    height: 200,
    resizable: false,
    modal: true,
    title: 'Adicionar materiais',

    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            url: '/ney/material/tipo',
            padding: '5 5 0 5',
            bodyPadding: '3',
            border: false,
            style: 'background-color: #fff;',
            fieldDefaults: {
                labelAlign: 'top'
            },
            items: [{
                xtype: 'tagfield',
                emptyText: 'Tipo de materiais',
                name: 'materiales',
                store: Ext.create('ney.store.material'),
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