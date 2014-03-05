/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.controller.Home', {
    extend: 'Ext.app.Controller',
    views: ['home.Home'],
    init: function() {
        this.control({
            'mainviewport': {
                aftershow: this.onViewportRendered
            },
            'mainheader button#home': {
                click: this.onMainNavClick
            }
        });
    },
    index: function() {
    },
    onMainNavClick: function(btn) {
        Ext.Router.redirect(btn.itemId === 'home' ? '' : btn.itemId);
    },
    onViewportRendered: function() {
        var currentURL = window.location.href.toString();
        var indexOf = currentURL.indexOf('login');
        if (indexOf > 0) {
            Helpdesk.Current.viewport.getLayout().setActiveItem(0);
        }
    }
});


