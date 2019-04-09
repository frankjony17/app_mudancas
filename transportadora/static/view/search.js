
Ext.define('ney.view.search', {
    extend: 'Ext.grid.Panel',
    xtype: 'search-grid-grid',
    // requires: [
    //     'Ext.toolbar.Paging',
    //     'Ext.ux.ProgressBarPager'
    // ],
    width: '100%',
    frame: true,
    features: [{
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: '{name} ({rows.length})'
    }],
     plugins: {
        rowexpander: {
            rowBodyTpl: new Ext.XTemplate(
                '<p><b>fone:</b> {fone}</p>',
                '<p><b>Serviços:</b> {servicioss}</p>',
                '<p><b>Materiais:</b> {materiales}</p>',
                '<p><b>Serviço observação:</b> {observacao1}</p>')
        }
    },
    scrollable: true,
    columnLines: true,

    initComponent: function() {
        var me = this;
        me.columns = [{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true
        },{
            text: 'Metragem',
            dataIndex: 'metragem',
            sortable: false,
            menuDisabled: true,
            width: 90
        },{
           text: 'Valor',
            columns: [{
                text: 'Seguro',
                dataIndex: 'valor_seguro',
                sortable: false,
                menuDisabled: true,
                width: 90
            },{
                text: 'Serviço',
                dataIndex: 'valor_servicio',
                sortable: false,
                menuDisabled: true,
                width: 90
            }]
        },{
           text: 'Endereço',
            columns: [{
                text: 'Origem',
                dataIndex: 'origem',
                sortable: false,
                menuDisabled: true,
                tdCls: 'wrap',
                width: 250
            },{
                text: 'Destino',
                dataIndex: 'destino',
                sortable: false,
                menuDisabled: true,
                tdCls: 'wrap',
                width: 250
            }]
        },{
            text: '<div style="text-align:center;">Vistoria</div>',
            dataIndex: 'vistoria',
            sortable: false,
            menuDisabled: true,
            tdCls: 'wrap',
            flex: 1
        },{
            text: '<div style="text-align:center;">Estado atual</div>',
            dataIndex: 'estado',
            sortable: false,
            menuDisabled: true,
            tdCls: 'wrap',
            flex: 1
        },{
            text: '<div style="text-align:center;">Observação</div>',
            dataIndex: 'observacao2',
            sortable: false,
            menuDisabled: true,
            tdCls: 'wrap',
            width: 200
        }];
        // me.progressbarpager = Ext.create('Ext.window.Window', {
        //     width: 640,
        //     header: false,
        //     tbar: [{
        //         xtype: 'pagingtoolbar',
        //         store: me.store,
        //         displayInfo: true,
        //         plugins: {
        //             'ux-progressbarpager': true
        //         },
        //         padding: '0 0 0 0'
        //     }]
        // });
        me.callParent(arguments);
    }
});