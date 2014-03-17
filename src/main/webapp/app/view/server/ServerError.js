/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.server.ServerError',{
    extend: 'Ext.container.Container',
    layout:{
        type: 'border'
    },
    alias: 'widget.servererror',
    autoScroll: true,
    items:[
        {
            xtype:'button',
            text: 'Click here to Report the Error',
            region: 'north'
        },
        {
            xtype: 'container',
            region: 'center',
            itemId: 'errorPanel'
        }
    ]
});
