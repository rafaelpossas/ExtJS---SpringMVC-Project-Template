/**
 * @Author: rafaelpossas
 * This controller will be called in the "configuration->users" window, and it will 
 * be responsible for listing, adding and editing users.
 * 
 * The userslists view is the dataGrid with the docked buttons and will dispatch
 * all the CRUD operatios for the USER MODEL.
 * 
 * Views:
 *    /view/user/Profile -> Window for creating/editing a new User
 *    /view/user/Users -> Panel that is added to the card layout
 *    /view/user/UsersList -> Data Grid with the CRUD operations
 */
Ext.define('Helpdesk.controller.User', {
    extend: 'Ext.app.Controller',
    requires: ['Helpdesk.store.Users', 'Helpdesk.util.Dialogs'],
    stores: ['Users'],
    views: ['user.Users', 'Helpdesk.view.user.User'],
    successMessage: "<div style=\"width:403px;margin-top:15px;margin-left:3px;\" class=\"html_success_message\">" + translations.DATA_WAS_SAVED_WITH_SUCCESS + "</div>",
    failureMessage: "<div style=\"width:403px;margin-top:15px;margin-left:3px;\" class=\"html_failure_message\">" + translations.PASSWORDS_DONT_MATCH + "</div>",
    init: function() {
        this.control({
            'users button#add': {
                click: this.onButtonClickAdd
            },
            'users button#delete': {
                click: this.onButtonClickDelete
            },
            'users button#edit': {
                click: this.onButtonClickEdit
            },
            'user button#save': {
                click: this.onButtonClickSave
            },
            'user button#cancel': {
                click: this.onButtonClickCancel
            },
            'user filefield': {
                change: this.onFilefieldChange
            },
            'profile button#saveChangeProfile': {
                click: this.onProfileSave
            },
            'profile button#saveChangePassword': {
                click: this.onPasswordSave
            }

        });


    },
    refs: [
        {
            ref: 'cardPanel',
            selector: 'viewport > container#maincardpanel'
        },
        {
            ref: 'settingsCardPanel',
            selector: 'settings > #settingscardpanel'
        },
        {
            ref: 'usersList',
            selector: 'users > userslist'
        },
        {
            ref: 'userPicture',
            selector: 'user > userform image'
        },
        {
            ref: 'userButton',
            selector: 'settingssidemenu button#user'
        },
        {
            ref: 'profileButton',
            selector: 'profilesidemenu button#profile'
        },
        {
            ref: 'passwordButton',
            selector: 'profilesidemenu button#password'
        },
        {
            ref: 'profileCardPanel',
            selector: 'profile > #profilecardpanel'
        },
        {
            ref: 'profileForm',
            selector: 'profile #profileform'
        },
        {
            ref: 'passwordForm',
            selector: 'profile #passwordform'
        }
    ],
    profile: function(button, e, options) {

        this.getCardPanel().getLayout().setActiveItem(Helpdesk.Globals.profileview);

        this.getProfileCardPanel().getLayout().setActiveItem(0);

        if (this.getProfileButton().pressed === false) {
            this.getProfileButton().toggle();
        }
        this.getProfileForm().getForm().findField('name').setValue(user.name);
        this.getProfileForm().getForm().findField('email').setValue(user.email);
        this.getProfileForm().getForm().findField('id').setValue(user.id);
        $(".html_success_message").remove();
        $(".html_failure_message").remove();


    },
    onProfileSave: function(button, e, options) {

        var values = this.getProfileForm().getValues();
        var scope = this;
        this.getUsersStore().saveProfile(values, function(data, status) {
            if (status === "success") {
                var tempUser = JSON.parse(data);
                user.name = tempUser.name;
                user.email = tempUser.email;
                $("#profilefieldset").prepend(scope.successMessage);

            }
        });
    },
    onPasswordSave: function(button, e, options) {
        var values = this.getPasswordForm().getValues();
        var scope = this;
        if (values.newpassword !== values.confirmpassword) {
            $("#passwordfieldset").prepend(scope.failureMessage);
        } else {
            this.getUsersStore().savePassword(values, function(data, status) {
                if (status === "success") {
                    $("#passwordfieldset").prepend(scope.successMessage);
                }
            });
        }

    },
    password: function(button, e, options) {
        this.getCardPanel().getLayout().setActiveItem(Helpdesk.Globals.profileview);
        this.getProfileCardPanel().getLayout().setActiveItem(Helpdesk.Globals.profile_password_view);
        if (this.getPasswordButton().pressed === false) {
            this.getPasswordButton().toggle();
        }
        $(".html_failure_message").remove();
        $(".html_success_message").remove();
        this.getPasswordForm().getForm().findField('newpassword').reset();
        this.getPasswordForm().getForm().findField('confirmpassword').reset();
        this.getPasswordForm().getForm().findField('id').setValue(user.id);
    },
    list: function() {
        var mainCardPanelIndex = this.getCardPanel().items.indexOf(this.getCardPanel().getLayout().getActiveItem());
        if (mainCardPanelIndex !== Helpdesk.Globals.settingsview) {
            this.getCardPanel().getLayout().setActiveItem(Helpdesk.Globals.settingsview);
        }
        this.getSettingsCardPanel().getLayout().setActiveItem(Helpdesk.Globals.settings_users_view);
        this.getUsersList().getStore().load();
        if (this.getUserButton().pressed === false) {
            this.getUserButton().toggle();
        }
    },
    onButtonClickAdd: function(button, e, options) {
        var win = Ext.create('Helpdesk.view.user.User');
        win.setTitle(translations.ADD_NEW_USER);
        win.down('form').loadRecord(Ext.create('Helpdesk.model.User'));
        win.show();
    },
    onButtonClickEdit: function(button, e, options) {
        var grid = this.getUsersList(); // #1
        var record = grid.getSelectionModel().getSelection();
        if (record[0]) { // #2
            var editWindow = Ext.create('Helpdesk.view.user.User');
            var formPanel = editWindow.down('form');
            formPanel.loadRecord(record[0]); // #3
            formPanel.getForm().findField('userName').setDisabled(true);
            formPanel.getForm().findField('userName').setReadOnly(true);
            if (record[0].get('picture')) { //#4
                var img = editWindow.down('image');
                img.setSrc('resources/profileImages/' + record[0].get('picture'));
            }
            editWindow.setTitle(record[0].get('name')); // #5
            editWindow.show();
        }
    },
    onButtonClickCancel: function(button, e, options) {
        var win = button.up('window');
        win.close();
    },
    onButtonClickSave: function(button, e, options) {

        var win = button.up('window');
        var form = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();
        var grid = this.getUsersList();
        record.set(values);
        this.getUsersStore().add(record);
        if (this.getUsersStore().getModifiedRecords().length > 0) {
            this.getUsersStore().sync({
                success: function(result) {
                    form.loadRecord(result.operations[0].records[0]);
                    grid.getStore().load();
                }
            });
        } else {
            Ext.Msg.alert(translations.INFORMATION, translations.NOTHING_TO_SAVE);
        }
    },
    onFilefieldChange: function(filefield, value, options) {

        var file = filefield.fileInputEl.dom.files[0]; // #1

        var picture = this.getUserPicture(); // #2

        if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {                // #3
            var reader = new FileReader(); // #4
            reader.onload = function(e) {         // #5
                picture.setSrc(e.target.result); // #6
            };
            reader.readAsDataURL(file); // #7
        } else if (!(/image/i).test(file.type)) { // #8
            Ext.Msg.alert('Warning', 'You can only upload image files!');
            filefield.reset(); // #9
        }
    },
    onButtonClickDelete: function(button, e, options) {
        var grid = this.getUsersList();
        var record = grid.getSelectionModel().getSelection()[0];
        var store = grid.getStore();
        Helpdesk.util.Dialogs.deleteDialog(function(buttonId) {
            if (buttonId == 'yes') {
                store.remove(record);
                store.sync();
            }
        }, this);
    }

});