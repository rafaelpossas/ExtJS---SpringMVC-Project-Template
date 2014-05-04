/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.model.TicketContainer', {
    extend: 'Ext.data.Model',
    idProperty: 'user',
    fields: [
        {name: 'user'},
        {name: 'allTickets'},
        {name: 'myTickets'},
        {name: 'openedTickets'},
        {name: 'closedTickets'}

    ],
    proxy: {
        type: 'rest',
        url: 'ticket/overview/'
    }
});

