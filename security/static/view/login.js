Ext.define('ney.view.login', {
    extend: 'Ext.container.Viewport',
    xtype: 'login',
    layout: 'border',
    bodyStyle: 'padding: 15px;',

    initComponent: function() { var me = this;
        me.br = {
            xtype: 'box',
            autoEl: {tag: 'br', html: '<br></br>'}
        };
        me.items = [{
            region: 'center',
            bodyStyle: 'background-image:url(/../static/images/square.gif);',
            items: [{
                xtype: 'window',
                title: 'Ney Mudanças',
                titleAlign: 'center',
                autoShow: true,
                closable: false,
                padding: '10px 10px 10px 10px',
                width: 480,
                height: 220,
                y: 85,
                items: [{
                    xtype: 'form',
                    fieldDefaults: {
                        maxLength: 25,
                        allowBlank: false,
                        labelSeparator: '',
                        labelStyle: 'font-weight:bold; font-size:14px; text-shadow: 0 1px 0 #fff;',
                        fieldStyle: 'font-size:14px;',
                        height: 30
                    },
                    defaultType: 'textfield',
                    items: [me.br, {
                        fieldLabel: 'Usuário',
                        emptyText: 'Nome de usuário',
                        enableKeyEvents: true,
                        selectOnFocus: true,
                        name: 'username',
                        id: 'login-textfield-usuario',
                        maskRe: /[a-z\.\ñ\á\é\í\ó\ú]/,
                        regex: /[a-z]/,
                        width: 450
                    }, me.br, {
                        fieldLabel: 'Senha',
                        emptyText: 'Senha',
                        inputType: 'password',
                        name: 'password',
                        id: 'login-textfield-password',
                        width: 450
                    }, {
                        xtype: 'box',
                        autoEl: {tag: 'span', html: '<span>' + me.nbsp(184) + '</span>'}
                    }, {
                        xtype: 'button',
                        text: '<div style="font-size:larger;">Iniciar sessão</div>',
                        iconCls: 'login',
                        tooltip: 'Pressione o botão para enviar os dados.',
                        buttonAlign: 'end',
                        id: 'portal-login-btn-ok',
                        width: 140,
                        height: 30
                    }]
                }]
            }]
        }];
        me.callParent(arguments);
    },
    nbsp: function (num) {
        var nbsp = '';
        for (var i = 0; i < num; i++){
            nbsp += '&nbsp;';
            i++;
        }
        return nbsp;
    }
});