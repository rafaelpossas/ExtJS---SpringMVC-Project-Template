/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Helpdesk.Globals',{
   singleton: true,
   
    email: document.getElementById("email").value,
    client: document.getElementById("client").value,
    user: document.getElementById("user").value
});