/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.ticket.TicketsList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ticketslist',
    requires: ['Helpdesk.store.Tickets', 'Helpdesk.view.ticket.TicketGrid'],
    style: 'background-color: #ffffff;',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'middle'
            },
            height: 80,
            padding: '0 10 0 10',
            items: [
                {
                    xtype: 'button',
                    text: "Abrir novo Ticket",
                    scale: 'large',
                    cls: 'add_ticket',
                    iconCls: 'add_24'
                }
            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            padding: '0 10 0 10',
            items: [
                {
                    xtype: 'textfield',
                    fieldCls: 'inner_search_icon_textfield',
                    itemId: 'ticketLiveSearch',
                    fieldLabel: translations.SEARCH,
                    anchor: '100%',
                    labelWidth: 50,
                    width: 250
                    
                }
            ]
        },
        {
            xtype: 'ticketgrid',
            itemId: 'ticketGrid'
        }
    ]

});

