$( document ).ready(function() {

	/*

	1. VARIOUS 

	2. BACKGROUND

	3. RECEIPT

	4. WINDOW EVENTS

	*/


/*****************************************************************************
    
	1. VARIOUS

*****************************************************************************/

	// CUSTOM CHROME JAGGED EDGE FIX

	if ( window.chrome ) {
		$("section").css("backface-visibility", "hidden");
	}

	// INIT SMOOTHSCROLL

	$('a').smoothScroll();

/*****************************************************************************
    
	2. BACKGROUND

*****************************************************************************/

	function imagesCalc () {

		var winH = $(window).height();
		var loopHs = [];

		// clone first UL for slide_up
		$(".slide_up").each( function(index){
			$(this).find(".img_loop:last-child").html( $(this).find(".img_loop:first-child").html() );
			// get height of ULs 1 + 2 (in px)
			var loopH = $(this).find(".img_loop:first-child").height() + $(this).find(".img_loop:nth-child(2)").height();
			// compare to winH to get vh
			var loopVH = "-" + (loopH / winH) * 100 + "vh";
			// console.log(loopH, winH, loopVH);
			loopHs.push( loopVH );
		});

		console.log(loopHs);

		// clone last UL for slide_down
		$(".slide_down").each( function(index){
			$(this).find(".img_loop:first-child").html( $(this).find(".img_loop:last-child").html() );
			// get height of ULs 3 + 2 (in px)
			var loopH = $(this).find(".img_loop:last-child").height() + $(this).find(".img_loop:nth-child(2)").height();
			// compare to winH to get vh
			var loopVH = "-" + (loopH / winH) * 100 + "vh";
			// console.log(loopH, winH, loopVH);
			loopHs.push( loopVH );
		});
			
		// define animations
		$.keyframe.define({
		    name: 'slideshow_up_1',
		    from: {
		        'transform': 'translateY(0vh)'
		    },
		    to: {
		        'transform': 'translateY(' + loopHs[0] + ')' 
		    }
		});

		$.keyframe.define({
		    name: 'slideshow_down_1',
		    from: {
		        'transform': 'translateY(' + loopHs[2] + ')' 
		    },
		    to: {
		        'transform': 'translateY(0vh)'
		    }
		});	

		$.keyframe.define({
		    name: 'slideshow_up_2',
		    from: {
		        'transform': 'translateY(0vh)'
		    },
		    to: {
		        'transform': 'translateY(' + loopHs[1] + ')' 
		    }
		});

		$.keyframe.define({
		    name: 'slideshow_down_2',
		    from: {
		        'transform': 'translateY(' + loopHs[3] + ')' 
		    },
		    to: {
		        'transform': 'translateY(0vh)'
		    }
		});	

	}

/*****************************************************************************
    
	3. RECEIPT

*****************************************************************************/

	// 3.1 RECEIPT POSITIONING

	// function receiptInit () {
	// 	var rOffsetL = $("#receipt").offset().left;
	// 	$("#receipt").attr( "data-left", rOffsetL );

	// 	receiptCentre();	

	// 	/* THIS NEEDS FIXING ON RESIZE */	
	// }

	// function receiptCentre ( scrollPos ) {
	// 	var scrollPos = $("html").attr("data-scroll");
	// 	var initL = parseFloat( $("#receipt").attr( "data-left" ) );
	// 	var calcL = ( $(window).width() - $("#receipt").width() ) / 2;
	// 	var diff = calcL - initL;
	// 	//console.log( "diff:", diff );
	// 	var perc;
	// 	if ( scrollPos ) {
	// 		perc = scrollPos / ( $(document).height() - $(window).height() );
	// 	} else {
	// 		perc = 0;
	// 	}
	// 	var shift = (perc - 0.5) * 2;
	// 	// console.log( "final shift:", 0 - shift * diff );
	// 	$("#receipt_wrapper").css("left", (0 - shift * diff) * 0.85 );

	// }

	// 3.2. VITRINE TOGGLE

	$("a.click").on("click", function(e){
		e.preventDefault();

		// calculate height of vitrine
		var winH = $(window).height();

		var target = $(this).parents("section").next(".r_hole");
		if ( !target.hasClass("clicked") ) {
			target.animate({
				"height" : winH * 0.7
			}, 1000).addClass("clicked");

			// scroll up
			var scrollTarget = $(this).offset().top - 60;
			$("html,body").animate({
				scrollTop: scrollTarget
			}, 500);

		} else {
			target.animate({
				"height" : 0
			}, 1000).removeClass("clicked");			
		}

	});

	// 3.3. BACK TO TOP BUTTON

	$(".back_to_top a").on("click", function(e){
		e.preventDefault();
		// get offset of menu
		var menuOffset = $("#r_menu").offset().top;
		// scroll
		$("html,body").animate({
			scrollTop: menuOffset
		}, 500);
	});

	// 3.4. INDEX CLICK

	// EXPAND THIS TO CATEGORIES

	$(".index_menu a").on("click", function(e){
		e.preventDefault();

		// empty results wrapper
		var resultWrapper = $("#index_results");
		resultWrapper.empty();
	
		if ( $(this).parents("#index_categories").length ) {
			
			var thisCat = $(this).text().toLowerCase();

			// loop through LIs
			$("#sub_index li").each( function(){
				
				if ( $(this).hasClass(thisCat) ) {
					// append any results to result wrapper
					$(this).clone().appendTo(resultWrapper);
				}

			});

		} else {

			// get clicked letter
			var thisLetter = $(this).text();

			// loop through LIs
			$("#sub_index li").each( function(){
				var initial = $(this).data("initial");
				if ( initial === thisLetter ) {
					// append any results to result wrapper
					$(this).clone().appendTo(resultWrapper);
				}
			});

		}

		// underline clicked letter or cat
		$(".index_menu a").css("border-bottom","");
		$(this).css("border-bottom","1px solid black");

		console.log( resultWrapper.height() );

		// animate wrapper height
		$("#sub_index").css("height", resultWrapper.height() );

	});

	// INDEX ARTIST CLICK

	$(".index_artist span a").on("click", function(e){
		e.preventDefault();


		var target = $(this).parents("span").next(".index_artist_content");
		if ( !target.hasClass("clicked") ) {
			
			$(".index_artist_content").css("height","0").hide();

			target.show().css({
				"height" : "auto"
			}, 1000).addClass("clicked");

		} else {
			target.animate({
				"height" : 0
			}, 1000).removeClass("clicked");			
		}

		$("#sub_index").css("height","auto");

	});

/*****************************************************************************
    
	4. WINDOW EVENTS

*****************************************************************************/

	$(window).on("load", function(){
		// receiptInit();
		imagesCalc();
	}).on("resize", function(){
		// receiptInit();
		imagesCalc();
	}).on("scroll", function(){
		$("html").attr("data-scroll", $(window).scrollTop() );
		// receiptCentre();
	});
    
});