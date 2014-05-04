/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.profile.ProfileSideMenu', {
    extend: 'Ext.panel.Panel',
    layout: 'vbox',
    alias: 'widget.profilesidemenu',
    bodyCls: 'default_background',
    padding: '10 0 10 0',
    defaults: {
        toggleGroup: 'side-nav',
        allowDepress: false
    },
    border: 0,
    items: [
        {
            xtype: 'button',
            text: translations.MY_PROFILE,
            scale: 'large',
            itemId: 'profile',
            cls: 'sidemenu-button',
            pressedCls: 'sidemenu-button-pressed',
            pressed: true,
            allowDepress: false,
            toggleGroup: 'side-nav',
            width: 140
        },
        {
            xtype: 'button',
            text: translations.PASSWORD,
            scale: 'large',
            itemId: 'password',
            cls: 'sidemenu-button',
            pressedCls: 'sidemenu-button-pressed',
            pressed: false,
            allowDepress: false,
            toggleGroup: 'side-nav',
            width: 140
        }
    ]
});



