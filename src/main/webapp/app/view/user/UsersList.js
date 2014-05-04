/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.user.UsersList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userslist',
    frame: true,
    constructor: function(config) {
        this.param = config.param; // get your param value from the config object
        config.store = Ext.create('Helpdesk.store.Users', {}); // Blank Configuration needs to be passed in order to trigger the constructor call of the class
        this.callParent(arguments);
    },
    columns: [
        {
            width: 200,
            dataIndex: 'name',
            flex: 1,
            text: translations.NAME
        },
        {
            width: 150,
            dataIndex: 'userName',
            text: translations.USER
        },
        {
            width: 250,
            dataIndex: 'email',
            text: translations.EMAIL
        },
        {
            width: 150,
            dataIndex: 'userType',
            text: translations.GROUP,
            renderer: function(value, metaData, record) { // #2
                return value != null ? value : value;
            }
        }
    ]

});

