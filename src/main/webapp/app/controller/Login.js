/* 
 * Controller responsável por executar o login e redirecionar a aplicação para página principal
 * O controller escuta o evento do botão submit dentro do form da página inicial, e quando clicado
 * esse botão executa a função de submit do form
 */
Ext.define('Helpdesk.controller.Login', {
    extend: 'Ext.app.Controller',
    views: ['login.Login'],
    refs: [
        {
            ref: 'capslockTooltip',
            selector: 'capslocktooltip'
        }
    ],
    init: function() {
        this.control({
            'loginform button#submit': {
                click: this.onSubmit
            },
            'loginform form textfield': {
                specialkey: this.onTextfieldSpecialKey
            },
            'loginform form textfield[id=password]': {
                keypress: this.onTextfieldKeyPress
            },
            'mainheader button#logout': {
                click: this.onButtonClickLogout
            }
        });

    },
    onButtonClickLogout: function(button, e, options) {     
        
        Ext.Ajax.request({
            url: 'logout',
            success: function(response) {
                window.location.href = "../" + homeURL;
            }
        });
    },
    onTextfieldKeyPress: function(field, e, options) {
        var charCode = e.getCharCode(); // #1
        var capsLockTooltip;
        if ((e.shiftKey && charCode >= 97 && charCode <= 122) || // #2
                (!e.shiftKey && charCode >= 65 && charCode <= 90)) {

            if (this.getCapslockTooltip() === undefined) { // #3
                Ext.widget('capslocktooltip');           // #4
            }
            this.getCapslockTooltip().show(); // #5

        } else {

            if (this.getCapslockTooltip() !== undefined) { // #6
                this.getCapslockTooltip().hide();        // #7
            }
        }

    },
    onTextfieldSpecialKey: function(field, e, options) {
        if (e.getKey() === e.ENTER) {
            var submitBtn = field.up('form').down('button#submit'); // Pega o elemento pai para depois buscar a referência ao botão
            submitBtn.fireEvent('click', submitBtn, e, options);
        }
    },
    onSubmit: function(button, e, options) {
        var form = button.up('form');
        var formTopElement = Ext.get(form.getEl()); // Busca pelo elemento superior que representa o componente (Neste caso o PANEL)
        formTopElement.mask(translations.AUTHENTICATING, 'loading'); // Adiciona a máscara de carregamento 
        form.submit({
            method: 'POST',
            success: function(obj, action) {
                Ext.get(form.getEl()).unmask(); // Remove a máscara de carregamento
                window.location.href = "../" + homeURL;
                /*
                 Ext.Ajax.request({
                 url: 'home',
                 params: {
                 },
                 success: function(response) {
                 var text = response.responseText;
                 // process server response here
                 }
                 });
                 */
            },
            failure: function(form, action) {
                var obj = Ext.JSON.decode(action.response.responseText);
                if (action.failureType === 'server') {
                    var translatedError = "";
                    if (obj.error === 'badcredentials') {
                        translatedError = translations.BAD_CREDENTIALS;
                    }
                    if (obj.error === 'credentialsexpired') {
                        translatedError = translations.CREDENTIALS_EXPIRED;
                    }
                    if (obj.error === 'accountlocked') {
                        translatedError = translations.ACCOUNT_LOCKED;
                    }
                    if (obj.error === 'accountdisabled') {
                        translatedError = translations.ACCOUNT_DISABLED;
                    }
                    Ext.Msg.alert(translations.LOGIN_FAILED, translatedError);
                } else {
                    Ext.Msg.alert(translations.ERROR, translations.CONNECTING_ERROR);

                }
                formTopElement.unmask(); // Remove máscara de carregamento
                form.reset();
            }
        });
    }

});


