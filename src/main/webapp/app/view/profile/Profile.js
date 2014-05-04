/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.profile.Profile', {
    extend: 'Ext.container.Container',
    itemId: 'profileContainer',
    layout: {
        type: 'border'
                //align: 'stretch'
    },
    alias: 'widget.profile',
    requires: [
        'Helpdesk.view.Translation', 'Helpdesk.view.profile.ProfileSideMenu'
    ],
    items: [
        {
            xtype: 'profilesidemenu',
            width: 140,
            region: 'west'
        },
        {
            xtype: 'container',
            region: 'center',
            layout: 'card',
            itemId: 'profilecardpanel',
            items: [
                {
                    xtype: 'form',
                    itemId: 'profileform',
                    items: [
                        {
                            xtype: 'fieldset',
                            id: "profilefieldset",
                            defaults: {
                                allowBlank: false
                            },
                            layout: {
                                type: 'vbox'
                            },
                            border: 0,
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    name: 'id'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: translations.NAME,
                                    width: 400,
                                    name: 'name',
                                    labelAlign: 'top',
                                    labelStyle: "font-weight: bold;",
                                    style: 'margin: 5px 5px 5px 5px',
                                    msgTarget: 'under'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: translations.EMAIL,
                                    width: 400,
                                    name: 'email',
                                    labelAlign: 'top',
                                    labelStyle: "font-weight: bold;",
                                    style: 'margin: 0px 5px 0px 5px',
                                    msgTarget: 'under'
                                },
                                {
                                    xtype: 'button',
                                    text: translations.SAVE,
                                    scale: 'medium',
                                    formBind: true,
                                    cls: 'blue_button',
                                    itemId: 'saveChangeProfile',
                                    style: 'margin: 5px 5px 5px 5px'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'form',
                    itemId: 'passwordform',
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            id: "passwordfieldset",
                            layout: 'vbox',
                            defaults: {
                                anchor: '100%',
                                allowBlank: false
                            },
                            border: 0,
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    name: 'id'
                                },
                                {
                                    xtype: 'textfield',
                                    inputType: 'password',
                                    fieldLabel: translations.PASSWORD,
                                    width: 400,
                                    name: 'newpassword',
                                    labelAlign: 'top',
                                    labelStyle: "font-weight: bold;",
                                    style: 'margin: 5px 5px 5px 5px'
                                },
                                {
                                    xtype: 'textfield',
                                    inputType: 'password',
                                    fieldLabel: translations.CONFIRM_PASSWORD,
                                    width: 400,
                                    name: 'confirmpassword',
                                    labelAlign: 'top',
                                    labelStyle: "font-weight: bold;",
                                    style: 'margin: 0px 5px 0px 5px'
                                },
                                {
                                    xtype: 'button',
                                    text: translations.SAVE,
                                    scale: 'medium',
                                    cls: 'blue_button',
                                    formBind: true,
                                    itemId: 'saveChangePassword',
                                    style: 'margin: 5px 5px 5px 5px'
                                }
                            ]
                        },
                        {
                            xtype: 'component',
                            margin: '0px 5px 0px 5px',
                            renderTpl: [
                                '<h3 style=\"margin-top: 4px;\">'+translations.CHOOSING_SAFE_PASSWORD+'<h3>',
                                '<ul>',
                                '<li>'+ translations.PWD_BETWEEN_8_14_CHARS+'</li>',
                                '<li>'+ translations.MUST_CONTAIN_NUMBER+'</li>',
                                '<li>'+ translations.AT_LEAST_ONE_LETTER+'</li>',
                                '</ul>'
                            ]

                        }

                    ]
                }


            ]
        }
    ]
});
