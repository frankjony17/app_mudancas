
Ext.define('ney.view.mudanca.grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'mudanca-grid',
    requires: [
        'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager'
    ],
    selModel: 'checkboxmodel',
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
        me.store = Ext.create('ney.store.mudanca');
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
        },{
            dataIndex: 'observacao1',
            hidden: true
        },{
            dataIndex: 'endereco_id',
            hidden: true
        },{
            dataIndex: 'vistoria_data',
            hidden: true
        },{
            dataIndex: 'vistoria_hora',
            hidden: true
        },{
            dataIndex: 'vistoria_fechada',
            hidden: true
        },{
            dataIndex: 'vistoriador',
            hidden: true
        },{
            dataIndex: 'vistoria_id',
            hidden: true
        },{
            dataIndex: 'observacao_id',
            hidden: true
        },{
            dataIndex: 'estado_apanha',
            hidden: true
        },{
            dataIndex: 'estado_entrega',
            hidden: true
        },{
            dataIndex: 'estado_plaso_entrega',
            hidden: true
        },{
            dataIndex: 'servicioss',
            hidden: true
        },{
            dataIndex: 'materiales',
            hidden: true
        }];
        me.lbar = [{
            xtype: 'button',
            tooltip: 'Adicionar mudança',
            iconCls: 'fa fa-plus',
            action: 'add'
        },'-',{
            xtype: 'button',
            iconCls: 'x-fa fa-edit',
            tooltip: 'Editar mudança',
            action: 'edit'
        },{
            xtype: 'button',
            iconCls: 'trash',
            tooltip: 'Remover mudança',
            action: 'remove'
        },'-',{
            xtype: 'button',
            iconCls: 'x-fa fa-asterisk',
            tooltip: 'Status de mudança',
            action: 'estado'
        },{
            xtype: 'button',
            iconCls: 'x-fa fa-commenting',
            tooltip: 'Observação de serviço',
            action: 'observacao'
        },'-',{
            xtype: 'button',
            iconCls: 'x-fa fa-road',
            tooltip: 'Tipo de <b>Serviços</b>',
            action: 'servicio'
        },{
            xtype: 'button',
            iconCls: 'x-fa fa-archive',
            tooltip: 'Tipo de <b>Materiais</b>',
            action: 'material'
        }];
        me.progressbarpager = Ext.create('Ext.window.Window', {
            width: 640,
            header: false,
            tbar: [{
                xtype: 'pagingtoolbar',
                store: me.store,
                displayInfo: true,
                plugins: {
                    'ux-progressbarpager': true
                },
                padding: '0 0 0 0'
            }],
            id: 'progressbarpager-tarea-op'
        });
        me.callParent(arguments);
    }
});