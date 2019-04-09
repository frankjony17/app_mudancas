
Ext.define('ney.controller.mudanca', {
    extend: 'Ext.app.Controller',
    control: {
        // Grid
        'mudanca-grid': {
            resize: "resize",
            afterrender: "after_render_grid",
            destroy: 'close_progressbarpager',
        },
        'mudanca-grid button[action=add]': {
            click: "show_form"
        },
        'mudanca-grid button[action=edit]': {
            click: "confirm_edit"
        },
        'mudanca-grid button[action=remove]': {
            click: "confirm_remove"
        },
        'mudanca-grid button[action=estado]': {
            click: "confirm_estado"
        },
        'mudanca-grid button[action=observacao]': {
            click: "confirm_observacao"
        },
        'mudanca-grid button[action=servicio]': {
            click: "confirm_servicio"
        },
        'mudanca-grid button[action=material]': {
            click: "confirm_material"
        },
        // Form
        'mudanca-form': {
            afterrender: "after_render_form"
        },
        'mudanca-edit-form': {
            afterrender: "after_render_edit_form"
        },
        'mudanca-estado-form': {
            afterrender: "after_render_estado_form"
        },
        'mudanca-observacao-form': {
            afterrender: "after_render_observacao_form"
        },
        'mudanca-servicios-form': {
            afterrender: "after_render_servicios_form"
        },
        'mudanca-materiales-form': {
            afterrender: "after_render_materiales_form"
        },
        'mudanca-form [text=Salvar]': {
            click: "is_valid"
        },
        'mudanca-edit-form [text=Editar]': {
            click: "is_valid_edit"
        },
        'mudanca-estado-form [text=Salvar]': {
            click: "is_estado_valid"
        },
        'mudanca-observacao-form [text=Editar]': {
            click: "is_observacao_valid"
        },
        'mudanca-servicios-form [text=Editar]': {
            click: "submit_servicos_form"
        },
        'mudanca-materiales-form [text=Editar]': {
            click: "submit_materiales_form"
        }
    },
    // Render component.
    resize: function (grid) {
        var center = Ext.getCmp('tab-panel-center');
        grid.setHeight(center.getHeight() - 45);
        this.position(grid);
    },
    position: function (grid) {
        var viewport = Ext.getCmp('tab-panel-center');
        grid.progressbarpager.setPosition(viewport.getWidth() - 640, viewport.getHeight() - 7);
        grid.progressbarpager.show();
    },
    after_render_grid: function (grid) {
        this.grid = grid;
        this.store = grid.getStore();
        this.position(grid);
    },
    close_progressbarpager: function (grid) {
        grid.progressbarpager.close();
    },
    after_render_form: function (window) {
        this.window = window;
        this.form = window.down('form');
    },
    after_render_edit_form: function (window) {
        this.windowEdit = window;
        this.formEdit = window.down('form');
    },
    after_render_estado_form: function (window) {
        this.windowEstado = window;
        this.formEstado = window.down('form');
    },
    after_render_observacao_form: function (window) {
        this.windowObservacao = window;
        this.formObservacao = window.down('form');
    },
    after_render_servicios_form: function (window) {
        this.windowServicios = window;
        this.formServicios = window.down('form');
    },
    after_render_materiales_form: function (window) {
        this.windowMateriales = window;
        this.formMateriales = window.down('form');
    },
    // Form Add/Edit.
    show_form: function () {
        var me = this, title = 'Adicionar mudanca.', buttontext = 'Salvar', url = '/ney/mudanca/add';
        var win = Ext.create('ney.view.mudanca.form', {
            url: url,
            title: title,
            store: me.store,
            buttontext: buttontext
        });
        win.show();
    },
    edit_form: function () {
        var me = this,
            win = Ext.create('ney.view.mudanca.edit', {
                store: me.store
            }),
            record = me.grid.selModel.getSelection()[0];
        win.down('[name=vistoria_id]').setValue(record.get('vistoria_id'));
        win.down('[name=observacao_id]').setValue(record.get('observacao_id'));
        win.down('form').loadRecord(record);
        win.show();
    },
    confirm_edit: function () {
        if (this.grid.selModel.getCount()===1) {
            this.edit_form();
        } else {
             Me.msg.question('Selecione o mudanca que você deseja editar <b>(apenas um)</b>.');
        }
    },
    is_valid: function () {
        if (this.form.getForm().isValid()) {
            this.submit_form();
        } else {
            Me.msg.question('<b><span style="color:red;">Formulário inválido</span></b>.')
        }
    },
    is_valid_edit: function () {
        if (this.formEdit.getForm().isValid()) {
            this.submit_edit_form();
        } else {
            Me.msg.question('<b><span style="color:red;">Formulário inválido</span></b>.')
        }
    },
    submit_form: function () {
        var me = this;
        this.form.submit({
            success: function () {
                me.store.reload();
                me.window.close();
                Me.show_toast('Operação bem sucedida.');
            },
            failure: function (form, action) {
                Me.msg.warning(action.response.responseText);
            }
        });
    },
    submit_edit_form: function () {
        var me = this;
        this.formEdit.submit({
            success: function () {
                me.store.reload();
                me.windowEdit.close();
                Me.show_toast('Operação bem sucedida.');
            },
            failure: function (form, action) {
                Me.msg.warning(action.response.responseText);
            }
        });
    },
    // Remove row.
    confirm_remove: function () {
        if (this.grid.selModel.getCount() >= 1) {
            Ext.MessageBox.confirm('Confirmação', 'Você deseja excluir o <b>('+ this.grid.selModel.getCount() +') mudancaS</b> selecionado?', confirm, this);
        } else {
             Me.msg.question('Selecione os <b>mudancas</b> que você deseja excluir.');
        }
        function confirm (btn) {
            if (btn === 'yes') {
                this.remove();
            }
        }
    },
    remove: function () { var me = this, ids = [];
        Ext.Array.each(this.grid.selModel.getSelection(), function (row) {
            ids.push(row.get('id'));
        });
        Ext.Ajax.request({
            url: '/ney/mudanca/remove',
            params: { ids:  Ext.encode(ids) },
            success: function(response) {
                if (response.responseText === '') {
                    Me.show_toast('Operação bem sucedida.');
                    me.store.reload();
                } else {
                    Me.msg.warning(response.responseText);
                }
            },
            failure: function(response){
                Me.msg.error(response.responseText);
            }
        });
    },
    // Form Estado
    confirm_estado: function () {
        if (this.grid.selModel.getCount()===1) {
            this.show_estado_form();
        } else {
             Me.msg.question('Selecione o mudanca que você deseja editar <b>(apenas um)</b>.');
        }
    },
    show_estado_form: function () {
        var me = this,
            record = me.grid.selModel.getSelection()[0],
            win = Ext.create('ney.view.mudanca.estado', {
                store: me.store,
                mudanca_id: record.get('id')
            });
        win.down('form').loadRecord(record);
        win.show();
    },
    is_estado_valid: function () {
        if (this.formEstado.getForm().isValid()) {
            this.submit_estado_form();
        } else {
            Me.msg.question('<b><span style="color:red;">Formulário inválido</span></b>.')
        }
    },
    submit_estado_form: function () {
        var me = this;
        this.formEstado.submit({
            success: function () {
                me.store.reload();
                me.windowEstado.close();
                Me.show_toast('Operação bem sucedida.');
            },
            failure: function (form, action) {
                Me.msg.warning(action.response.responseText);
            }
        });
    },
    // Form Observação
    confirm_observacao: function () {
        if (this.grid.selModel.getCount()===1) {
            this.show_observacao_form();
        } else {
             Me.msg.question('Selecione o mudanca que você deseja editar <b>(apenas um)</b>.');
        }
    },
    show_observacao_form: function () {
        var me = this,
            record = me.grid.selModel.getSelection()[0],
            win = Ext.create('ney.view.mudanca.observacao', {
                store: me.store,
                mudanca_id: record.get('id')
            });
        win.down('form').loadRecord(record);
        win.show();
    },
    is_observacao_valid: function () {
        if (this.formObservacao.getForm().isValid()) {
            this.submit_observacao_form();
        } else {
            Me.msg.question('<b><span style="color:red;">Formulário inválido</span></b>.')
        }
    },
    submit_observacao_form: function () {
        var me = this;
        this.formObservacao.submit({
            success: function () {
                me.store.reload();
                me.windowObservacao.close();
                Me.show_toast('Operação bem sucedida.');
            },
            failure: function (form, action) {
                Me.msg.warning(action.response.responseText);
            }
        });
    },
    // Add Serviços
    confirm_servicio: function () {
        if (this.grid.selModel.getCount()===1) {
            this.show_servicos_form(this.grid.selModel.getSelection()[0]);
        } else {
             Me.msg.question('Selecione o mudanca que você deseja editar <b>(apenas um)</b>.');
        }
    },
    show_servicos_form: function (record) {
        var me = this,
            win = Ext.create('ney.view.mudanca.servicios', {
                store: me.store,
                mudanca_id: record.get('id')
            });
        win.down('[xtype=tagfield]').setValue(record.get('servicioss').split(', '));
        win.show();
    },
    submit_servicos_form: function () {
        var me = this;
        this.formServicios.submit({
            success: function () {
                me.store.reload();
                me.windowServicios.close();
                Me.show_toast('Operação bem sucedida.');
            },
            failure: function (form, action) {
                Me.msg.warning(action.response.responseText);
            }
        });
    },
    // Add Material
    confirm_material: function () {
        if (this.grid.selModel.getCount()===1) {
            this.show_material_form(this.grid.selModel.getSelection()[0]);
        } else {
             Me.msg.question('Selecione o mudanca que você deseja editar <b>(apenas um)</b>.');
        }
    },
    show_material_form: function (record) {
        var me = this,
            win = Ext.create('ney.view.mudanca.materiales', {
                store: me.store,
                mudanca_id: record.get('id')
            });
        win.show();
    },
    submit_materiales_form: function () {
        var me = this;
        this.formMateriales.submit({
            success: function () {
                me.store.reload();
                me.windowMateriales.close();
                Me.show_toast('Operação bem sucedida.');
            },
            failure: function (form, action) {
                Me.msg.warning(action.response.responseText);
            }
        });
    }
});