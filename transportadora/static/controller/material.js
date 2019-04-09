
Ext.define('ney.controller.material', {
    extend: 'Ext.app.Controller',
    control: {
        // Grid
        'material-grid': {
            resize: "resize",
            afterrender: "after_render_grid",
            itemdblclick: "grid_dbl_click"
        },
        'material-grid button[action=add]': {
            click: "show_form"
        },
        'material-grid button[action=edit]': {
            click: "confirm_edit"
        },
        'material-grid button[action=remove]': {
            click: "confirm_remove"
        },
        // Form
        'material-form': {
            afterrender: "after_render_form"
        },
        'material-form [text=Salvar]': {
            click: "is_valid"
        },
        'material-form [text=Editar]': {
            click: "is_valid"
        }
    },
    resize: function (grid) {
        var center = Ext.getCmp('tab-panel-center');
        grid.setHeight(center.getHeight() - 45);
    },
    after_render_grid: function (grid) {
        this.grid = grid;
        this.store = grid.getStore();
    },
    after_render_form: function (window) {
        this.window = window;
        this.form = window.down('form');
    },
    grid_dbl_click: function () {
        this.show_form({action:'edit'})
    },
    show_form: function (button) {
        var me = this;
        if (button.action==='add') {
            var title = 'Adicionar materiais',
            buttontext = 'Salvar',
            url = '/ney/material/add';
        } else {
            title = 'Editar materiais';
            buttontext = 'Editar';
            url = '/ney/material/edit';
        }
        var win = Ext.create('ney.view.material.form', {
            url: url,
            title: title,
            store: me.store,
            buttontext: buttontext
        });
        if (button.action==='edit') {
            var record = me.grid.selModel.getSelection()[0];
            win.down('form').loadRecord(record);
        }
        win.show();
    },
    confirm_edit: function (button) {
        if (this.grid.selModel.getCount()===1) {
            this.show_form(button);
        } else {
             Me.msg.question('Selecione o materiais que você deseja editar <b>(apenas um)</b>.');
        }
    },
    is_valid: function () {
        if (this.form.getForm().isValid()) {
            this.submit_form();
        } else {
            Me.msg.question('<b><span style="color:red;">Formulário inválido</span></b>.')
        }
    },
    submit_form: function () {
        var me = this;
        this.form.submit({
            success: function () {
                me.store.reload();
                me.form.up('window').close();
                Me.show_toast('Operação bem sucedida.');
            },
            failure: function (form, action) {
                Me.msg.warning(action.response.responseText);
            }
        });
    },
    confirm_remove: function () {
        if (this.grid.selModel.getCount() >= 1) {
            Ext.MessageBox.confirm('Confirmação', 'Você deseja excluir o <b>('+ this.grid.selModel.getCount() +') materialS</b> selecionado?', confirm, this);
        } else {
             Me.msg.question('Selecione os <b>materiais</b> que você deseja excluir.');
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
            url: '/ney/material/remove',
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
    }
});