/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.util.Util', {
    constructor: function(config) {
        this.initConfig(config);
    },
    statics: {
        required: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
        showErrorMsg: function(text) {

            Ext.Msg.show({
                title: 'Error!',
                msg: text,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        },
        createVTypes: function() {
            // Unique Username VTYPE
            Ext.apply(Ext.form.VTypes, {
                uniqueUserName: function(value, field) {
                    var validfield = false;
                    Ext.Ajax.request({
                        async: false,
                        url: 'user/checkusername',
                        method: 'POST',
                        params: {
                            'username': value
                        },
                        success: function(responseObject) {
                            var resp = responseObject.responseText;
                            if (resp === "true") {
                                validfield = true;
                            } else {
                                validfield = false;
                            }
                        }
                    });
                    return validfield;
                },
                uniqueUserNameText: translations.USERNAME_IN_USE
            });
        },
        copy: function(extjsmodel) {
            var responseObject = {};
            for (var prop in extjsmodel.data) {
                responseObject[prop] = extjsmodel.data[prop];
            }
            return responseObject;
        },
        sortAsc: function(array, prop) {
            array.sort(function(a, b) {
                var propA = a[prop];
                var propB = b[prop];
                if (propA < propB) //sort string ascending
                    return -1;
                if (propA > propB)
                    return 1;
                return 0; //default return value (no sorting)
            });
            return array;
        },
        sortDesc: function(array, prop) {
            array.sort(function(a, b) {
                var propA = a[prop];
                var propB = b[prop];
                if (propA > propB) //sort string descending
                    return -1;
                if (propA < propB)
                    return 1;
                return 0; //default return value (no sorting)
            });
            return array;
        }

    }
});