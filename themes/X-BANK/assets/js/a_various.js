/*****************************************************************************
    
	1. VARIOUS
		1.1. CUSTOM CHROME JAGGED EDGE FIX
		1.2. INIT SMOOTHSCROLL
		1.3. STARS FOR H1
		1.4. SCROLLER FUNCTION

*****************************************************************************/

$( document ).ready(function() {

// 1.1. CUSTOM CHROME JAGGED EDGE FIX

	if ( window.chrome ) {	
		$("section").css({
			"-webkit-backface-visibility" : "hidden",
					"backface-visibility" : "hidden"
		});
	}

// 1.2. INIT SMOOTHSCROLL

<<<<<<< HEAD
	$('a').smoothScroll({
		offset: -60
	});
=======
	$('a').smoothScroll();
>>>>>>> 3564134f44d211b0ea349ddc87cc1c90ab000e7d


// 1.3. H1 STARS

	var text;
	$("h1").each( function(){
		if ( $(this).find("a").length ) {
			text = $(this).find("a").text().replace(/\s/g, "*");
			$(this).find("a").text(text);
		} else {
			text = $(this).text().replace(/\s/g, "*");
			$(this).text(text);
		}		
	});
<<<<<<< HEAD
 
=======

// 1.4. SCROLL TO 

	function scroller ( thisClick ) {
		var target = thisClick.parents("section").find(".scroll_target");
		$("html,body").animate({
			scrollTop: target.offset().top - 80
		}, 500);
	}
>>>>>>> 3564134f44d211b0ea349ddc87cc1c90ab000e7d

});