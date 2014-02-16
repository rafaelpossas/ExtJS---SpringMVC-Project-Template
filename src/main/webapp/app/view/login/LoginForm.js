/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Helpdesk.view.login.LoginForm', {// #1
    extend: 'Ext.panel.Panel', // #2
    alias: 'widget.loginform', // #3

    height: 200, // #5
    width: 400, // #6
    layout: {
        type: 'fit'              // #7
    },
    iconCls: 'key', // #8
    title: translations.LOGIN, // #9
    items: [
        {
            xtype: 'form', // #12
            itemId: 'mainform',
            url: 'j_spring_security_check',
            frame: true, // #13
            bodyPadding: 15, // #14
            defaults: {// #15
                xtype: 'textfield', // #16
                anchor: '100%', // #17
                labelWidth: 100,
                allowBlank: false, // #20
                vtype: 'alphanum', // #21
                minLength: 3, // #22
                msgTarget: 'under' // #23”

            },
            items: [
                {
                    name: 'j_username',
                    fieldLabel: translations.USER,
                    maxLength: 15
                },
                {
                    inputType: 'password', // #19
                    name: 'j_password',
                    fieldLabel: translations.PASSWORD,
                    enableKeyEvents: true,
                    id: "password",
                    maxLength: 25
                },
                {
                    xtype: 'checkbox',
                    name: '_spring_security_remember_me',
                    fieldLabel: translations.REMEMBER
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'translation' //#24
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button', // #26
                            itemId: 'submit',
                            formBind: true, // #27
                            iconCls: 'submit_16',
                            text: translations.ENTER
                        }
                    ]
                }
            ]
        }
    ]
});