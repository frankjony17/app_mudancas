
Ext.define('ney.controller.login', {
    extend: 'Ext.app.Controller',
    control: {
        '#portal-login-btn-ok': {
            click: "validate"
        },
        '#login-textfield-usuario': {
            specialkey: "special_key_usuario"
        },
        '#login-textfield-password': {
            specialkey: "special_key_password"
        }
    },
    special_key_usuario: function (field, e) { var me = this;
        if (e.getKey() === e.ENTER) {
            var pass = Ext.getCmp('login-textfield-password');
            pass.focus(50, true);
        }
    },
    special_key_password: function (field, e) { var me = this;
        if (e.getKey() === e.ENTER) {
            me.validate(field);
        }
    },
    validate: function (btn) {
        var me = this, form = btn.up('form');

        me.disabled_button(form, true);

        if (form.getForm().isValid()) {
            me.login(form.getForm().getValues(), form);
        } else {
            me.disabled_button(form, false);
        }
    },
    disabled_button: function (form, bool) {
        form.down('[id=portal-login-btn-ok]').setDisabled(bool);
    },
    login: function (record, form) { var me = this;
        Ext.Ajax.request({
            url: '/security/login/check/',
            params: {
                username: record['username'],
                password: record['password']
            },
            success: function(response) {
                switch(response.responseText) {
                    case 'ney':
                        location.href = '/ney';
                        break;
                    case 'logout':
                        location.href = '/security/logout';
                        break;
                    default:
                        Me.msg.warning(response.responseText);
                        me.disabled_button(form, false);
                        break;
                }
            },
            failure: function(response) {
                Me.msg.error(response.responseText);
            }
        });
    }
});


