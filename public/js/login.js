YUI({ skin: 'night',
  logLevel : 'error'       // Show only errors in the Console

}).use('panel', 
function(Y) {
  var panel = new Y.Panel({
        srcNode : '#loginpanel',
        width   : 400,
        centered: true,
        render  : true
    });
  
});