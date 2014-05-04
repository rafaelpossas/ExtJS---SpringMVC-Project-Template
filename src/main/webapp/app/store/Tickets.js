/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.store.Tickets', {
    extend: 'Ext.data.Store',
    model: 'Helpdesk.model.Ticket',
    autoLoad: false,
    proxy:{
        type: 'base',
        url: 'ticket'
    },
    findByIsOpen: function(callbackFunction, isOpen) {
        this.load({
            url: 'ticket/isopen/' + isOpen,
            callback: callbackFunction
        });
    },
    findByIsOpenWithPaging: function(callbackFunction, isOpen,start,limit) {
        this.load({
            url: 'ticket/isopen/' + isOpen,
            callback: callbackFunction,
            params:{
                start: start,
                limit: limit
            }
        });
    },
    findByIsOpenAndUser: function(callbackFunction) {
        this.load({
            url: 'ticket/isopen/' + user.id,
            callback: callbackFunction
        });
    },
    findByIsOpenAndUserWithPaging: function(callbackFunction,isOpen, start, limit) {
        this.load({
            url: 'ticket/isopen/true/' + user.id,
            callback: callbackFunction,
            params: {
                start: start,
                limit: limit
            }
        });
    },
    findAllWithPaging: function(callbackFunction, start, limit) {
        this.load({
            url: 'ticket',
            callback: callbackFunction,
            params: {
                start: start,
                limit: limit
            }
        });
    },
    countByIsOpenAndUser: function(callbackFunction,isOpen) {
        $.ajax({type: "get", url: "ticket/isopen/"+isOpen+"/" + user.id + "/count", success: callbackFunction});
    },
    countByIsOpen: function(callbackFunction,isOpen){
        $.ajax({type: "get", url: "ticket/isopen/"+isOpen+"/count ", success: callbackFunction});
    },
    countAll: function(callbackFunction) {
        $.ajax({type: "get", url: "ticket/count/ ", success: callbackFunction});
    }
});

