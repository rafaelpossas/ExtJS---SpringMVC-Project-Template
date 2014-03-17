/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.home.MainHeader', {
    extend: 'Ext.toolbar.Toolbar',
    requires: ['Helpdesk.Globals'],
    alias: 'widget.mainheader', // #2
    itemId: 'main-nav-toolbar',
    height: 60, // #3
    layout: {
        type: 'hbox',
        align: 'bottom'
    },
    defaults: {
        padding: '0 20',
        toggleGroup: 'main-nav',
        allowDepress: false
    },
    padding: 0,
    style: 'border-bottom: 4px solid #1e62d0;',
    items: [
        {
            xtype: "image",
            src: homeURL + translations.PROCYMO_LOGO,
            border: 0,
            style: 'margin-right: 30px;',
            height: 50,
            width: 200
        },
        {
            xtype: 'button',
            itemId: 'home',
            text: 'Início',
            pressed: true,
            baseCls: 'tab-button'
        },
        {
            xtype: 'button',
            text: 'Tickets',
            itemId: 'ticket',
            baseCls: 'tab-button'
        },
        {
            xtype: 'tbfill'
        },
        {
            xtype: 'container',
            height: '100%',
            layout: {
                type: 'hbox',
                align: 'top'
            },
            items: [
                {
                    xtype: 'button',
                    text: Helpdesk.Globals.email,
                    style: 'cursor: default !important;border-style: none !important;background: transparent !important;'
                },
                {
                    xtype: 'button',
                    itemId: 'myProfile',
                    iconCls: 'profile_16',
                    style: 'border-style: none !important;background: transparent !important;',
                    text: 'Meu Perfil'
                },
                {
                    xtype: 'button',
                    itemId: 'settings',
                    iconCls: 'config_16',
                    style: 'border-style: none !important;background: transparent !important;',
                    text: 'Configurações'
                },
                {
                    xtype: 'button',
                    style: 'border-style: none !important;background: transparent !important;',
                    iconCls: 'logout_16',
                    itemId: 'logout',
                    text: 'Sair'
                }
            ]

        }
    ]
});
