/**
 * Created with IntelliJ IDEA.
 * User: rafaelpossas
 * Date: 10/21/13
 * Time: 12:56 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.application({
    requires: ['Helpdesk.view.Viewport','Helpdesk.util.SessionMonitor'],
    name: 'Helpdesk',
    enableQuickTips: true,
    appProperty: 'Current', 
    controllers: [
        'Users', 'Login', 'Translation','Dashboard'
    ],
    init: function() {
    },
    launch: function() {
        this.viewport = Ext.create('Helpdesk.view.Viewport');
        Helpdesk.util.SessionMonitor.start();
    }
});