/* 
 * @Author rafaelpossas
 * 
 * This controller is responsible for controlling the menu clicks and window
 * changes of all the ticket views. The view is created by selecting the tab button
 * on the main header of the application. The window that is opened has all its items
 * controlled by this class and therefore will dispatch events that will also be 
 * listened by this class.
 * 
 * Views:
 *    view/ticket/MainPanel.js
 *    view/ticket/Ticket.js
 *    view/ticket/TicketSideMenu.js
 *    view/ticket/TicketSideMenuItem.js
 */
Ext.define('Helpdesk.controller.Ticket', {
    extend: 'Ext.app.Controller',
    views: [
        'ticket.Ticket', 'ticket.TicketMainPanel'
    ],
    stores : ['Menu'],
    init: function() {
        this.control({
            'ticket': {
                beforeactivate : this.onPanelRender
            },
            'ticketsidemenuitem': {
                select: this.onTreepanelSelect,
                itemclick: this.onTreepanelItemClick
            }
        });
    },
    refs: [
        {
            ref: 'cardPanel',
            selector: 'viewport > container#maincardpanel'
        },
        {
            ref: 'mainPanel',
            selector: 'ticket > ticketmainpanel'
        }
    ],
    list: function() {
        this.getCardPanel().getLayout().setActiveItem(Helpdesk.Globals.ticketview);
    },
    onTreepanelSelect: function(selModel, record, index, options) {
        var mainPanel = this.getMainPanel();

        var newTab = mainPanel.items.findBy(// Checking if the tab already exists
                function(tab) {
                    return tab.title === record.get('text');
                });

        if (!newTab) { // The tab doesn' exist hence we need to create a new one
            newTab = mainPanel.add({
                xtype: record.raw.className,
                closable: true, // #7
                iconCls: record.get('iconCls'),
                title: record.get('text')
            });
        }
        mainPanel.setActiveTab(newTab); // Adding the panel to the tabpanel
    },
    /*
     * In case the user closes the tab panel, and the menu is selected he won't
     * need to select another menu and come back to previous menu to open again,
     * the click render will also open the new tab.
     */
    onTreepanelItemClick: function(view, record, item, index, event, options) {
        this.onTreepanelSelect(view, record, index, options);
    },
    /*
     * Whenever the side menu is rendered, this function will look for the menu
     * items that will be appended to the component.
     * 
     */
    onPanelRender: function(abstractcomponent, options) {
        this.getMenuStore().loadMenu(function(records, op, success) {
            var menuPanel = Ext.ComponentQuery.query('ticketsidemenu')[0];
            menuPanel.removeAll(); // Removing the older menu because we are creating a fresh one
            Ext.each(records, function(root) {
                var menu = Ext.create('Helpdesk.view.ticket.TicketSideMenuItem'); // Creating the root of the tree
                Ext.each(root.items(), function(itens) { // Adding items accordingly to the item search

                    Ext.each(itens.data.items, function(item) {

                        menu.getRootNode().appendChild({// The icons and the text are extracted from the entity
                            text: translations[item.get('text')],
                            leaf: true,
                            iconCls: item.get('iconCls'),
                            id: item.get('id'),
                            className: item.get('className')
                        });
                    });
                });
                menuPanel.add(menu); // Adding the entire menu to his panel
            });
        });

    }
});


