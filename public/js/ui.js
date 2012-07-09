$(document).ready(function() {

		$( ".menu-item" ).mouseenter(function(ev){
            $(this).addClass('ui-state-hover')
        });
        $( ".menu-item" ).mouseleave(function(ev){
            $(this).removeClass('ui-state-hover')
        });

//    $('#menu ul').menu({orientation: "horizontal"});

        
});