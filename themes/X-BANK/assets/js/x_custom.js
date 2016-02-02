$( document ).ready(function() {

	/*

	1. VARIOUS 

		1.1. CUSTOM CHROME JAGGED EDGE FIX
		1.2. INIT SMOOTHSCROLL
		1.3. JUSTIFY LINES
		1.4. STARS FOR H1
		1.4. SCROLLER FUNCTION

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

// $.keyframe.debug = true;

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

	function justify ( ) {

		$(".line_stretch").each( function(){
			// get container width - HACK: receipt width * 0.85
			var thisW = $("#receipt").width() * 0.85;
			// get text width
			var noChars = $(this).text().trim().length;
			var fontS = parseFloat( $(this).css("font-size") );
			var textW = fontS * noChars * 0.5;
			// this ratio (0.595) can be played with
			// calculate difference + no. of characters
			var diff = thisW - textW;
			var space = ( diff / (noChars +1) );
			$(this).css("letter-spacing", space );
		});

	}

	// 1.4. H1 STARS

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

	// 1.5. SCROLL TO 

	function scroller ( thisClick ) {
		var target = thisClick.parents("section").find(".scroll_target");
		$("html,body").animate({
			scrollTop: target.offset().top - 80
		}, 500);
	}

/*****************************************************************************
    
	2. BACKGROUND

*****************************************************************************/

	// 2.1. DECLARE FUNCTIONS

	function imagesHtmlPrep( moment ) { // moment = post id
		
		// CREATE COLUMNS
		var direction;
		var ulHTML = "";
		var j;
		for ( i=0; i<4; i++ ) {
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
			$("#init_container").prepend( ulHTML ).attr("data-cols", "4" );	
		} else {

			// create new wrapper
			var newWrapper = $("<div></div>");
			// add load_wrapper for subsequent containers
			ulHTML += "<ul class='load_wrapper hide'></ul>";
			newWrapper.attr( "id", "wrapper-" + moment ).attr("data-cols", noCols ).html( ulHTML );
			// add classes depending on no. of cols
			newWrapper.addClass("container container_" + noCols);
			// append to wrapper
			newWrapper.appendTo( $(".toLoad") );
		}
	}

	// NUMBER CHECKER	
	function isNumber( input ) {
	    return !isNaN( input );
	}

	// ATTRIBUTE CLASS FOR NUMBER OF COLUMNS
	function noCols ( number ) {

		var mQuery = parseInt( number );
		var maxCols = parseInt( $(".current").find(".container").attr("data-cols") );
		var noCols;
		if ( isNumber(mQuery) ) {
			noCols = Math.min(maxCols, mQuery);	
		} else {
			noCols = maxCols;
		}
		
		if ( noCols === 1 ) {
			$(".current .container").addClass("container_1").removeClass("container_2 container_4");
		} else if ( noCols === 2 ) {
	       	$(".current .container").addClass("container_2").removeClass("container_1 container_4");
		} else {
			$(".current .container").addClass("container_4").removeClass("container_1 container_2");
		}

	}

	// SHUFFLE FUNCTION
	$.fn.randomize=function(a){(a?this.find(a):this).parent().each(function(){$(this).children(a).sort(function(){return Math.random()-0.5}).detach().appendTo(this)});return this};

	function imagesInject ( ) {

		// IMAGES INJECTED INTO CURRENT WRAPPER
		var target = $(".current");
		var source = target.find(".container .load_wrapper");
		
		// if 4 column view
		if ( source.find(".column_view").length ) {

			// loop through 4 existing columns
			source.find(".column_view").each( function(i){

				$(this).find("li.img").each( function(){
					$(this).clone().appendTo( target.find(".movable_wrapper").eq(i).find(".img_loop") ); 	
				});

			});

			// copy imgs depending on how many images there are
			for ( var j = 0; j < 2; j++ ) {
				
				$(".movable_wrapper li.img").each( function(){
					var thisParent = $(this).parents(".img_loop");
					$(this).clone().appendTo( thisParent  ).addClass("duplicate");
				});

			}

		// default image injection
		} else {

			var noImages = $(".current").find(".load_wrapper .img_loop li.img").length;
					
			var noCols = parseInt ( target.find(".container").attr("data-cols") );
			nocols = 4;
			
			// IMAGES INJECTED INTO ALL AVAILABLE ULs
			source.find("li.img").each( function(){
				$(this).clone().appendTo( target.find(".img_loop") ); 	
			});

			// IF MULTIPLE ULs, COLs 2-4 ARE SHUFFLED
			if ( noCols > 1 ) {
				for ( i=1; i < noCols; i++ ) {
					var parent = $(".movable_wrapper").eq( i ).find(".img_loop");
				    parent.find("li.img").randomize();
				}
			} 

		} // end of 4 column check

		// IF 4 COLUMN VIEW

		if ( $(".current .container").hasClass("container_2") || $(".current .container").hasClass("container_1") ) {
			fourCols();			
		} 

	}

 	function imagesAnim ( first ) {

 		if ( first ) {

 			firstTime = false;

 		} else {

			/* IMAGES ANIM */

	 		// GET UL + WIN HEIGHT
	 		var ulH = $(".img_loop").height();
			var winH = $(window).height();
			var target = ulH - ( winH * 2 );
			var time = target / 18.6;

			// speed = distance / time
			// time = distance / speed

			// DEFINE ANIMATIONS		
			$.keyframe.define({
			    name: 'up',
			    from: {
			    	'transform': 'translateY(' + 0 + 'px)'  
			    },
			    to: {
			        'transform': 'translateY(-' + ( ulH - ( winH * 2 ) ) + 'px)'  
			    }
			});

			$.keyframe.define({
			    name: 'down',
			    from: {
			    	'transform': 'translateY(-' + ( ulH - ( winH * 2 ) ) + 'px)'   
			    },
			    to: {
			        'transform': 'translateY(0px)' 
			    }
			});

			// ASSIGN ANIMATIONS

			$(".img_loop").resetKeyframe();

			$(".movable_wrapper:nth-child(1) .img_loop, .movable_wrapper:nth-child(3) .img_loop").playKeyframe({
			    name: 'up', 
			    duration: time + 's', 
			    timingFunction: 'ease-out',
			    direction: 'alternate',
			    complete: function () {
					$(".movable_wrapper:nth-child(1) .img_loop, .movable_wrapper:nth-child(3) .img_loop").playKeyframe({
					    name: 'up', 
					    duration: time + 's', 
					    timingFunction: 'ease-in-out',
					    direction: 'alternate',
					    iterationCount: 'infinite'
					});	    	
			    }
			});

			$(".movable_wrapper:nth-child(2) .img_loop, .movable_wrapper:nth-child(4) .img_loop").playKeyframe({
			    name: 'down', 
			    duration: time + 's',  
			    timingFunction: 'ease-out',
			    direction: 'alternate', 
			    complete: function(){
			    	$(".movable_wrapper:nth-child(2) .img_loop, .movable_wrapper:nth-child(4) .img_loop").playKeyframe({
					    name: 'down', 
					    duration: time + 's', 
					    timingFunction: 'ease-in-out',
					    direction: 'alternate', 
					    iterationCount: 'infinite'
					});	
			    }
			});	

		} // end of first time check

	}

	function imagesFadeIn ( postId ) {
		$(".current").animate({
			"opacity": "1"
		}, 2000);	
	}

	/* IF CURATED BG COLUMNS ARE USED */
	function fourCols ( cols ) {

		if ( cols === 4 ) {

			$(".appended").remove();
			$(".duplicate").show();

		} else {

			// check if four column view is activated
			if ( $(".load_wrapper ul").hasClass("column_view") ) {
				// IF 2 OR 1 COLUMNS ALL COLUMNS ARE THE SAME
				// HIDE DUPLICATES
				$(".duplicate").hide();

				// COPY ULs FROM 2, 3, 4 TO 1
				$(".current .movable_wrapper").each( function(i){
					if ( i > 0 ) {
						// JUST FROM 1st UL IN COLUMN
						$(this).find(".img_loop:first-child .img").each( function(){
							$(this).clone().appendTo(".current .movable_wrapper:first-child ul").addClass("appended");
							$(this).clone().appendTo(".current .movable_wrapper:nth-child(2) ul").addClass("appended");
						});
					}
				});
			}

		}

	}

	/* CLICK ON IMAGES */

	function imagesClick ( thisLi ) {
		if ( !$(".img_loop").hasClass("paused") ) {
			$(".img_loop").addClass("paused");

			// SHOW INFO			
			$(".img_info").css("opacity","0");
			thisLi.find(".img_info").css("opacity","1").clone().appendTo("#img_info_fixed");

		} else {
			$(".img_loop").removeClass("paused");

			// HIDE INFO
			$(".img_info").css("opacity","0");
			$("#img_info_fixed").empty();
		}
	}

	$(".wrapper").on("click", "li.img", function(){
		imagesClick( $(this) );
	});

	
	function wrapperShift () {
		/*
		Is there a way to simplify this ??
		*/
		// check where wrapper_1 is
		if ( parseInt ( $("#wrapper_1").css("left") ) === 0 ) {

			// Move wrappers
			$("#wrapper_1").css("left", "-100%");
			setTimeout( function(){
				$("#wrapper_1").css("opacity", "0");	
			}, 1500 );
			$("#wrapper_2").css("left", "0%");
			// Declare which wrapper can be loaded in
			$(".toLoad").removeClass("toLoad").addClass("current");
			$("#wrapper_2").addClass("toLoad").removeClass("current");
		} else {
			// Move wrappers
			$("#wrapper_2").css("left", "100%");
			setTimeout( function(){
				$("#wrapper_2").css("opacity", "0");	
			}, 1500 );
			$("#wrapper_1").css("left", "0%");
			// Declare which wrapper can be loaded in
			$(".toLoad").removeClass("toLoad").addClass("current");
			$("#wrapper_1").addClass("toLoad").removeClass("current");	

			imagesFadeIn();					
		}
	}

	// 2.2. EVENTS

		// 2.2.1. INITIATE ON LOAD

	function imagesInit () {

		imagesHtmlPrep( "init" ); // no. of columns // initial load
		imagesInject( ); // no. of imgs/col
		imagesAnim();
		// Check if images have loaded
		$("#load_wrapper").imagesLoaded().done( function(){
		    imagesFadeIn();

		    // Receipt slide up
			$("#receipt_wrapper").css("top","0px");
  		});	

	}

		// 2.2.2. ON ARTIST CLICK

	function artistImages ( thisClick ) {

		// get ID of post to load
		var postId = thisClick.parents("li").attr("id");
		// get number of columns
		var noCols = thisClick.parents("li").attr("data-cols");
		
		// check if not loaded already
		if ( $("body").find("#wrapper-" + postId).length ) {

			// imagesHtmlPrep( postId ); // prepare html with id of wrapper_postId

			// ajax call

			// imagesInject();

			// noCols ( noCols );

			// imagesAnim();

			// update url

		}

		// check if loaded already or not
		
		// var loaded = false;
		// $(".wrapper").each( function(){
		// 	if ( $(this).has("#wrapper-" + postId).length ) {
		// 		loaded = true;
		// 	}
		// });

		// prepare html
		imagesHtmlPrep( postId );
		/*
		// ajax call — append to load wrapper with id
		$.get("?p=" + postId, function (response) {
			// "#" + postId refers to newly created (or not) in bg
			$( "#wrapper-" + postId ).find(".load_wrapper").html( response );                   
		}).done(function () {
			// Inject images
			imagesInject( 4, postId );
			// imagesAnim( postId );

			// Animate wrappers
			setTimeout( function(){
				// 1 sec to let vitrine open first
				wrapperShift();
			}, 1000 );
			
			// Fade in after images have loaded	
			$( "#wrapper-" + postId ).imagesLoaded().done( function(){
			    imagesFadeIn( postId );
	  		});	

			// update url  
			// window.history.pushState("", "", sectionName);  
		}); 
		*/
	}

/*****************************************************************************
    
	3. RECEIPT

*****************************************************************************/

	// 3.1. ADDRESS HIGHLIGHT ON HOVER

	$("#r_address").hover( function(){
		$(this).find("p").addClass("highlight-right");
	}, function(){
		$(this).find("p").removeClass("highlight-right");
	});

	// 3.2. VITRINE TOGGLE

	function vitrineCloseOnScroll () {		
		$(".r_hole_tmp").each( function(){
			// detect if vitrine is visible or not
			var thisOffset = $(this).offset().top;
			var winH = $(window).height();

			if ( $(window).scrollTop() < thisOffset - ( winH / 2 ) || $(window).scrollTop() > thisOffset + ( winH / 2 ) ) {
				// detect if vitrine has class .no_close
				if ( !$(this).hasClass("no_close") ) {
					$(this).css("height", "0px").removeClass("clicked");	
				}
			}
			
		});
	
	}

	function vitrineToggle ( button ) {
		// button = id (e.g. toggle-147) 
		var thisA = button.split("-")[1];

		// calculate height of vitrine
		var winH = $(window).height();

		// get target
		var target;
		var artistVitrine = false;
		
		if ( thisA === "main" )  {
			// Main vitrine
			target = $("#r_vitrine").next(".r_hole");		
		} else {
			// Artist vitrine
			target = $("#artist_vitrine");
			artistVitrine = true;
		}

		if ( !target.hasClass("clicked") ) {
			
			// OPEN

			target.css("height", winH * 0.7).addClass("clicked no_close");

				// scroll up
			var scrollTarget;
			if ( artistVitrine ) {
				var artist = $( "#result-" + thisA );
				scrollTarget = artist.offset().top;
				
				artistVitrineOpen( artist );

			} else {
				scrollTarget = $( "#toggle-main" ).offset().top;
				
			}
			$("html,body").animate({
				scrollTop: scrollTarget
			}, 500);

				// remove no_close after 2 seconds
			setTimeout( function(){
				target.removeClass("no_close");
			}, 2000);

			// stop image jump
			$("#index_bis .index_artist_image img").css("margin-top", "24px");

		} else {

			// CLOSE

			target.css("height", "0px").removeClass("clicked");
			
			if ( artistVitrine ) {
				// close artist vitrine
				artistVitrineClose();
			}

		}	
	}

	$("a.main_vitrine").on("click", function(e){
		e.preventDefault();
		vitrineToggle ( $(this).attr("id") );
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

	// 3.4. CURRENT TOGGLE

	$(".show_toggle").on("click", function(e){
		e.preventDefault();
		/*
		var following = $(this).next(".show_content");
		if ( following.hasClass("clicked") ) {
			following.css( "height", 0 ).removeClass("clicked");
		} else {
			var contentsH = 0;
			following.children().each( function(){
				contentsH += $(this).outerHeight(true);
			}).height();
			following.css( "height", contentsH ).addClass("clicked");
			scroller( $(this) );		
		}
		*/
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
					// add new id to avoid conflicts
					var newId = "result-" + $(this).attr("id");
					$(this).clone().attr("id", newId).addClass("result").appendTo(resultWrapper);
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

	// 3.6. ARTIST NAME IN INDEX CLICK

	function artistInfoToggle ( target ) {
		// target = .index_artist_title a

		var resultWrapper = $("#index .index_results");
		var childrenH = 0;
		if ( !target.hasClass("clicked") ) {
			$(".index_artist_content").removeClass("clicked").css("height","0");
			// get height of content and declare css to get animation
			target.children().each( function(){
				childrenH += $(this).outerHeight(true);
			});
			// if info already open — setTimeout to wait until content has closed before re-opening
			if ( resultWrapper.hasClass("open") ) {
				setTimeout( function(){
					target.addClass("clicked").css(
						"height", childrenH
					);
					resultWrapper.addClass("open");				
				}, 500);
			} else {
				target.addClass("clicked").css(
					"height", childrenH
				);
				resultWrapper.addClass("open");							
			}
;
		} else {
			target.removeClass("clicked").css(
				"height", "0px"
			);	
			resultWrapper.removeClass("open");	
		}
		// animate wrapper height
		// calculate height based on LI's height + height of child
		var calcH = childrenH;
		$(".index_artist_title").each( function(){
			calcH += $(this).height();
		});
		$(".sub_index").css("height", calcH );
		
		// scroll
		var targetOffset = target.offset().top - 60;
		$("html,body").animate({
			scrollTop: targetOffset
		}, 500);
	}

	// 3.7. ARTIST VITRINE TOGGLE

	function artistVitrineOpen ( thisArtist ) {
		// thisArtist returns results LI

		// get, clone, hide and prepend followinginner and followingouter
		var followingInner = thisArtist.find(".index_artist_content").children();
		var followingOuter = thisArtist.nextAll();
	
		// hide original elements
		followingInner.add(followingOuter).hide().addClass("hidden");

		// clone elements
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

		$("#artist_vitrine").css("height", "0px").removeClass("clicked");
		
		// stop image jump
		$("#index_bis .index_artist_image img").css("margin-top", "0px");
		//$("#index_bis").css("padding-top", "0px");
		$("#index").css("padding-bottom", "24px");

		setTimeout( function(){
			// reset html elements from index_bis
			$(".hidden").show().removeClass("hidden");
			// empty #index_bis	
			$("#index_bis .index_results").empty().siblings().remove();
			// animate wrapper height
			$(".sub_index").css({
				"-webkit-transition": "height 0s",
				"transition": "height 0s", 
				"height": $("#index .index_results").height() 
			});
			setTimeout( function(){
				$(".sub_index").css({
					"-webkit-transition": "",
					"transition": "" 
				});
			}, 1000);

			$("#index").css("padding-bottom", "");

		}, 1000);

	}

	// CLICK EVENTS

		// INFO TOGGLE
	$(".index_results").on("click", ".index_artist_title a", function(e){
		e.preventDefault();
		var target = $(this).parents(".index_artist_title").next(".index_artist_content");
		artistInfoToggle( target );
	});

		// VITRINE TOGGLE
	$(".index").on("click", ".artist_vitrine_toggle", function(e){
		e.preventDefault();
		// VITRINE OPEN / CLOSE FUNCTION
		vitrineToggle( $(this).attr("id") );
		/* NEED CHECK WHETHER THIS ARTIST IS ALREADY LOADED OR NOT */
		
		/* CHECK WHETHER ARTIST IS SELECTED, IN INDEX_BIS?? */

		// IN BG SECTION 2.2
		artistImages( $(this) ); 		
	});

	// 3.7. SEARCH FUNCTION

		// INITIATE HIDESEEK PLUGIN
	$('#search').hideseek({
		ignore_accents: true,
		hidden_mode: true
	}).on("_after", function() {

		// ON KEY UP
		
		// empty results wrapper
		var resultWrapper = $("#index .index_results");
		resultWrapper.empty();
		// loop through LIs — check if has class .result — see plugin file for modifications
		$(".sub_index li").each( function(){
			if ( $(this).hasClass("result") ) {
				$(this).clone().appendTo(resultWrapper).hide();
			}
		});
		// animate wrapper height
		$(".sub_index").css("height", resultWrapper.height() );

	});

		// TOGGLE SEARCH FIELD
			// SHOW
	$("#index_search a").on("click", function(){
		$(this).hide().next().show();
	});
			// HIDE
	$(document).click(function(e) { 
	    if ( !$(e.target).closest("#index_search").length ) {
	        $("#index_search input").hide().prev().show();
	        // REMOVE UNDERLINE
	        $(".index_menu a").css("border-bottom","");
	    }        
	});

/*****************************************************************************
    
	4. WINDOW EVENTS

*****************************************************************************/

	$(window).on("load", function(){
		imagesInit();
		justify();	
	}).on("resize", function(){
		//imagesAnim();
	}).on("scroll", function(){
		vitrineCloseOnScroll();
	});

	/*
	






	*/

	// MEDIA QUERY LISTENERS

	var firstTime = true;
	var handleMediaChange = function (mql) {
		
	    // Gives number of columns for image injection
	    if (mql.s.matches) {
	        // Less than 600px wide     
	        noCols(1);
	        fourCols();
	        imagesAnim();
	    } else if (mql.m.matches) {
	        // More than 600px wide
			noCols(2);
			fourCols();
			imagesAnim();		
	    } else {
	    	// More than 900px wide
			noCols(4);
			justify();
			fourCols( 4 );
			imagesAnim( firstTime ); // need to check if first time
	    }
	}

	var mql = {};
	mql.s = window.matchMedia("(max-width: 660px)");
	mql.m = window.matchMedia("(max-width: 900px)");
	mql.s.addListener(function(){
		handleMediaChange(mql);
	});
	mql.m.addListener(function(){
		handleMediaChange(mql);
	});

	handleMediaChange(mql);

});