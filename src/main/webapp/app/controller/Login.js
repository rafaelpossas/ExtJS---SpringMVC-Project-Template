/* 
 * @Author: rafaelpossas
 * 
 * This controller is responsible for creating the login view, listening for the events
 * dispatched by this view and redirecting the user to the main application, moreover
 * it will parse and display any errors returned from the server and/or dispatched by 
 * the login form.
 * 
 * The form has a Caps Lock warning that will be shown to the user whenever the key
 * is active on the keyboard. The function which this resposibility was assigned is
 * onTextfieldKeyPress. This function will listen for every character typed by the user
 * hence if this character is in uppercase the tooltip will be showed.
 * 
 * This controller was declared in the login.js file which can be located at the root
 * folder of the application.
 * 
 * Views:
 *    view/login/Login.js
 *    view/login/LoginForm.js
 *    view/login/CapsLockTooltip.js
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
            'loginview button#signin': {
                click: this.onSignInClick
            },
            'loginform form textfield': {
                specialkey: this.onTextfieldSpecialKey
            },
            'loginform form textfield[id=password]': {
                keypress: this.onTextfieldKeyPress
            },
            'mainheader #logout': {
                click: this.onButtonClickLogout
            }
        });

    },
    onSignInClick: function(button, e, options) {
        var win = Ext.create('Helpdesk.view.user.Profile');
        win.setTitle(translations.ADD_NEW_USER);
        win.down('form').loadRecord(Ext.create('Helpdesk.model.User'));
        win.show();
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
        var charCode = e.getCharCode();
        if ((e.shiftKey && charCode >= 97 && charCode <= 122) ||
                (!e.shiftKey && charCode >= 65 && charCode <= 90)) {

            if (this.getCapslockTooltip() === undefined) {
                Ext.widget('capslocktooltip');
            }
            this.getCapslockTooltip().show();

        } else {

            if (this.getCapslockTooltip() !== undefined) {
                this.getCapslockTooltip().hide();
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
            scope: this,
            success: function(obj, action,success) {
                Ext.get(form.getEl()).unmask(); // Remove a máscara de carregamento
                window.location.href = "../" + homeURL;

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


