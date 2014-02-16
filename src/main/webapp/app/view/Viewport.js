/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.view.Viewport', {
  extend: 'Ext.container.Viewport',
  layout: 'card',
  alias: 'widget.mainviewport',
  items: [
      {
          xtype: 'home'
      }
  ]
});