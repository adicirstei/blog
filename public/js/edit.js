YUI({ skin: 'night',
  logLevel : 'error'       // Show only errors in the Console

}).use('editor', 
function(Y) {

    var editor = new Y.EditorBase({
        content: '<strong>This is <em>a test</em></strong> <strong>This is <em>a test</em></strong> '
    });

    editor.plug(Y.Plugin.EditorPara);
    editor.plug(Y.Plugin.EditorLists);

    //Focusing the Editor when the frame is ready..
    editor.on('frame:ready', function() {
        this.focus();

        var inst = this.getInstance();
        //inst is now an instance of YUI that is bound to the iframe.

        var body = inst.one('body');
        //body is a Node instance of the BODY element "inside" the iframe.


        var strongs = inst.all('strong');
        //strongs is a NodeList instance of all the STRONG elements "inside" the iframe.
    });

    //Rendering the Editor.
    editor.render('#editor');

});