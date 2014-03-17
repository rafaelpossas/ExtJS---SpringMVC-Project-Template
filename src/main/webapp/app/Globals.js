/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Helpdesk.Globals',{
   singleton: true,
    
    email: document.getElementById("email").value,
    client: document.getElementById("client").value,
    user: document.getElementById("user").value,
    
    //Views
    errorview:0,
    homeview: 1,
    ticketview:2,
    settingsview:3,
    
    settings_profile_view: 0,
    settings_users_view: 1
    
});