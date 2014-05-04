/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.store.Categories', {
    extend: 'Ext.data.Store',
    requires: ['Helpdesk.model.Category'],
    model: 'Helpdesk.model.Category',
    storeId: 'categories',
    autoLoad: false,
    sorters: [{
         property: 'name',
         direction: 'ASC'
     }],
    proxy:{
        type: 'base',
        url: 'category'
    }

});

