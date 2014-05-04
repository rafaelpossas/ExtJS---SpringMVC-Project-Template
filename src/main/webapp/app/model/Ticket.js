/**
 * Created with IntelliJ IDEA.
 * User: rafaelpossas
 * Date: 10/28/13
 * Time: 3:12 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Helpdesk.model.Ticket', {
    extend: 'Ext.data.Model',
    requires: ['Helpdesk.model.User'],
    idProperty: 'id',
    fields: [
        {name: 'isOpen'},
        {name: 'user'},
        {name: 'startDate'},
        {name: 'endDate'},
        {name: 'description'},
        {name: 'title'}

    ]
});
