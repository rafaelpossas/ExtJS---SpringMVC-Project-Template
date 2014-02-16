/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.dashboard.MainHeader', {
    extend: 'Ext.toolbar.Toolbar', // #1
    alias: 'widget.mainheader', // #2

    height: 40, // #3
    ui: 'footer', // #4
    style: 'border-bottom: 4px solid #4c72a4;', // #5

    items: [
        {
            xtype: 'label', // #6
            html: '<div id="titleHeader">Video Store Manager<span style="font-size:12px;"> - Mastering Ext JS</span></div>'
        },
        '->',
        '-',
        {
            xtype: 'button', // #9
            itemId: 'logout',
            iconCls: 'logout_24',
            scale: 'medium',
            iconAlign: 'top'
        }
    ]
});