/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.util.Dialogs',{
   statics:{
       deleteDialog: function(callback){
                   Ext.Msg.show({
            title: translations.DELETE+'?',
            msg: translations.DELETE_CONFIRMATION,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: callback
        });
       },
       confirmationDialog: function(callback){
           Ext.Msg.show({
               title: translations.CONFIRMATION+"?",
               msg: translations.CANCEL_CONFIRMATION,
               buttons: Ext.Msg.YESNO,
               icon: Ext.Msg.Question,
               fn: callback
           });
       }
   } 
});

