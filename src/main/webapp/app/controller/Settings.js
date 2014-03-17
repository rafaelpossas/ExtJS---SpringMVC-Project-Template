/* 
 * @Author: rafaelpossas
 */
Ext.define('Helpdesk.controller.Settings', {
    extend: 'Ext.app.Controller',
    views: ['Helpdesk.view.settings.Settings'],
    init: function() {
        this.control({
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
        }
    ],
    index: function() {
        this.getCardPanel().getLayout().setActiveItem(Helpdesk.Globals.settingsview);
        this.getSettingsCardPanel().getLayout().setActiveItem(Helpdesk.Globals.settings_profile_view);
    }
});
