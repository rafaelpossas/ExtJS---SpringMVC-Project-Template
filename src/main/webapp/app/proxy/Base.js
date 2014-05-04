/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Helpdesk.proxy.Base', {
    extend: 'Ext.data.proxy.Rest',
    requires: ['Helpdesk.view.exception.ExceptionWindow'],
    alias: 'proxy.base',
    type: 'rest',
    noCache: false,
    limitParam: undefined,
    pageParam: undefined,
    startParam: undefined,
    autoLoad: false,
    autoSync: false,
    headers: {'Content-Type': 'application/json'},
    reader: {
        type: 'json'
    },
    writer:{
        type: 'json',
        writeAllFields: true
    },
    listeners: {
        exception: function(proxy, response, operation) {
            if (response && proxy) {
                var error = /<body.*?>([\s\S]*)<\/body>/.exec(response.responseText);
                if(error!=null){ //means its a unhandled server exception
                    Helpdesk.Current.fireEvent('servererror', error[1]);
                }else{ // means that the exception was properly handled by the server
                    var error = Ext.JSON.decode(response.responseText);
                    console.log("Error executing the operation");
                    //var errorWindow = Ext.widget('errorwindow');
                    //errorWindow.show();
                }
                
                /*
                 try {
                 var responseData = proxy.reader.getResponseData(response);
                 console.log(response);
                 console.log(responseData);
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
                 */
            }
        }
    }
});