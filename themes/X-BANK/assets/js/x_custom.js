$( document ).ready(function() {

	/*

	1. VARIOUS 

	2. BACKGROUND

	3. RECEIPT
		3.1. RECEIPT POSITION
		3.2. VITRINE TOGGLE
		3.3. BACK TO TOP BUTTON
		3.4. INDEX CLICK

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

	function imagesFadeIn () {
		// check images have loaded
		$(".wrapper").animate({
			"opacity": "1"
		}, 2000);
	}

	function imagesHtmlPrep( noCols ) {
		// CREATE COLUMNS
		var direction;
		var ulHTML = "";
		for ( i=0; i<noCols; i++ ) {
			if ( i % 2 === 0 ) {
				direction = "slide_up";
			} else {
				direction = "slide_down";
			}
			ulHTML += "<div class='movable_wrapper " + direction + "'>";
			ulHTML += "<ul class='img_loop'></ul>";
			ulHTML += "</div>";
		}
		// console.log(ulHTML);
		$("#wrapper_1").html( ulHTML ).attr("data-col", noCols );
	}

	function imagesInject ( imgPerCol ) {
		// get number of spaces to be filled
		var spaces = $("#wrapper_1").attr("data-col") * imgPerCol;
		var img = 0;
		var col = 0;
		for ( i=1; i < spaces; i++ ) {
			img++;
			if ( img === imgPerCol ) {
				img = 0;
				col++;
				// new target where imgs will be injected
			}
			console.log(img, col);
		}

		// var i = 0; // image index
		// var j = 0; // li index
		// var target;
		// $("#load_wrapper li").each( function(){		
		// 	target = $("#wrapper_1").find("div.movable_wrapper").eq(j).find(".img_loop");
		// 	console.log(imgPerCol, i, j);
		// 	$(this).appendTo( target );
		// 	if ( i === imgPerCol ) {	
		// 		// reset index
		// 		i = 0;
		// 		j++;
		// 	} else {
		// 		i++;
		// 	}
		// });
		// repeat images 



	}

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

	// CLICK ON LETTER OR CATEGORY

	$(".index_menu a").on("click", function(e){
		e.preventDefault();
		// empty results wrapper
		var resultWrapper = $("#index .index_results");
		resultWrapper.empty();
		if ( $(this).parents("#index_categories").length ) {
			var thisCat = $(this).text().toLowerCase();
			// loop through LIs
			$(".sub_index li").each( function(){
				if ( $(this).hasClass(thisCat) ) {
					// append any results to result wrapper
					$(this).clone().appendTo(resultWrapper);
				}
			});
		} else {
			// get clicked letter
			var thisLetter = $(this).text();
			// loop through LIs
			$(".sub_index li").each( function(){
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
		// animate wrapper height
		$(".sub_index").css("height", resultWrapper.height() );
	});

	// CLICK ON ARTIST NAME

	function artistInfoToggle ( target ) {
		var resultWrapper = $("#index .index_results");
		if ( !target.hasClass("clicked") ) {
			$(".index_artist_content").removeClass("clicked").css("height","0").hide();
			target.addClass("clicked").css("height","auto").show();
		} else {
			target.removeClass("clicked").css("height","0").hide();	
			console.log( resultWrapper.height() );	
		}
		// animate wrapper height
		$(".sub_index").css("height", resultWrapper.height() );
		/*
		ADD SCROLL TO 
		*/
	}

	$(".index_results").on("click", ".index_artist_title a", function(e){
		e.preventDefault();
		var target = $(this).parents("span").next(".index_artist_content");
		artistInfoToggle(target);
	});

	// 3.5. ARTIST VITRINE TOGGLE

	function artistVitrineOpen ( thisArtist ) {
		var winH = $(window).height();
		var resultWrapper = $(".index_results");
		var vitrine = $("#artist_vitrine");
		// get all child elements of this .index_artist_content
		var followingContent = thisArtist.parents(".index_artist_content").children();
		// get all following elements in results
		var following = thisArtist.parents(".index_artist").nextAll()
		// clone rather than move
		followingContent.hide().addClass("hidden");
		following.hide().addClass("hidden");
		var followingContentCopy = followingContent.clone();
		var followingCopy = following.clone();
		followingContentCopy.prependTo( $("#index_bis .section_content") ).show();
		followingCopy.prependTo( $("#index_bis .index_results") ).show();		
		// collapse sub_index
			// pause transition
		$(".sub_index").css({
			"height": resultWrapper.height(),
			"-webkit-transition": "height 0s",
            "transition": "height 0s" 
		});
		// animate vitrine
		vitrine.animate({
			"height" : winH * 0.7
		}, 1000).addClass("clicked");
		// reset transition
		$(".sub_index").css({
			"-webkit-transition": "",
            "transition": "" 
		});
	}

	function artistVitrineClose () {
		// close vitrine
		var vitrine = $("#artist_vitrine");
		vitrine.css("height", "0px").removeClass("clicked");
		// reset hidden elements in #index
		$(".hidden").show().removeClass("hidden");
		// empty #index_bis	
		$("#index_bis .index_results").empty().siblings().remove();	
	}

	$(".index").on("click", ".artist_vitrine_toggle", function(e){
		e.preventDefault();
		var artist = $(this);
		// animate vitrine
		var target = $("#artist_vitrine");	
		// if nothing is open
		if ( !target.hasClass("clicked") ) {
			artistVitrineOpen( artist );	
		} else {
			// reset
			artistVitrineClose(); 
			artistVitrineOpen( artist );				
		}		
	});

/*****************************************************************************
    
	4. WINDOW EVENTS

*****************************************************************************/

	$(window).on("load", function(){
		imagesFadeIn();
		imagesHtmlPrep(4);
		imagesInject(5);
		//imagesCalc();
	}).on("resize", function(){
		// receiptInit();
		imagesCalc();
	}).on("scroll", function(){
		$("html").attr("data-scroll", $(window).scrollTop() );
		// receiptCentre();
	});
    
});