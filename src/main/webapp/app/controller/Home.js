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
    init: function() {
        this.control({
            'mainviewport': {
                aftershow: this.onViewportRendered
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
            ref: 'cardPanel',
            selector: 'viewport > container#maincardpanel'
        },
        {
            ref: 'serverError',
            selector: 'servererror > #errorPanel'
        }
    ],
    onError: function(error){
        this.getServerError().update(error);
        this.getCardPanel().getLayout().setActiveItem(Helpdesk.Globals.errorview);
    },
    index: function() {
        this.getCardPanel().getLayout().setActiveItem(Helpdesk.Globals.homeview);
    },
    /*
     * This function controls the history router declared in app.js.
     * The funcion of this router is to check which button was clicked
     * and then redirect to the page according to the button id. The mappings
     * can be found in app.js.
     */
    onMainNavClick: function(btn) {
        if(btn.itemId !== 'logout' && btn.itemId !== 'myProfile'){
            Ext.Router.redirect(btn.itemId === 'home' ? '' : btn.itemId); 
        }

    },
    onSettingsMenuClick: function(btn){
        Ext.Router.redirect(btn.itemId);
    },
    onViewportRendered: function() {

    }
});


