/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.dashboard.Dashboard',{
    extend: 'Ext.container.Container',
    layout: 'border',
    alias: 'widget.dashboard',
    requires: [
      'Helpdesk.view.dashboard.MainHeader','Helpdesk.view.Translation'  
    ],
    items: [
        {
            xtype: 'panel',
            region: 'center',
            layout: 'fit',
            items:[
                {
                    html:"<center><div> Here is the Center</div></center>"  
                }

            ]

        },
        {
            xtype: 'mainheader',
            region: 'north'
        }
    ]
});