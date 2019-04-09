
Ext.define( 'ney.view.viewport', {
    extend: 'Ext.container.Viewport',
    xtype : 'ney-viewport',
    layout: 'border',

    initComponent: function() {
        var me = this;
        me.items = [{
            region: 'north',
            xtype: 'panel',
            bodyStyle: 'background-color:#5FA2DD;',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            items:[{
                xtype: "tbseparator", width: 4
            },{
                xtype: 'buttongroup',
                frame:false,
                items: [{
                    text: 'Cliente',
                    tooltip: 'Gerenciar clientes',
                    iconCls: 'x-fa fa-address-book',
                    id: 'cliente-button'
                },{
                    text: 'Mudança',
                    tooltip: 'Gerenciar mudanças',
                    iconCls: 'x-fa fa-truck',
                    id: 'mudanca-button'
                }]
            },{
                xtype: "tbseparator", width: 4
            },{
                xtype: 'buttongroup',
                frame:false,
                items: [{
                    text: 'Filtrar',
                    tooltip: 'Pesquisar no banco de dados.',
                    iconCls: 'x-fa fa-search',
                    id: 'ney-search'
                }]
            },{
                xtype: 'tbfill'
            },{
                xtype: 'buttongroup',
                frame:false,
                items: [{
                    text: 'Nomenclator',
                    menu: Ext.create('ney.view.menu'),
                    tooltip: 'Gerenciar (tipo de serviços , tipo de materiais)',
                    iconCls: 'x-fa fa-list'
                },{
                    iconCls: 'x-fa fa-file',
                    id: 'ney-report'
                }]
            },{
                xtype: "tbseparator", width: 4
            },{
                xtype: 'buttongroup',
                frame:false,
                items: [{
                    text: 'Sair',
                    iconCls: 'logout',
                    id: 'ney-logout'
                }]
            },{
                xtype: "tbseparator", width: 4
            }]
        },{
            region: 'center',
            xtype: 'tabpanel',
            border: true,
            iconAlign: 'right',
            titleAlign: 'right',
            headerPosition: 'bottom',
            tabBarHeaderPosition: 0,
            defaults: {
                scrollable: false,
                closable: true,
                border: true
            },
            listeners: {
                render: {
                    fn: function(tabpanel) {
                        Ext.TaskManager.start({
                            run: function(){
                                tabpanel.setTitle('<b>'+Ext.Date.format(new Date(), 'Y/m/d H:i:s')+'</b>');
                            },
                            interval: 1000
                        });
                    },
                    delay: 100
                }
            },
            bodyStyle: 'background-image:url(../static/../static/images/square.gif);',
            id: 'tab-panel-center'
        }];
        me.callParent(arguments);
    }
});