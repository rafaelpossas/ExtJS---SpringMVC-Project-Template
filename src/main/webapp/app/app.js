/**
 * User: rafaelpossas
 * Date: 10/21/13
 * Time: 12:56 PM
 */

Ext.application({
    requires: ['Helpdesk.view.Viewport','Helpdesk.util.SessionMonitor'],
    name: 'Helpdesk',
    enableQuickTips: true,
    appProperty: 'Current', 
    controllers: [
        'Users', 'Login', 'Translation','Home'
    ],
    init: function() {
    },
    launch: function() {
        this.viewport = Ext.create('Helpdesk.view.Viewport');
        Helpdesk.util.SessionMonitor.start(); // Starts the session monitor
    }
});