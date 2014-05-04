/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Helpdesk.view.exception.ExceptionWindow', {
    extend: "Ext.window.Window",
    alias: 'widget.errorwindow',
    bodyPadding: 5,
    closable: false,
    closeAction: 'hide',
    modal: true,
    resizable: false,
    title: translations.SESSION_TIMEOUT_WARNING,
    width: 325,
    items: [{
            xtype: 'container',
            frame: true,
            html: translations.SESSION_TIMEOUT_TEXT
        }, {
            xtype: 'label',
            text: ''
        }],
    buttons: [{
            text: translations.CONTINUE_WORKING,
            handler: function() {
                Ext.TaskManager.stop(Helpdesk.util.SessionMonitor.countDownTask);
                Helpdesk.util.SessionMonitor.window.hide();
                Helpdesk.util.SessionMonitor.start();
                // 'poke' the server-side to update your session.
                Ext.Ajax.request({
                    url: 'user/poke.action'
                });
            }
        }, {
            text: translations.LOGOUT,
            action: 'logout',
            handler: function() {
                Ext.TaskManager.stop(Helpdesk.util.SessionMonitor.countDownTask);
                Helpdesk.util.SessionMonitor.window.hide();

                // find and invoke your app's "Logout" button.
                Ext.ComponentQuery.query('button#logout')[0].fireEvent('click', Ext.ComponentQuery.query('button#logout')[0]);
            }
        }]

});
