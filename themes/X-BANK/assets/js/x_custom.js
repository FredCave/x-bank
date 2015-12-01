$( document ).ready(function() {

	// INIT SMOOTHSCROLL

	$('a').smoothScroll();

	// BG ANIMATION

		// TMP

	$(".movable_wrapper").clone().appendTo("#col_1");
	$(".movable_wrapper").clone().appendTo("#col_1");

	// RECEIPT

		// ASTERISK BREAKS STRETCH

	function breakStretch () {
		
		var x_break = $("#r_logo .break");
		// get available width
		var breakW = x_break.width();
		// get text width
		var innerW = x_break.find(".break_inner").width();
		// get current letter-spacing
    	var letterS = parseFloat( x_break.css("letter-spacing") );
    	// number of chars
    	var noChars = x_break.text().trim().length;
    	// size of just text
    	var justText = innerW - ( (noChars-1) * letterS );
    	var newSpacing = ( breakW - justText ) / noChars;
    	$(".break").css("letter-spacing", newSpacing + "px");
	    /*

		what happens if too long??

	    */
	}

		// CENTRE RECEIPT

	function receiptInit () {
		var rOffsetL = $("#receipt").offset().left;
		$("#receipt").attr( "data-left", rOffsetL );

		receiptCentre();	

		/* THIS NEEDS FIXING ON RESIZE */	
	}

	function receiptCentre ( scrollPos ) {
		var scrollPos = $("html").attr("data-scroll");
		var initL = parseFloat( $("#receipt").attr( "data-left" ) );
		var calcL = ( $(window).width() - $("#receipt").width() ) / 2;
		var diff = calcL - initL;
		//console.log( "diff:", diff );
		var perc;
		if ( scrollPos ) {
			perc = scrollPos / ( $(document).height() - $(window).height() );
		} else {
			perc = 0;
		}
		var shift = (perc - 0.5) * 2;
		// console.log( "final shift:", 0 - shift * diff );
		$("#receipt_wrapper").css("left", (0 - shift * diff) * 0.85 );

	}

	// VITRINE TOGGLE

	$("a.click").on("click", function(e){
		e.preventDefault();

		var target = $(this).parents("section").next(".r_hole");
		if ( !target.hasClass("clicked") ) {
			target.animate({
				"height" : 400
			}, 1000).addClass("clicked");
		} else {
			target.animate({
				"height" : 0
			}, 1000).removeClass("clicked");			
		}

	});

	// BACK TO TOP BUTTON

	$(".back_to_top a").on("click", function(e){
		e.preventDefault();
		// get offset of menu
		var menuOffset = $("#r_menu").offset().top;
		// scroll
		$("html,body").animate({
			scrollTop: menuOffset
		}, 500);
	});

	// INDEX CLICK

	$(".index_letter a").on("click", function(e){
		e.preventDefault();
		// get clicked letter
		var thisLetter = $(this).text();
		$("#sub_index li").hide();
		$("#" + thisLetter).show();

		// underline clicked letter
		$(".index_letter a").css("border-bottom","");
		$(this).css("border-bottom","1px solid black");


		// animate wrapper height
		$("#sub_index").css("height", $("#" + thisLetter).height() );
	});

	/* TO DO :

		ANIMATE HEIGHT
		NOT FOUND MESSAGE IF EMPTY

	*/


	// WINDOW EVENTS

	$(window).on("load", function(){
		// receiptInit();
		breakStretch();
	}).on("resize", function(){
		// receiptInit();
	}).on("scroll", function(){
		$("html").attr("data-scroll", $(window).scrollTop() );
		// receiptCentre();
	});
    
});