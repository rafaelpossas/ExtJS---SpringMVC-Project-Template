/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.ticket.TicketSideMenu', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ticketsidemenu',
    requires:['Helpdesk.view.ticket.TicketSideMenuItem'],
    width: 300,
    collapsible: false,
    hideCollapseTool: false,
    iconCls: 'menu_16',
    title: 'Menu'
});