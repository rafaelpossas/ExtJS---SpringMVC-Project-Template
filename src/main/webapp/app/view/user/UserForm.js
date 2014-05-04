/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.user.UserForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.userform',
    requires: ['Helpdesk.util.Util', 'Helpdesk.view.usergroup.UserGroupComboBox', 'Helpdesk.view.client.ClientComboBox'],
    bodyPadding: 5,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'fieldset',
            flex: 2,
            title: translations.USER,
            defaults: {
                beforeLabelTextTpl: Helpdesk.util.Util.required,
                anchor: '100%',
                xtype: 'textfield',
                allowBlank: false,
                labelWidth: 60
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'id'
                },
                {
                    fieldLabel: translations.NAME,
                    maxLength: 100,
                    name: 'name'
                },
                {
                    fieldLabel: translations.USER,
                    name: 'userName',
                    itemId: 'userName',
                    vtype: 'uniqueUserName',
                    msgTarget: 'under',
                    enableKeyEvents: true
                },
                {
                    inputType: 'password',
                    fieldLabel: translations.PASSWORD,
                    name: 'password'
                },
                {
                    fieldLabel: translations.EMAIL,
                    maxLength: 100,
                    name: 'email'
                },
                {
                    xtype: 'clientcombobox',
                    listeners: {
                        select: function(combo, records, eOpts) {
                            var form = this.up('form');
                            var record = form.getRecord();
                            var client = Helpdesk.util.Util.copy(records[0]);
                            record.set('client', client);
                            form.updateRecord(record);

                        }
                    }

                },
                {
                    xtype: 'filefield',
                    fieldLabel: 'Picture',
                    name: 'picture',
                    allowBlank: true,
                    beforeLabelTextTpl: ''
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Ativo?',
                    name: 'isEnabled',
                    inputValue: true,
                    uncheckedValue: false
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Admin?',
                    name: 'isAdmin',
                    inputValue: true,
                    uncheckedValue: false
                }

            ]
        },
        {
            xtype: 'fieldset',
            title: translations.PICTURE,
            width: 170, // #1
            items: [
                {
                    xtype: 'image', // #2
                    height: 180,
                    width: 150,
                    src: ''         // #3
                }
            ]
        }
    ]

});
