/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.store.Users', {
    extend: 'Ext.data.Store',
    requires: ['Helpdesk.model.Category'],
    model: 'Helpdesk.model.User',
    storeId: 'categories',
    autoLoad: false,
    remoteSort: false,
    listeners: {
        load: function(me, opts) {
            this.sort('name', 'ASC');
        }
    },
    proxy:{
        type: 'base',
        url: 'user'
    },
    entityName: translations.USER,
    findByUserName: function(callbackFunction, username) {
        this.load({
            url: 'user/' + username,
            callback: callbackFunction
        });
    },
    findAll: function(callbackFunction) {
        this.load(callbackFunction);
    },
    saveProfile: function(profile, callback) {
        var data = JSON.stringify(profile);
        $(".html_success_message").remove();
        $.ajax({type: "put", url: "user/profile", data: data, success: callback});
    },
    savePassword: function(profile, callback) {
        var data = JSON.stringify(profile);
        $(".html_success_message").remove();
        $.ajax({type: "put", url: "user/password", data: data, success: callback});
    }

});

