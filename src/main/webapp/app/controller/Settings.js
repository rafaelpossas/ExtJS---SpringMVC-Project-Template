/* 
 * @Author: rafaelpossas
 */
Ext.define('Helpdesk.controller.Settings', {
    extend: 'Ext.app.Controller',
    views: ['Helpdesk.view.settings.Settings'],
    init: function() {
        this.control({
            'settings > settingssidemenu': {
                render: this.onSettingsShow
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
            ref: 'settingsSideMenu',
            selector: 'settings > settingssidemenu'
        },
        {
            ref: 'usersButton',
            selector: 'settingssidemenu button#user'
        },
        {
            ref: 'generalButton',
            selector: 'settingssidemenu button#settings'
        }
    ],
    onSettingsShow: function() {
        this.getSettingsSideMenu().removeAll();
        if (user.isAdmin) {
            var generalButton = Ext.widget("button", {
                text: translations.GENERAL,
                scale: 'large',
                itemId: 'settings',
                cls: 'sidemenu-button',
                pressedCls: 'sidemenu-button-pressed',
                pressed: true,
                allowDepress: false,
                toggleGroup: 'side-nav',
                iconCls: 'users_32',
                width: 140
            });
            this.getSettingsSideMenu().insert(0, generalButton);
            var usersButton = Ext.widget("button", {
                text: translations.USERS,
                scale: 'large',
                itemId: 'user',
                cls: 'sidemenu-button',
                pressedCls: 'sidemenu-button-pressed',
                pressed: false,
                allowDepress: false,
                toggleGroup: 'side-nav',
                iconCls: 'users_32',
                width: 140
            });
            this.getSettingsSideMenu().insert(1, usersButton);
            var categoriesButton = Ext.widget("button", {
                text: translations.CATEGORIES,
                scale: 'large',
                itemId: 'category',
                cls: 'sidemenu-button',
                pressedCls: 'sidemenu-button-pressed',
                pressed: false,
                allowDepress: false,
                toggleGroup: 'side-nav',
                iconCls: 'category_32',
                width: 140
            });
            this.getSettingsSideMenu().insert(2, categoriesButton);
            var ticketsButton = Ext.widget("button", {
                text: translations.TICKETS,
                scale: 'large',
                cls: 'sidemenu-button',
                pressedCls: 'sidemenu-button-pressed',
                pressed: false,
                allowDepress: false,
                toggleGroup: 'side-nav',
                iconCls: 'ticket_32',
                width: 140
            });
            this.getSettingsSideMenu().insert(3, ticketsButton);

        }

    },
    index: function() {
        this.getCardPanel().getLayout().setActiveItem(Helpdesk.Globals.settingsview);
        this.getSettingsCardPanel().getLayout().setActiveItem(Helpdesk.Globals.settings_general_view);
        if (this.getGeneralButton().pressed === false) {
            this.getGeneralButton().toggle();
        }

    }
});
