/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.client.ClientComboBox', {
    extend: 'Ext.form.field.ComboBox',
    fieldLabel: translations.CLIENT,
    name: 'clientName',
    displayField: 'name',
    valueField: 'name',
    minChars: 1,
    queryDelay: 250,
    typeAheadDelay: 200,
    store: Ext.create('Helpdesk.store.Clients', {storeId: 'clientFilter',remoteFilter:true}),
    queryParam: 'name',
    alias: 'widget.clientcombobox',
    emptyText: translations.SELECT_CLIENT,
    hideTrigger: true,
    invalidCls: 'invalid_field_without_underline'
});

