/**
 * Created with IntelliJ IDEA.
 * User: rafaelpossas
 * Date: 10/28/13
 * Time: 3:12 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Helpdesk.model.User', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        {name: 'name'},
        {name: 'userName'},
        {name: 'password'},
        {name: 'client'},
        {name: 'isEnabled'},
        {name: 'email'},
        {name: 'userType'},
        {name: 'clientName', mapping: 'client.name',persist : false}

    ]
});
