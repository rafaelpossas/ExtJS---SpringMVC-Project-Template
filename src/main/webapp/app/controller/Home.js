/* 
 * @Author rafaelpossas
 * 
 * Controller responsible for taking care of the main header. Listeners are attached
 * to the tab bar buttons and are responsible for changing the views of the card layout
 * in the viewport.
 * 
 * Views:
 *    view/home/Home.js
 *    view/home/MainHeader.js
 */
Ext.define('Helpdesk.controller.Home', {
    extend: 'Ext.app.Controller',
    views: ['home.Home'],
    stores: ['Users'],
    init: function() {
        this.control({
            'mainviewport': {
                render: this.onViewportRendered
            },
            /*
             * Will listen for all button in the main header,
             * and whenever they are clicked will redirect the
             * page accordingly.
             */
            'mainheader button': {
                click: this.onMainNavClick
            },
            'settingssidemenu button': {
                click: this.onSettingsMenuClick
            },
            'profilesidemenu button': {
                click: this.onProfileMenuClick
            },
            'ticketsidemenu button':{
                click: this.onTicketSideMenuClick
            }
        });
        this.application.on({
            servererror: this.onError,
            scope: this
        });
    },
    /*
     * Creates a reference for the Panel with card layout,
     * this way we can change the views when the user clicks
     * on the main header buttons.
     *
     */
    refs: [
        {
            ref: 'mainheaderEmail',
            selector: 'mainheader button#userEmail'
        },
        {
            ref: 'cardPanel',
            selector: 'viewport > container#maincardpanel'
        },
        {
            ref: 'serverError',
            selector: 'servererror > #errorPanel'
        },
        {
            ref: 'mainHeaderHomeButton',
            selector: 'mainheader button#home'
        }
    ],
    onError: function(error) {
        this.getServerError().update(error);
        this.getCardPanel().getLayout().setActiveItem(Helpdesk.Globals.errorview);
    },
    index: function() {
        this.getCardPanel().getLayout().setActiveItem(Helpdesk.Globals.homeview);
        if (this.getMainHeaderHomeButton().pressed === false) {
            this.getMainHeaderHomeButton().toggle();
        }
    },
    /*
     * This function controls the history router declared in app.js.
     * The funcion of this router is to check which button was clicked
     * and then redirect to the page according to the button id. The mappings
     * can be found in app.js.
     */
    onMainNavClick: function(btn) {
        if (btn.itemId !== 'logout') {
            Ext.Router.redirect(btn.itemId === 'home' ? '' : btn.itemId);
        }

    },
    onSettingsMenuClick: function(btn) {
        Ext.Router.redirect(btn.itemId);
    },
    onProfileMenuClick: function(btn) {
        Ext.Router.redirect(btn.itemId);
    },
    onTicketSideMenuClick: function(btn){
        Ext.Router.redirect(btn.itemId);
    },
    onViewportRendered: function() {
    }
});


