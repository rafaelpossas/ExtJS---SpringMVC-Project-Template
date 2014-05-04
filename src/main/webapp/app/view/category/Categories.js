/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.category.Categories',{
   extend: 'Ext.panel.Panel',
   alias: 'widget.categories',
   requires: ['Helpdesk.view.category.CategoriesGrid'],
       layout: {
        type: 'fit'
    },
    items: [
        {
            xtype: 'categoriesgrid'
        }
    ]
});

