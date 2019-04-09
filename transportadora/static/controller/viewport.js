
Ext.define('ney.controller.viewport', {
    extend: 'Ext.app.Controller',
    control: {
        'ney-viewport': {
            resize: "resize",
            afterrender: "after_render_viewport"
        },
        'ney-menu': {
            menu_item_servicio: "tipo_servicio",
            menu_item_material: "tipo_material"
        },
        '#ney-logout': {
            click: "logout"
        },
        '#cliente-button': {
            click: "cliente"
        },
        '#mudanca-button': {
            click: "mudanca"
        },
        '#ney-search': {
            click: "window_search"
        },
        '#search-window': {
            afterrender: "after_render_search"
        },
        '#search-in-db': {
            click: "search_mudanca"
        },
        // progresbar
        'search-grid-grid': {
            resize: "resize_progressbarpager",
            afterrender: "after_render_grid_progressbarpager"
            // destroy: 'close_progressbarpager'
        }
    },
    // Progress Bar Pager
    resize_progressbarpager: function (grid) {
        var center = Ext.getCmp('tab-panel-center');
        grid.setHeight(center.getHeight() - 45);
        // this.position_progressbarpager(grid);
    },
    // position_progressbarpager: function (grid) {
    //     var viewport = Ext.getCmp('tab-panel-center');
    //     grid.progressbarpager.setPosition(viewport.getWidth() - 640, viewport.getHeight() - 7);
    //     grid.progressbarpager.show();
    // },
    after_render_grid_progressbarpager: function (grid) {
        this.grid = grid;
        this.store = grid.getStore();
        // this.position_progressbarpager(grid);
    },
    // close_progressbarpager: function (grid) {
    //     grid.progressbarpager.close();
    // },
    //
    resize: function (viewport) {
        var center = Ext.getCmp('tab-panel-center');
        center.setHeight(viewport.getHeight() - 85);
    },
    after_render_viewport: function (viewport) {
        this.viewport = viewport;
        this.tabpanel = viewport.down('tabpanel');
    },
    // Center Tab Panel
    cliente: function () {
        if (!this.exist_tab('ney-cliente-tab')) {
            this.add_tab_panel({
                title: 'Cliente',
                iconCls: 'fa fa-address-book',
                items: Ext.create('ney.view.cliente.grid'),
                id: 'ney-cliente-tab'
            });
        } else {
            this.tabpanel.setActiveTab('ney-cliente-tab');
        }
    },
    mudanca: function () {
        if (!this.exist_tab('ney-mudanca-tab')) {
            this.add_tab_panel({
                title: 'Mudança',
                iconCls: 'x-fa fa-truck',
                items: Ext.create('ney.view.mudanca.grid'),
                id: 'ney-mudanca-tab'
            });
        } else {
            this.tabpanel.setActiveTab('ney-mudanca-tab');
        }
    },
    tipo_servicio: function () {
        if (!this.exist_tab('ney-servicio-tab')) {
            this.add_tab_panel({
                title: 'Tipo de serviço',
                iconCls: 'x-fa fa-road',
                items: Ext.create('ney.view.servicio.grid'),
                id: 'ney-servicio-tab'
            });
        } else {
            this.tabpanel.setActiveTab('ney-servicio-tab');
        }
    },
    tipo_material: function () {
        if (!this.exist_tab('ney-material-tab')) {
            this.add_tab_panel({
                title: 'Tipo de materiais',
                iconCls: 'x-fa fa-archive',
                items: Ext.create('ney.view.material.grid'),
                id: 'ney-material-tab'
            });
        } else {
            this.tabpanel.setActiveTab('ney-material-tab');
        }
    },
    // Search
    search_mudanca: function () {
        if (this.exist_tab('search-mudanca-tab')) {
            this.tabpanel.remove('search-mudanca-tab');
        }
        var store = Ext.create('ney.store.search');
            store.load({
                params: {
                    string: Ext.getCmp('textfield-search-in-db').getValue()
                }
            });
        this.add_tab_panel({
            title: 'Filtrar',
            iconCls: 'x-fa fa-search',
            items: Ext.create('ney.view.search', {
                store: store
            }),
            id: 'search-mudanca-tab'
        });
    },
    after_render_search: function (window) {
        window.setPosition(this.viewport.getX() + 310, this.viewport.getY() + 1);
    },
    window_search: function (button) { var me = this;
        button.setDisabled(true);
        var win = Ext.create('Ext.window.Window', {
            width: 640,
            header: false,
            resizable: false,
            tbar:[{
                xtype: 'textfield',
                padding: '0 0 0 0',
                emptyText: 'Procurar um cliente...',
                id: 'textfield-search-in-db',
                listeners: {
                    specialkey: function(field, e){
                        if (e.getKey() == e.ENTER) {
                            me.search_mudanca()
                        }
                    }
                },
                width: '94%'
            },'-',{
                iconCls: 'x-fa fa-close',
                listeners: {
                click: function(){
                    win.close();
                    button.setDisabled(false);
                }
            }
            }],
            id: 'search-window'
        });
        win.show();
    },
    // Logout
    logout: function () {
        location.href = '/security/logout';
    },
    // TabPanel add
    exist_tab: function (id) { var me = this;
        var exist_tab = false;
        Ext.Array.each(me.tabpanel.items.keys, function(key) {
            if (key == id) {
                exist_tab = true;
            }
        });
        return exist_tab;
    },
    add_tab_panel: function (tab) {
        if (this.tabpanel.items.length > 3) {
            this.tabpanel.remove(this.tabpanel.items.items[0]);
        }
        this.tabpanel.add(tab);
        this.tabpanel.setActiveTab(tab.id);
    }
});


