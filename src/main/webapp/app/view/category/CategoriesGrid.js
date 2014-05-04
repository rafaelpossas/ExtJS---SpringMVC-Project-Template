/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.category.CategoriesGrid', {
    extend: 'Helpdesk.view.abstract.grid.AbstractGrid',
    alias: 'widget.categoriesgrid',
    store: 'Categories',
    columns: [
        {
            text: translations.NAME,
            flex: 1,
            dataIndex: 'name',
            editor: {
                allowBlank: false,
                maxLength: 45
            },
            filter: {
                type: 'string'
            }
        }
    ]

});

