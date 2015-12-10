$( document ).ready(function() {

	/*

	1. VARIOUS 

		1.1. CUSTOM CHROME JAGGED EDGE FIX
		1.2. INIT SMOOTHSCROLL
		1.3. JUSTIFY LINES

	2. BACKGROUND

		2.1. DECLARE FUNCTIONS
			2.1.1. imagesHtmlPrep
			2.1.2. imagesInject
			2.1.3. imagesAnim
			2.1.4. imagesFadeIn
			2.1.5. wrapperShift
		2.2. EVENTS
			2.2.1. imagesInit
			2.2.2. on artist click

	3. RECEIPT
		
		3.1. RECEIPT POSITION ????
		3.2. RECEIPT CONTENT INIT ????
		3.3. VITRINE TOGGLE
		3.4. BACK TO TOP BUTTON
		3.5. INDEX CLICK
		3.6. ARTIST NAME CLICK
		3.7. ARTIST VITRINE TOGGLE

	4. WINDOW EVENTS

	*/


/*****************************************************************************
    
	1. VARIOUS

*****************************************************************************/

	// 1.1. CUSTOM CHROME JAGGED EDGE FIX

	if ( window.chrome ) {
		$("section").css("backface-visibility", "hidden");
	}

	// 1.2. INIT SMOOTHSCROLL

	$('a').smoothScroll();

	// 1.3. JUSTIFY LINES

	function justify ( source ) {
		/* 
		TO DO:
		GLOBALISED FUNCTION 
		*/
	}

	$(".index_artist_title").each( function(){
		// get container width - HACK: receipt width * 0.85
		var thisW = $("#receipt").width() * 0.85;
		// get text width
		var noChars = $(this).find("p").text().length;
		//var textW = $(this).find("p").css("letter-spacing","0").textWidth();
		/* 
		THIS NEEDS FIXING
		*/
		textW = 490; // TEMP: should be this with 0 letter-spacing
		// calculate difference + no. of characters
		var diff = thisW - textW;
		var space = ( diff / (noChars +1) ) * 1.05;
		$(this).find("p").css("letter-spacing", space );
		// console.log(thisW, textW, noChars);
	});


/*****************************************************************************
    
	2. BACKGROUND

*****************************************************************************/

	// 2.1. DECLARE FUNCTIONS

	function imagesHtmlPrep( noCols, moment ) { // moment = post id
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
		// destination wrapper
		if ( moment === "init" ) {
			$("#init_container").prepend( ulHTML ).attr("data-col", noCols );	
		} else {
			// create new wrapper
			var newWrapper = $( document.createElement('div') );
			// add load_wrapper for subsequent containers
			ulHTML += "<ul class='load_wrapper hide'></ul>";
			newWrapper.attr( "id", moment ).attr("data-col", noCols ).html( ulHTML );
			// add classes depending on no. of cols
			newWrapper.addClass("container container_" + noCols);
			// append to wrapper
			newWrapper.appendTo( $(".toLoad") );
		}
	}

	function imagesInject ( imgPerCol, postId ) {
		// get number of spaces to be filled
		// + need to know which container is being injected
		var target;
		if ( postId === "init" ) {
			target = $("#init_container");
		} else {
			target = $("#" + postId);			
		}
		var spaces = target.attr("data-col") * imgPerCol;
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
			source = target.find(".load_wrapper ul li").eq(sourceIndex);
			// If no more images, start from beginning 
			if ( !source.length ) {
				sourceIndex = 0;
				source = target.find(".load_wrapper ul li").eq(sourceIndex);
			} 				
			source.clone().appendTo( target.find(".movable_wrapper").eq( col ).find("ul") );
			img++;
			sourceIndex++;
		} // end of for loop
	}

	function imagesAnim ( postId ) {
		// 2 ULs per column
		var winH = $(window).height();
		var loopHs = [];
		var target;
		if ( postId === "init" ) {
			target = "init_container";
		} else {
			target = postId;
		}
		$("#" + target).find(".movable_wrapper").each( function(){
			// get UL height in px
			var loopH =  $(this).find("ul").height();
			// compare to winH to get vh
			var loopVH = "-" + (loopH / winH) * 100 + "vh";
			loopHs.push(loopVH);
		});
		
		/* 

		Define animations dynamically?? 

		*/

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

		$("#" + target).find(".movable_wrapper").each( function(i){
			$(this).playKeyframe({
			    name: 'loop_' + ( i + 1 ), 
			    duration: '18s', 
			    timingFunction: 'linear', 
			    iterationCount: 'infinite' 
			});			
		});

	}

	function imagesFadeIn ( postId ) {
		// if no postId then use initial container
		var target;
		if ( !postId ) {
			target = $("#wrapper_1");
		} else {
			target = $( "#" + postId ).parents(".wrapper");
		}
		target.animate({
			"opacity": "1"
		}, 2000);	
	}

	function wrapperShift () {
		/*

		Is there a way to simplify this ??

		*/
		// check where wrapper_1 is
		if ( parseInt ( $("#wrapper_1").css("left") ) === 0 ) {
			// Move wrappers
			$("#wrapper_1").css("left", "-100%").delay(1000).css("opacity","0");
			$("#wrapper_2").css("left", "0%");
			// Declare which wrapper can be loaded in
			$(".toLoad").removeClass("toLoad");
			$("#wrapper_2").addClass("toLoad");
		} else {
			// Move wrappers
			$("#wrapper_2").css("left", "100%").delay(1000).css("opacity","0");
			$("#wrapper_1").css("left", "0%");
			// Declare which wrapper can be loaded in
			$(".toLoad").removeClass("toLoad");
			$("#wrapper_1").addClass("toLoad");						
		}
	}

	// 2.2. EVENTS

		// 2.2.1. INITIATE ON LOAD

	function imagesInit () {
		imagesHtmlPrep( 4, "init" ); // no. of columns // initial load
		imagesInject( 5, "init" ); // no. of imgs/col
		imagesAnim( "init" );
		imagesFadeIn();
	}

		// 2.2.2. ON ARTIST CLICK

	$("#test_button").on("click", function(){
		// animate wrappers
		wrapperShift();
		// get ID of post to load
		var postId = $(this).children().attr("id"); // temporary path — needs changing
		// prepare html
		imagesHtmlPrep( 2, postId );
		// ajax call — append to load wrapper with id
		$.get("?p=" + postId, function (response) {
            $( "#" + postId ).find(".load_wrapper").html( response );                   
        }).done(function () {           
	        // Inject images
	        imagesInject( 4, postId );
	        imagesAnim( postId );
	        $("#" + postId).onImagesLoad( function( $selector ){
				//note: this == $selector, both of which will be $("body") in this example
				imagesFadeIn( postId );
			});
			
	        /*
				Check if images have loaded
				then fade in
			*/
	        // update url  
	        // window.history.pushState("", "", sectionName);  
        }); 
	});


/*****************************************************************************
    
	3. RECEIPT

*****************************************************************************/

	// 3.1 RECEIPT POSITIONING

	// ????

	// 3.2. RECEIPT CONTENT INIT

	// ????

	// 3.3. VITRINE TOGGLE // GLOBALISE ??

	function vitrineToggle ( thisA ) {
		// calculate height of vitrine
		var winH = $(window).height();
		// get target
		var target;
		var artistVitrine = false;
		if ( $(thisA).hasClass("main_vitrine") ) {
			// Main vitrine
			target = $("#r_vitrine").next(".r_hole");
			artistVitrine = true;
		} else {
			// Artist vitrine
			target = $("#artist_vitrine");
		}
		if ( !target.hasClass("clicked") ) {
			target.css("height", winH * 0.7).addClass("clicked");

			// scroll up
			var scrollTarget = $(thisA).offset().top - 60;
			$("html,body").animate({
				scrollTop: scrollTarget
			}, 500);
			if ( artistVitrine ) {
				var artist = thisA.parents(".index_artist");
				artistVitrineOpen( artist );
			}
		} else {
			target.css("height", "0px").removeClass("clicked");			
			if ( artistVitrine ) {
				artistVitrineClose();
			}
		}	
	}

	$("a.main_vitrine").on("click", function(e){
		e.preventDefault();
		vitrineToggle ( $(this) );
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

	// 3.6. ARTIST NAME CLICK

	function artistInfoToggle ( target ) {

		// reset html elements from index_bis
		$(".hidden").show().removeClass("hidden");
		// empty #index_bis	
		$("#index_bis .index_results").empty().siblings().remove();

		var resultWrapper = $("#index .index_results");
		var childrenH = 0;
		if ( !target.hasClass("clicked") ) {
			$(".index_artist_content").removeClass("clicked").css("height","0");
			// get height of content and declare css to get animation
			target.children().each( function(){
				childrenH += $(this).outerHeight(true);
			});
			target.addClass("clicked").css(
				"height", childrenH
				);
		} else {
			target.removeClass("clicked").css(
				"height", "0px"
			);		
		}
		// animate wrapper height
		// calculate height based on LI's height + height of child
		var calcH = childrenH;
		$(".index_artist_title").each( function(){
			calcH += $(this).height();
		});
		$(".sub_index").css("height", calcH );
		
		/*
		ADD SCROLL TO 
		*/
	}

	// CLICK EVENT

	$(".index_results").on("click", ".index_artist_title a", function(e){
		e.preventDefault();
		var target = $(this).parents(".index_artist_title").next(".index_artist_content");
		artistInfoToggle(target);
	});

	// 3.7. ARTIST VITRINE TOGGLE

	function artistVitrineOpen ( thisArtist ) {
		// thisArtist returns LI
		// var winH = $(window).height();
		// var vitrine = $("#artist_vitrine");
		// get, clone, hide and prepend followinginner and followingouter
		var followingInner = thisArtist.find(".index_artist_content").children();
		var followingOuter = thisArtist.nextAll();
		// hide original elements
		followingInner.add(followingOuter).hide().addClass("hidden");
		// clone rather than move
		followingInner.clone().prependTo( $("#index_bis .section_content") ).show();
		followingOuter.clone().prependTo( $("#index_bis .index_results") ).show();	
		// collapse sub_index
			// pause transition
		var prevElements = thisArtist.prevAll().length + 1;
		var resultsH = prevElements * thisArtist.find(".index_artist_title").height();
		$(".sub_index").css({
			"height": resultsH,
			"-webkit-transition": "height 0s",
            "transition": "height 0s" 
		});
		// animate vitrine
		//vitrine.css("height", winH * 0.7).addClass("clicked");
		// scroll up
		// var scrollTarget = thisArtist.offset().top - 60;
		// $("html,body").animate({
		// 	scrollTop: scrollTarget
		// }, 500);
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
		// no reset here, elements are reset when an artist is next clicked
		//setTimeout( function(){
			// reset hidden elements in #index
			// $(".hidden").show().removeClass("hidden");
			// empty #index_bis	
			// $("#index_bis .index_results").empty().siblings().remove();
		//}, 1000 );
		var resultsH = $(".index_results").height();
		// $(".sub_index").css({
		// 	"height": resultsH,
		// 	"-webkit-transition": "height 0s",
  //           "transition": "height 0s"  
		// });	
	}

	// Click event

	$(".index").on("click", ".artist_vitrine_toggle", function(e){
		e.preventDefault();
		// get artist (li)
		//var artist = $(this).parents(".index_artist");
		// animate vitrine
		vitrineToggle( $(this) ); 
		// if nothing is open
		// if ( !target.hasClass("clicked") ) {
		// 	artistVitrineOpen( artist );	
		// } else {
		// 	// reset
		// 	artistVitrineClose(); 
		// 	// artistVitrineOpen( artist );				
		// }		
	});

/*****************************************************************************
    
	4. WINDOW EVENTS

*****************************************************************************/

	$(window).on("load", function(){
		
		imagesInit();

	}).on("resize", function(){

	}).on("scroll", function(){
		$("html").attr("data-scroll", $(window).scrollTop() );

	});
    
});