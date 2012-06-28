YUI({ skin: 'night',
  logLevel : 'error'       // Show only errors in the Console

}).use('node-menunav', 
function(Y) {
    Y.on("contentready", function () {
        this.plug(Y.Plugin.NodeMenuNav);
    }, "#menu");
  
});