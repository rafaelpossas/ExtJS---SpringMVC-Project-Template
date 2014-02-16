/**
 * Created with IntelliJ IDEA.
 * User: rafaelpossas
 * Date: 2/8/14
 * Time: 5:02 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Helpdesk.controller.Users', {
    extend: 'Ext.app.Controller',

    init: function() {
        this.control({
            'viewport > panel' : {
                render: this.onRender
            }
        });
    },
    onRender : function(){
        console.log("Viewport Rendered");
    }
});