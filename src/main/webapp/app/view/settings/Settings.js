/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.settings.Settings', {
    extend: 'Ext.container.Container',
    alias: 'widget.settings',
    layout: {
        type: 'border'
        //align: 'stretch'
    },
    requires: [
        'Helpdesk.view.Translation','Helpdesk.view.settings.SettingsSideMenu','Helpdesk.view.user.Users','Helpdesk.view.category.Categories'
    ],
    items: [
        {
            xtype: 'settingssidemenu',
            region: 'west',
            width: 140
        },
        {
            xtype: 'container',
            region: 'center',
            layout: 'card',
            itemId: 'settingscardpanel',
            items:[
                {
                    html: "This is general panel"
                },
                {
                    xtype: 'users'
                },
                {
                    xtype: 'categories'
                }
            ]
        }
    ]
});
