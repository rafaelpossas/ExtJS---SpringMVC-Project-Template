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
        'Helpdesk.view.Translation', 'Helpdesk.view.ticket.TicketSideMenu', 'Helpdesk.view.ticket.TicketMainPanel','Helpdesk.view.ticket.TicketsList'
    ],
    items: [
        {
            xtype: 'ticketsidemenu',
            width: 140,
            region: 'west'
        },
        {
            xtype: 'container',
            region: 'center',
            layout: 'card',
            itemId: 'ticketcardpanel',
            items: [
                {
                    xtype: 'ticketslist'
                }
            ]
        }
    ]
});
