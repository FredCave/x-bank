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
		var j;
		for ( i=0; i<noCols; i++ ) {
			if ( i % 2 === 0 ) {
				direction = "slide_up";
			} else {
				direction = "slide_down";
			}
			j = i + 1;
			ulHTML += "<div class='movable_wrapper " + direction + " col_" + j +"'>";
			ulHTML += "<ul class='img_loop'></ul><ul class='img_loop'></ul>";
			ulHTML += "</div>";
		}
		// console.log(ulHTML);
		$("#wrapper_1").html( ulHTML ).attr("data-col", noCols );
	}

	function imagesInject ( imgPerCol ) {
		// get number of spaces to be filled
		var spaces = $("#wrapper_1").attr("data-col") * imgPerCol;
		// spaces
		var col = 0; // col corresponds to eq of target element		
		var img = 0;
		var sourceIndex = 0; // corresponds to image index in #load_wrapper
		var source;
		for ( i=0; i < spaces; i++ ) {			
			if ( img === imgPerCol ) {
				img = 0;
				col++;
			}
			// Get image
			source = $("#load_wrapper ul li").eq(sourceIndex);
			// If no more images, start from beginning 
			if ( !source.length ) {
				sourceIndex = 0;
				source = $("#load_wrapper ul li").eq(sourceIndex);
			} 				
			source.clone().appendTo( $("#wrapper_1 .movable_wrapper").eq( col ).find("ul") );
			img++;
			sourceIndex++;
		} // end of for loop
	}

	function imagesAnim () {
		// 2 ULs per column
		var winH = $(window).height();
		var loopHs = [];
		$(".movable_wrapper").each( function(){
			// get UL height in px
			var loopH =  $(this).find("ul").height();
			// compare to winH to get vh
			var loopVH = "-" + (loopH / winH) * 100 + "vh";
			loopHs.push(loopVH);
		});
		
		/* Define animations dynamically?? */

		// define animations
		$.keyframe.define({
		    name: 'loop_1',
		    from: {
		        'transform': 'translateY(0vh)'
		    },
		    to: {
		        'transform': 'translateY(' + loopHs[0] + ')' 
		    }
		});

		$.keyframe.define({
		    name: 'loop_2',
		    from: {
		        'transform': 'translateY(' + loopHs[1] + ')' 
		    },
		    to: {
		        'transform': 'translateY(0vh)'
		    }
		});	

		$.keyframe.define({
		    name: 'loop_3',
		    from: {
		        'transform': 'translateY(0vh)'
		    },
		    to: {
		        'transform': 'translateY(' + loopHs[2] + ')' 
		    }
		});

		$.keyframe.define({
		    name: 'loop_4',
		    from: {
		        'transform': 'translateY(' + loopHs[3] + ')' 
		    },
		    to: {
		        'transform': 'translateY(0vh)'
		    }
		});	

		// Play animations

		$(".movable_wrapper").each( function(i){
			$(this).playKeyframe({
			    name: 'loop_' + ( i + 1 ), 
			    duration: '18s', 
			    timingFunction: 'linear', 
			    iterationCount: 'infinite' 
			});			
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

	// 3.2. RECEIPT CONTENT INIT

	function dotConnect ( selector ) {
		$( selector ).each( function(){
			var nameL = $(this).find("span.index_artist_name").text().length;
			var dateL = $(this).find("span.index_artist_dates").text().length;
			console.log(nameL, dateL);

			// is there a way to find available space??

		});
	}

	dotConnect ( $(".index_artist_title") );

	// 3.3. VITRINE TOGGLE

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

	// 3.4. BACK TO TOP BUTTON

	$(".back_to_top a").on("click", function(e){
		e.preventDefault();
		// get offset of menu
		var menuOffset = $("#r_menu").offset().top;
		// scroll
		$("html,body").animate({
			scrollTop: menuOffset
		}, 500);
	});

	// 3.5. INDEX CLICK

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

	// 3.6. CLICK ON ARTIST NAME

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

	// 3.7. ARTIST VITRINE TOGGLE

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
		imagesAnim();
	}).on("resize", function(){
		// receiptInit();
		// imagesCalc();
	}).on("scroll", function(){
		$("html").attr("data-scroll", $(window).scrollTop() );
		// receiptCentre();
	});
    
});