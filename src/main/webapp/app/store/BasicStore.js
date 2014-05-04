/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.store.BasicStore', {
    extend: 'Ext.data.Store',
    autoload: false,
    entityName: 'Entidade',
    constructor: function(config) {
        // applyIf means only copy if it doesn't exist
        Ext.applyIf(config, {
            proxy: this.createProxy()
        });
        this.callParent([config]);
    },
    createProxy: function() {
        var storeScope = this;
        return {
            type: 'rest',
            noCache: true,
            limitParam: undefined,
            pageParam: undefined,
            startParam: undefined,
            reader: {
                type: 'json'
            },
            listeners: {
                scope: storeScope,
                exception: function(proxy, response, options) {
                    this.exceptionHandling(proxy, response);
                }
            }
        };
    },
    exceptionHandling: function(proxy, response) {
        if (response && proxy) {
            try {
                var responseData = proxy.reader.getResponseData(response);
                if (responseData.message) {
                    var messageDescription = 'Information'; // title of the alert box
                    var messageIcon = Ext.MessageBox.INFO;

                    if (!responseData.success)
                    {
                        var messageDescription = 'Error';
                        var messageIcon = Ext.MessageBox.ERROR;
                    }

                    Ext.MessageBox.show({
                        title: messageDescription,
                        msg: responseData.message,
                        buttons: Ext.MessageBox.OK,
                        icon: messageIcon
                    });
                }
            }
            catch (err) {
                // Malformed response most likely
                console.log(err);
            }
        }

    },
    onCreateRecords: function(records, operation, success) {
        if (success) {
            Ext.Msg.show({
                title: translations.INFORMATION,
                msg: this.entityName + ' ' + translations.SAVED_WITH_SUCCESS,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });
        }
    },
    onUpdateRecords: function(records, operation, success) {
        if (success) {
            Ext.Msg.alert(translations.INFORMATION, this.entityName + ' ' + translations.UPDATED_WITH_SUCCESS);
        }
    },
    onDestroyRecords: function(records, operation, success) {
        if (success) {
            Ext.Msg.alert(translations.INFORMATION, this.entityName + ' ' + translations.DELETED_WITH_SUCCESS);
            this.callParent(arguments);
        }
    },
    customRequest: function(operation, requesturl, oldurl, callback, scope) {
        this.getProxy().url = requesturl;
        this.getProxy().doRequest(operation, callback, scope);
        this.getProxy().url = oldurl;

    }

});

