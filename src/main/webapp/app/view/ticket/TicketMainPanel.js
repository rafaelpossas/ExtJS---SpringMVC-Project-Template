/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.ticket.TicketMainPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.ticketmainpanel',
    activeTab: 0,
    items: [
        {
            xtype: 'panel',
            closable: false,
            iconCls: 'home_16',
            title: 'Home'
        }
    ]
});