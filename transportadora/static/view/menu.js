
Ext.define('ney.view.menu', {
    extend: 'Ext.menu.Menu',
    xtype: 'ney-menu',
    width: 200,
    plain: true,
    margin: '10 10 10 10',
    closeAction: 'destroy',
    showSeparator: true,
    stateEvents: ['menu_item_servicio', 'menu_item_material'],

    initComponent: function () { var me = this;
        me.items = [{
            text: 'Tipo de <b>Serviços</b>',
            iconCls: 'x-fa fa-road',
            listeners: {
                click: function () {
                    me.fireEvent('menu_item_servicio');
                }
            }
        },{
            text: 'Tipo de <b>Materiais</b>',
            iconCls: 'x-fa fa-archive',
            listeners: {
                click: function () {
                    me.fireEvent('menu_item_material');
                }
            }
        }];
        me.callParent(arguments);
    }

});