/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.controller.Dashboard',{
   extend: 'Ext.app.Controller',
   views: ['dashboard.Dashboard'],
   init: function(){
       this.control({
           'mainviewport':{
               aftershow: this.onViewportRendered
           }
       });
   },
   onViewportRendered: function(){
        var currentURL = window.location.href.toString();
        var indexOf = currentURL.indexOf('login');
        if(indexOf > 0){
            Helpdesk.Current.viewport.getLayout().setActiveItem(0);
        }
   }
});


