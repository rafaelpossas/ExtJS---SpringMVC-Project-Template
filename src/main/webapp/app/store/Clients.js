/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.store.Clients', {
    extend: 'Ext.data.Store',
    requires: ['Helpdesk.model.Client'],
    model: 'Helpdesk.model.Client',
    storeId: 'clients',
    autoLoad: false,
    proxy:{
        type: 'base',
        url: 'client'
    }

});

