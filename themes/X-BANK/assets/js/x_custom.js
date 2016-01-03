$( document ).ready(function() {

	/*

	1. VARIOUS 

		1.1. CUSTOM CHROME JAGGED EDGE FIX
		1.2. INIT SMOOTHSCROLL
		1.3. JUSTIFY LINES
		1.4. STARS FOR H1

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

	$(".line_stretch").each( function(){
		// get container width - HACK: receipt width * 0.85
		var thisW = $("#receipt").width() * 0.85;
		// get text width
		var noChars = $(this).text().trim().length;
		console.log(noChars);
		var fontS = parseFloat( $(this).css("font-size") );
		var textW = fontS * noChars * 0.595;
		// this ratio (0.595) can be played with
		// calculate difference + no. of characters
		var diff = thisW - textW;
		var space = ( diff / (noChars +1) );
		$(this).css("letter-spacing", space );
		// console.log(thisW, textW, noChars);
	});

	// 1.4. H1 STARS

	$("h1").each( function(){
		var text = $(this).text().replace(/\s/g, "*");
		$(this).text(text);
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

	function imagesAnim ( init ) {
		var target;

		// Init / single post
		if ( init ) {
			target = "init_container";

		} else {	
			target = postId;
		}

		// Calculate dimensions
	
		var winH = $(window).height();
		var loopHs = [];
		$("#" + target).find(".movable_wrapper").each( function(){
			// get UL height in px
			var thisUl = $(this).find("ul")
			var loopH =  thisUl.height();
			// set height
			thisUl.css("height",loopH).attr("data-height",loopH);
			loopHs.push(loopH);
			//console.log( $(this), loopH );
		});

		// Declare animations dynamically

		for (var i = 0; i < loopHs.length; i++) {
		    // Odd/even to create alternating animations
		    if ( i % 2 === 0) {
				
				// UP
				
				$.keyframe.define({
				    name: 'exit-' + i,
				    from: {
				        'transform': 'translateY(0px)'
				    },
				    to: {
				        'transform': 'translateY(-' + loopHs[i] + 'px)' // negative number
				    }
				});

				$.keyframe.define({
				    name: 'enter-' + i,
				    from: {
				        'transform': 'translateY(' + loopHs[i] + 'px)'
				    },
				    to: {
				        'transform': 'translateY(-' + loopHs[i] + 'px)' // negative number'
				    }
				});

		    } else {
				
				// DOWN

				$.keyframe.define({
				    name: 'exit-' + i,
				    from: {
				    	'transform': 'translateY(-' + loopHs[i] + 'px)'  
				    },
				    to: {
				        'transform': 'translateY(0px)'
				    }
				});

				$.keyframe.define({
				    name: 'enter-' + i,
				    from: {
				    	'transform': 'translateY(-' + loopHs[i] + 'px)'  
				    },
				    to: {
				        'transform': 'translateY(' + loopHs[i] + 'px)'
				    }
				});
		    
		    }

		}

		// Play animations

		$("#wrapper_1 .movable_wrapper ul:first-child").addClass("ul_1");
		$("#wrapper_1 .movable_wrapper ul:last-child").addClass("ul_2").hide();

		// Shift up second UL to fill gap
		$("#" + target).find(".movable_wrapper .ul_2").each( function(i){
			$(this).css(
				"margin-top", "-" + $(this).height() + "px"
			);			
		});

		$("#" + target).find(".movable_wrapper .ul_1").each( function(i){
			//console.log( $(this), target );
			$(this).playKeyframe({
			    name: 'enter-' + i, 
			    duration: '20s', 
			    timingFunction: 'linear', 
			    iterationCount: 'infinite' 
			});			
		});
		setTimeout( function() {
			$(".ul_2").show();
			$("#" + target).find(".movable_wrapper .ul_2").each( function(i){
				$(this).playKeyframe({
				    name: 'enter-' + i, 
				    duration: '20s', 
				    timingFunction: 'linear', 
				    iterationCount: 'infinite' 
				});			
			});
		}, 10000 );

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

	/* CLICK ON IMAGES */

	function imagesPause () {
		if ( !$(".wrapper").hasClass("paused") ) {
			$(".wrapper").addClass("paused");
			$(".wrapper").find("ul").addClass("paused");
		} else {
			$(".wrapper").removeClass("paused");
			$(".wrapper").find("ul").removeClass("paused");
		}
	}

	$(".wrapper").on("click", "li", function(){
		imagesPause();
		console.log( $(this).attr("id") );
	});

	function wrapperShift () {
		/*

		Is there a way to simplify this ??

		*/
		// check where wrapper_1 is
		if ( parseInt ( $("#wrapper_1").css("left") ) === 0 ) {

			console.log("wrapper shift case 1");

			// Move wrappers
			$("#wrapper_1").css("left", "-100%");
			setTimeout( function(){
				$("#wrapper_1").css("opacity", "0");	
			}, 1500 );
			$("#wrapper_2").css("left", "0%");
			// Declare which wrapper can be loaded in
			$(".toLoad").removeClass("toLoad");
			$("#wrapper_2").addClass("toLoad");
		} else {
			// Move wrappers
			$("#wrapper_2").css("left", "100%");
			setTimeout( function(){
				$("#wrapper_2").css("opacity", "0");	
			}, 1500 );
			$("#wrapper_1").css("left", "0%");
			// Declare which wrapper can be loaded in
			$(".toLoad").removeClass("toLoad");
			$("#wrapper_1").addClass("toLoad");						
		}
	}

	// ON RESIZE

	function imagesResize () {
		/*
		Height is fixed during calculation
		Stored in attr
		Margins are modified depending on diff
		*/
		$(".movable_wrapper ul").each( function(i){
			// stored height
			var dataH = $(this).data("height");
			// current height
			var thisH = $(this).height();

			var diff = dataH - thisH;
			//console.log(diff);

			
			
			var imgH = 0;
			$(this).find("img").each( function(){
				imgH += $(this).height();
			});
			var imgDiff = ( dataH - imgH ) / 5; // Always 5 img/col?
			$(this).find("img").css(
				"margin-bottom", imgDiff
			);

		});
	}

	// 2.2. EVENTS

		// 2.2.1. INITIATE ON LOAD

	function imagesInit () {
		imagesHtmlPrep( 4, "init" ); // no. of columns // initial load
		imagesInject( 5, "init" ); // no. of imgs/col
		imagesAnim( true );
		imagesFadeIn();
	}



		// 2.2.2. ON ARTIST CLICK

	function artistVitrineToggle ( thisClick ) {
		console.log(thisClick);

		// get ID of post to load
		var postId = thisClick.parents("li").attr("id");
		// get number of columns
		var noCols = thisClick.parents("li").attr("data-cols");
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

			// animate wrappers
			// wrapperShift();
			
	        /*
				Check if images have loaded
				then fade in
			*/
	        // update url  
	        // window.history.pushState("", "", sectionName);  
        }); 
	}

