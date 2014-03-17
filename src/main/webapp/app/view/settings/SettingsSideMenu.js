/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.settings.SettingsSideMenu', {
    extend: 'Ext.panel.Panel',
    layout: 'vbox',
    alias: 'widget.settingssidemenu',
    bodyCls: 'default_background',
    padding: '10 0 10 0',
    border: 0,
    items: [
        {
            xtype: 'button',
            text: 'Profile',
            scale: 'large',
            cls: 'settings_sidemenu_button',
            iconCls: 'profile_32',
            width: 137
        },
        {
            xtype: 'button',
            text: translations.USERS,
            scale: 'large',
            itemId: 'user',
            cls: 'settings_sidemenu_button',
            iconCls: 'users_32',
            width: 137
        },
        {
            xtype: 'button',
            text: translations.TICKETS,
            scale: 'large',
            cls: 'settings_sidemenu_button',
            iconCls: 'ticket_32',
            width: 137
        },
        {
          xtype: 'tbfill'  
        }
    ]
});

