/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.ticket.Ticket', {
    extend: 'Ext.container.Container',
    layout: {
        type: 'border'
        //align: 'stretch'
    },
    alias: 'widget.ticket',
    requires: [
        'Helpdesk.view.Translation','Helpdesk.view.ticket.TicketSideMenu','Helpdesk.view.ticket.TicketMainPanel'
    ],
    items: [
        {
            xtype: 'ticketsidemenu',
            width: 185,
            region: 'west',
            collapsible: 'true'
        },
        {
            xtype: 'ticketmainpanel',
            width: '100%',
            region: 'center'

        }

    ]
});
