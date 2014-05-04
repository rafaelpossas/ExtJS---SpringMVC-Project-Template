/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Helpdesk.controller.Category', {
    extend: 'Ext.app.Controller',
    stores: ['Categories'],
    init: function() {
        this.control({
            "categoriesgrid actioncolumn#deleteColumn": {
                itemclick: this.onDelete
            },
            "categoriesgrid": {
                edit: this.onEdit
            },
            "categoriesgrid button#add": {
                click: this.onButtonClickAdd
            },
            "categoriesgrid button#save": {
                click: this.onButtonClickSave
            },
            "categoriesgrid button#cancel": {
                click: this.onButtonClickCancel
            },
            "categoriesgrid button#clearFilter": {
                click: this.onButtonClickClearFilter
            }

        });
    },
    refs: [
        {
            ref: 'cardPanel',
            selector: 'viewport > container#maincardpanel'
        },
        {
            ref: 'settingsCardPanel',
            selector: 'settings > #settingscardpanel'
        },
        {
            ref: 'categoriesList',
            selector: 'categories > categoriesgrid'
        },
        {
            ref: 'categoryButton',
            selector: 'settingssidemenu button#category'
        }
    ],
    onButtonClickClearFilter: function(button, e, options) {
        this.getCategoriesList().filters.clearFilters();
    },
    onButtonClickCancel: function(button, e, options) {
        var store = this.getCategoriesList().getStore();
        Helpdesk.util.Dialogs.confirmationDialog(function(buttonId) {
            if (buttonId == "yes") {
                store.reload();
            }
        });
    },
    onButtonClickSave: function(button, e, options) {
        var grid = this.getCategoriesList();
        grid.getStore().sync({
            success: function(result) {
                Ext.Msg.alert(translations.INFORMATION, "Alterações salvas com sucesso");
                var statusBar = grid.down("statusbar[name=searchStatusBar]");
                statusBar.setStatus({
                    text: translations.STATUS_BAR,
                    iconCls: ''
                });
            }
        });
    },
    onDelete: function(column, action, view, rowIndex, colIndex, item, e) {
        var record = this.getCategoriesList().getStore().getAt(rowIndex);
        if (action == 'delete') {
            this.getCategoriesList().getStore().remove(record);
            var statusBar = this.getCategoriesList().down("statusbar[name=searchStatusBar]");
            statusBar.setStatus({
                text: translations.SAVE_CHANGES_TO_PERSIST,
                iconCls: 'x-status-error'
            });
        }
    },
    onEdit: function(editor, context, options) {
        // Implement anything related to edit event dispatched by the cell editing plugin
    },
    onButtonClickAdd: function() {
        cellEditing = this.getCategoriesList().getPlugin('cellplugin');
        this.getCategoriesList().getStore().insert(0, Ext.create('Helpdesk.model.Category', {
            name: translations.NEW_CATEGORY
        }));
        cellEditing.startEditByPosition({row: 0, column: 0});
    },
    list: function() {
        var mainCardPanelIndex = this.getCardPanel().items.indexOf(this.getCardPanel().getLayout().getActiveItem());
        if (mainCardPanelIndex !== Helpdesk.Globals.settingsview) {
            this.getCardPanel().getLayout().setActiveItem(Helpdesk.Globals.settingsview);
        }
        this.getSettingsCardPanel().getLayout().setActiveItem(Helpdesk.Globals.settings_category_view);
        this.getCategoriesList().getStore().load();
        if (this.getCategoryButton().pressed === false) {
            this.getCategoryButton().toggle();
        }

    }
});

