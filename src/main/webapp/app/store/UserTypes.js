/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.store.UserTypes', {
    extend: 'Ext.data.Store',
    storeId: 'usertypes',
    autoLoad: true,
    fields: [
        {name: 'label'}
    ],
    data : [ // ENUM('G','PG','PG-13','R','NC-17')
        ['Agente'],
        ['Cliente']
    ]

});

