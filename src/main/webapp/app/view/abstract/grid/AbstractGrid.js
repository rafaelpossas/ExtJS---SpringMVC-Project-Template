/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.abstract.grid.AbstractGrid', {
    extend: 'Ext.ux.LiveSearchGridPanel',
    alias: 'widget.abstractgrid',
    requires: ['Ext.ux.LiveSearchGridPanel', 'Ext.ux.grid.FiltersFeature'],
    viewConfig: {
        stripeRows: true // #3
    },
    initComponent: function() {
        var me = this;
        
        me.selModel = {
            selType: 'cellmodel' // #4
        };
        

        me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {// #5
                clicksToEdit: 1,
                pluginId: 'cellplugin'
            })
        ];

        me.features = [
            Ext.create('Ext.ux.grid.FiltersFeature', {// #6
                local: true
            })
        ];
        if(me.tbar == null){
            me.tbar = [];
        }
        me.tbar = Ext.Array.merge(me.tbar,[
                    {
                        xtype: 'button',
                        itemId: 'add',
                        text: translations.ADD,
                        iconCls: 'add_16'
                    },
                    {
                        xtype: 'tbseparator'
                    },
                    {
                        xtype: 'button',
                        itemId: 'save',
                        text: translations.SAVE,
                        iconCls: 'save_16'
                    },
                    {
                        xtype: 'button',
                        itemId: 'cancel',
                        text: translations.CANCEL,
                        iconCls: 'cancel_16'
                    },
                    {
                        xtype: 'tbseparator'
                    },
                    {
                        xtype: 'button',
                        itemId: 'clearFilter',
                        text: translations.CLEAR_FILTERS,
                        iconCls: 'filter_clear_16'
                    },
                    {
                        xtype: 'tbfill'
                    }
                ]);
        me.columns = Ext.Array.merge(me.columns, [{
                xtype: 'actioncolumn',
                width: 30,
                itemId: 'deleteColumn',
                sortable: false,
                menuDisabled: true,
                items: [
                    {
                        handler: function(view, rowIndex, colIndex, item, e) {
                            this.fireEvent('itemclick', this, 'delete', view, rowIndex, colIndex, item, e);
                        },
                        iconCls: 'delete_16',
                        tooltip: 'Delete'
                    }
                ]
            }]
                );
        me.callParent(arguments);
    }
});
