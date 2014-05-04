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
    requires: ['Helpdesk.store.Tickets', 'Helpdesk.model.TicketContainer'],
    views: [
        'ticket.Ticket', 'ticket.TicketMainPanel'
    ],
    stores: ['Tickets'],
    config: {
        allTickets: 0,
        myTickets: 0,
        openedTickets: 0,
        currentView: ''
    },
    init: function() {
        this.control({
            'ticketslist #ticketLiveSearch': {
                change: {
                    fn: this.onTicketLiveSearch,
                    buffer: 500
                }
            },
            'ticketslist ticketgrid': {
                render: this.onTicketGridRender,
                pageNext: this.onTicketGridPageNext,
                pagePrev: this.onTicketGridPagePrev
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
            selector: 'tickets > ticketmainpanel'
        },
        {
            ref: 'ticketSideMenu',
            selector: 'ticket > ticketsidemenu'
        },
        {
            ref: 'mainHeaderTicketButton',
            selector: 'mainheader button#mytickets'
        },
        {
            ref: 'allTicketsButton',
            selector: 'ticketsidemenu button#alltickets'
        },
        {
            ref: 'myTicketsButton',
            selector: 'ticketsidemenu button#mytickets'
        },
        {
            ref: 'openedTicketsButton',
            selector: 'ticketsidemenu button#openedtickets'
        },
        {
            ref: 'ticketGrid',
            selector: 'ticketgrid'
        }
    ],
    onTicketGridRender: function() {
        console.log("Ticket List Rendered");
    },
    onTicketGridPageNext: function() {
        var scope = this;
        if (this.getCurrentView() === "MyTickets") {
            this.getTicketGrid().store.findByIsOpenAndUserWithPaging(function(result) {
                scope.getTicketGrid().setCurrentSize(scope.getMyTickets());
                scope.getTicketGrid().fireEvent("pageNextLoaded");
            }, true, this.getTicketGrid().getCurrentStart(), this.getTicketGrid().getCurrentLimit());
        } else if (this.getCurrentView() === "AllTickets") {
            this.getTicketGrid().store.findAllWithPaging(function(result) {
                scope.getTicketGrid().setCurrentSize(scope.getAllTickets());
                scope.getTicketGrid().fireEvent("pageNextLoaded");
            }, this.getTicketGrid().getCurrentStart(), this.getTicketGrid().getCurrentLimit());
        } else if (this.getCurrentView() === "OpenedTickets") {
            this.getTicketGrid().store.findByIsOpenWithPaging(function(result) {
                scope.getTicketGrid().setCurrentSize(scope.getOpenedTickets());
                scope.getTicketGrid().fireEvent("pageNextLoaded");
            }, true, this.getTicketGrid().getCurrentStart(), this.getTicketGrid().getCurrentLimit());
        }


    },
    onTicketGridPagePrev: function() {
        var scope = this;
        if (this.getCurrentView() === "MyTickets") {
            this.getTicketGrid().store.findByIsOpenAndUserWithPaging(function(result) {
                scope.getTicketGrid().setCurrentSize(scope.getMyTickets());
                scope.getTicketGrid().fireEvent("pagePrevLoaded");
            }, true, this.getTicketGrid().getCurrentStart(), this.getTicketGrid().getCurrentLimit());
        } else if (this.getCurrentView() === "AllTickets") {
            this.getTicketGrid().store.findAllWithPaging(function(result) {
                scope.getTicketGrid().setCurrentSize(scope.getAllTickets());
                scope.getTicketGrid().fireEvent("pagePrevLoaded");
            }, this.getTicketGrid().getCurrentStart(), this.getTicketGrid().getCurrentLimit());
        } else if (this.getCurrentView() === "OpenedTickets") {
            this.getTicketGrid().store.findByIsOpenWithPaging(function(result) {
                scope.getTicketGrid().setCurrentSize(scope.getOpenedTickets());
                scope.getTicketGrid().fireEvent("pagePrevLoaded");
            }, true, this.getTicketGrid().getCurrentStart(), this.getTicketGrid().getCurrentLimit());
        }

    },
    onTicketLiveSearch: function(cmp, newValue, oldValue) {
        $(".ticket-grid td > span").removeClass('x-livesearch-match');
        if (newValue !== '') {
            $(".ticket-grid td > span:contains(\'" + newValue + "\')").addClass('x-livesearch-match');
        }

    },
    onAllTicketsClick: function() {
        var scope = this;

        if (this.getCardPanel().getLayout().getActiveItem() !== Helpdesk.Globals.ticketview) {
            this.list();
        }
        if (this.getAllTicketsButton().pressed === false) {
            this.getAllTicketsButton().toggle();
        }
        this.getTicketGrid().store.findAllWithPaging(function() {
            scope.getTicketGrid().store.countAll(function(result) {
                scope.getTicketGrid().setCurrentSize(scope.getAllTickets());
            });
        }, 0, this.getTicketGrid().getPageSize());
        this.setCurrentView("AllTickets");
    },
    onMyTicketsClick: function() {
        var scope = this;
        if (this.getCardPanel().getLayout().getActiveItem() !== Helpdesk.Globals.ticketview) {
            this.list();
        }
        if (this.getMyTicketsButton().pressed === false) {
            this.getMyTicketsButton().toggle();
        }
        this.getTicketGrid().store.findByIsOpenAndUserWithPaging(function() {
            scope.getTicketGrid().store.countByIsOpenAndUser(function(result) {
                scope.getTicketGrid().setCurrentSize(scope.getMyTickets());

            }, true);
        }, true, 0, this.getTicketGrid().getPageSize());
        this.setCurrentView("MyTickets");
    },
    onOpenedTicketsClick: function() {
        var scope = this;
        if (this.getCardPanel().getLayout().getActiveItem() !== Helpdesk.Globals.ticketview) {
            this.list();
        }
        if (this.getOpenedTicketsButton().pressed === false) {
            this.getOpenedTicketsButton().toggle();
        }
        this.getTicketGrid().store.findByIsOpenWithPaging(function() {
            scope.getTicketGrid().store.countByIsOpen(function(result) {
                scope.getTicketGrid().setCurrentSize(scope.getOpenedTickets());

            }, true);
        }, true, 0, this.getTicketGrid().getPageSize());
        this.setCurrentView("OpenedTickets");
    },
    list: function() {
        this.getCardPanel().getLayout().setActiveItem(Helpdesk.Globals.ticketview);
        if (this.getMainHeaderTicketButton().pressed === false) {
            this.getMainHeaderTicketButton().toggle();
        }
        if (user.isAdmin) {
            var myTickets = Ext.widget("button", {
                text: translations.MY_TICKETS,
                scale: 'large',
                itemId: 'mytickets',
                cls: 'sidemenu-button',
                toggleGroup: 'side-nav',
                pressedCls: 'sidemenu-button-pressed',
                width: 140
            });
            this.getTicketSideMenu().insert(0, myTickets);
            var allTickets = Ext.widget("button", {
                text: translations.ALL_TICKETS,
                scale: 'large',
                itemId: 'alltickets',
                cls: 'sidemenu-button',
                toggleGroup: 'side-nav',
                pressedCls: 'sidemenu-button-pressed',
                width: 140
            });
            this.getTicketSideMenu().insert(1, allTickets);
            var openedTickets = Ext.widget("button", {
                text: translations.OPENED_TICKETS,
                scale: 'large',
                itemId: 'openedtickets',
                cls: 'sidemenu-button',
                toggleGroup: 'side-nav',
                pressedCls: 'sidemenu-button-pressed',
                width: 140
            });
            this.getTicketSideMenu().insert(2, openedTickets);
            var ticketContainer = Ext.ModelManager.getModel('Helpdesk.model.TicketContainer');
            ticketContainer.load(user.id, {
                callback: function(record, op, success) {
                    this.setAllTickets(record.get('allTickets'));
                    this.setMyTickets(record.get('myTickets'));
                    this.setOpenedTickets(record.get('openedTickets'));
                    this.getAllTicketsButton().setText('(' + this.getAllTickets() + ')&nbsp' + translations.ALL_TICKETS);
                    this.getMyTicketsButton().setText(' (' + this.getMyTickets() + ')&nbsp' + translations.MY_TICKETS);
                    this.getOpenedTicketsButton().setText(' (' + this.getOpenedTickets() + ')&nbsp' + translations.OPENED_TICKETS);
                },
                scope: this
            });

        }

    }


});


