/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.controller.Tickets', {
    extend: 'Ext.app.Controller',
    init: function() {
        this.control({
            'mainheader button#tickets': {
                 click: this.onMainNavClick
            }

        });
    },
    list: function(){
        
    },
    onMainNavClick: function(btn){
        Ext.Router.redirect(btn.itemId);
    }
});


