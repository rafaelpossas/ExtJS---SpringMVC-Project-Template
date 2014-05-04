/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.usergroup.UserGroupComboBox', {
    extend: 'Ext.form.field.ComboBox',
    fieldLabel: translations.GROUP,
    name: 'userGroupName',
    displayField: 'name',
    valueField: 'name',
    queryDelay: 250,
    typeAheadDelay: 200,
    queryParam: 'name',
    minChars: 1,
    hideTrigger: true,
    emptyText: translations.SELECT_GROUP,
    //store: Ext.create('Helpdesk.store.UserGroups', {storeId: 'usersGroupFilter',remoteFilter:true}),
    alias: 'widget.usergroupcombobox',
    invalidCls: 'invalid_field_without_underline'
});