/*****************************************************************************
    
	3. RECEIPT

*****************************************************************************/

	// 3.1 RECEIPT POSITIONING

	// ????

	// 3.2. RECEIPT CONTENT INIT

	// ????

	// 3.3. VITRINE TOGGLE

	function vitrineToggle ( thisA ) {
		// calculate height of vitrine
		var winH = $(window).height();
		// get target
		var target;
		var artistVitrine = false;
		if ( $(thisA).hasClass("main_vitrine") ) {
			// Main vitrine
			target = $("#r_vitrine").next(".r_hole");		
		} else {
			// Artist vitrine
			target = $("#artist_vitrine");
			artistVitrine = true;
		}

		if ( !target.hasClass("clicked") ) {
			target.css("height", winH * 0.7).addClass("clicked");

			// scroll up
			var scrollTarget = $(thisA).offset().top - 60;
			
			if ( artistVitrine ) {
				var artist = thisA.parents(".index_artist");
				scrollTarget = artist.offset().top - 60;
				artistVitrineOpen( artist );
			}

			console.log(thisA, scrollTarget);
			$("html,body").animate({
				scrollTop: scrollTarget
			}, 500);

		} else {
			target.css("height", "0px").removeClass("clicked");			
			// if ( artistVitrine ) {
			// 	artistVitrineClose();
			// }
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

	// 3.4. CURRENT TOGGLE

	$(".show_toggle").on("click", function(e){
		e.preventDefault();
		var following = $(this).next(".show_content");
		if ( following.hasClass("clicked") ) {
			following.css( "height", 0 ).removeClass("clicked");
		} else {
			var contentsH = 0;
			following.children().each( function(){
				contentsH += $(this).outerHeight(true);
			}).height();
			console.log(contentsH);
			following.css( "height", contentsH ).addClass("clicked");		
		}
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

		/* PROBLEM IS HERE */

		// close artist vitrine
		$("#artist_vitrine").hide().css("height", "0px").removeClass("clicked");
		setTimeout( function(){
			$("#artist_vitrine").show();
		}, 500);	
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
		// animate vitrine is done by vitrineToggle function
		
		// reset transition ????
		setTimeout( function(){
			$(".sub_index").css({
				"-webkit-transition": "",
				"transition": "" 
			});	
		}, 500);
	}

	function artistVitrineClose () {
		// close vitrine
		//var vitrine = $("#artist_vitrine");
		//vitrine.css("height", "0px").removeClass("clicked");
		// no reset here, elements are reset when an artist is next clicked
		//setTimeout( function(){
			// reset hidden elements in #index
			// $(".hidden").show().removeClass("hidden");
			// empty #index_bis	
			// $("#index_bis .index_results").empty().siblings().remove();
		//}, 1000 );
		//var resultsH = $(".index_results").height();
		// $(".sub_index").css({
		// 	"height": resultsH,
		// 	"-webkit-transition": "height 0s",
  //           "transition": "height 0s"  
		// });	
	}

	// Click event

	$(".index").on("click", ".artist_vitrine_toggle", function(e){
		e.preventDefault();
		vitrineToggle( $(this) );
		/* NEED CHECK WHETHER THIS ARTIST IS ALREADY LOADED OR NOT */
		//artistVitrineToggle( $(this) ); 		
	});

/*****************************************************************************
    
	4. WINDOW EVENTS

*****************************************************************************/

	$(window).on("load", function(){
		
		imagesInit();

	}).on("resize", function(){
		imagesResize();
	}).on("scroll", function(){
		$("html").attr("data-scroll", $(window).scrollTop() );

	});
    
});