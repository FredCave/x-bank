$( document ).ready(function() {

	// BG ANIMATION

		// CLONE COLs IN 4-COL VIEW

		$( ".col ul" ).each( function(){
			var thisParent = $(this).parent(".col");
			$(this).clone().appendTo( thisParent );
		});

		// 1. CALCULATE POSITION OF INDIVIDUAL LIs


	function getLiPos () {
		$(".img_loop li").each( function(){		
			// get current position
			var thisTop = $(this).offset().top;
			$(this).attr("data-top", thisTop);
		});	
	}

	getLiPos();

		// 2. POSITION THEM ABSOLUTELY

	function setLiPos () {
		$(".img_loop li").each( function(){
			// set absolute position
			var thisTop = $(this).attr("data-top");
			// console.log(thisTop);
			$(this).css({
				"position": "absolute",
				"top": thisTop + "px"
			});
		});
	} 

	//setLiPos();

		// 3. MOVE UP

	function animateCols ( length ) {

		var i = 1;

		$(".img_loop li").each( function(){

			// set starting position
			var thisStart = $(this).attr("data-top");
			
			// set ending position — img height above viewport
			var thisEnd = 0 - $(this).height() * 1.2;

			$.keyframe.define([{
			    name: i,
			    from: {"top": thisStart + "px"},
			    to: {"top": thisEnd + "px"}
			}]);

			$(this).playKeyframe({
				name: i,
				duration: length + "s",
				timingFunction: "linear",
				iterationCount: "infinite",
				complete: function(){
					console.log(this, "done");
				}
			});

			i++;

		});

		/* STILL A PROBLEM WITH THIS */

	}

	// animateCols( 10 );

	// RECEIPT

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
		console.log( "diff:", diff );
		var perc;
		if ( scrollPos ) {
			perc = scrollPos / ( $(document).height() - $(window).height() );
		} else {
			perc = 0;
		}
		var shift = (perc - 0.5) * 2;
		console.log( "final shift:", 0 - shift * diff );
		$("#receipt_wrapper").css("left", (0 - shift * diff) * 0.85 );

	}




	// WINDOW EVENTS

	$(window).on("load", function(){
		receiptInit();
	}).on("resize", function(){
		receiptInit();
	}).on("scroll", function(){
		$("html").attr("data-scroll", $(window).scrollTop() );
		receiptCentre();
	});
    
});