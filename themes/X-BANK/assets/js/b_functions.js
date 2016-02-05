/****************************************************************************
    
	2. FUNCTIONS
		2.1. BACKGROUND
			2.1.1. PREPARE HTML FOR IMAGES
			2.1.2. NUMBER CHECKER
			2.1.3. ATTRIBUTE CLASS FOR NUMBER OF COLUMNS
			2.1.4. SHUFFLE FUNCTION
			2.1.5. INJECT IMAGES
			2.1.6. ANIMATE IMAGES
			2.1.7. FADE IN IMAGES
			2.1.8. MANAGE FOUR COLUMNS
			2.1.9. CLICK ON IMAGES
			2.1.10. WRAPPER SHIFT
			2.1.11. INITIATE ON LOAD
			2.1.12. ARTIST IMAGES LOAD
		2.2. RECEIPT
			2.2.1. VITRINE CLOSE ON SCROLL
			2.2.2. FILTER INDEX
			2.2.3. ARTIST INFO TOGGLE
			2.2.4. VITRINE TOGGLE
			2.2.5. ARTIST VITRINE OPEN
			2.2.6. ARTIST VITRINE CLOSE
			2.2.7. SEE MORE

*****************************************************************************/

// 2.1. BACKGROUND

	// 2.1.1. PREPARE HTML FOR IMAGES

	function imagesHtmlPrep( moment ) { // moment = post id
		console.log("imagesHtmlPrep");
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
			newWrapper.attr( "id", "wrapper-" + moment ).attr("data-cols", "4" ).html( ulHTML );
			// add classes depending on no. of cols
			newWrapper.addClass("container container_4");
			// append to wrapper
			newWrapper.appendTo( $(".toLoad") );
		}
	}

	// 2.1.2. NUMBER CHECKER	
	
	function isNumber( input ) {
	    return !isNaN( input );
	}

	// 2.1.3. ATTRIBUTE CLASS FOR NUMBER OF COLUMNS
	
	function noCols ( number, where ) {
		console.log("noCols");
		var target;
		if ( where === "current" ) {
			target = $(".current");
		} else {
			target = $(".toLoad");
		}

		var mQuery = parseInt( number );
		var maxCols = parseInt( target.find(".container").attr("data-cols") );
		var noCols;
		if ( isNumber(mQuery) ) {
			noCols = Math.min(maxCols, mQuery);	
		} else {
			noCols = maxCols;
		}
		
		if ( noCols === 1 ) {
			target.find(".container").addClass("container_1").removeClass("container_2 container_4");
		} else if ( noCols === 2 ) {
	       	target.find(".container").addClass("container_2").removeClass("container_1 container_4");
		} else {
			target.find(".container").addClass("container_4").removeClass("container_1 container_2");
		}

	}

	// 2.1.4. SHUFFLE FUNCTION

	$.fn.randomize=function(a){(a?this.find(a):this).parent().each(function(){$(this).children(a).sort(function(){return Math.random()-0.5}).detach().appendTo(this)});return this};

	// 2.1.5. INJECT IMAGES

	function imagesInject ( where ) {
		console.log("imagesInject");
		var target, 
			source;

		if ( where != "toLoad" ) {

			// IMAGES INJECTED INTO CURRENT WRAPPER
			target = $(".current");
			source = target.find(".container .load_wrapper");

		} else {

			// IMAGES INJECTED INTO OTHER WRAPPER
			target = $(".toLoad");
			source = target.find(".container .load_wrapper");

		}
	
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

			var noImages = target.find(".load_wrapper .img_loop li.img").length;
					
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
		if ( target.find(".container").hasClass("container_2") || target.find(".container").hasClass("container_1") ) {
			manageCols();			
		} 

	}

	// 2.1.6. ANIMATE IMAGES

 	function imagesAnim ( where, when ) {
		console.log("imagesAnim");

		if ( when ) {
			first = false;
		} else {

	 		var target;
			if ( where === "current" ) {
				target = $(".current");
				console.log("current");
			} else {
				target = $(".toLoad");
				console.log("to load");
			}

	 		// GET UL + WIN HEIGHT
	 		var ulH = target.find(".img_loop").height();
			var winH = $(window).height();
			var dest = ulH - ( winH * 2 );
			var time = dest / 18.6;

			console.log( "ulH", ulH );

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

			target.find(".img_loop").resetKeyframe();

			target.find(".movable_wrapper:nth-child(1) .img_loop, .movable_wrapper:nth-child(3) .img_loop").playKeyframe({
			    name: 'up', 
			    duration: time + 's', 
			    timingFunction: 'ease-out',
			    direction: 'alternate',
			    complete: function () {
					target.find(".movable_wrapper:nth-child(1) .img_loop, .movable_wrapper:nth-child(3) .img_loop").playKeyframe({
					    name: 'up', 
					    duration: time + 's', 
					    timingFunction: 'ease-in-out',
					    direction: 'alternate',
					    iterationCount: 'infinite'
					});	    	
			    }
			});

			target.find(".movable_wrapper:nth-child(2) .img_loop, .movable_wrapper:nth-child(4) .img_loop").playKeyframe({
			    name: 'down', 
			    duration: time + 's',  
			    timingFunction: 'ease-out',
			    direction: 'alternate', 
			    complete: function(){
			    	target.find(".movable_wrapper:nth-child(2) .img_loop, .movable_wrapper:nth-child(4) .img_loop").playKeyframe({
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

	// 2.1.7. FADE IN IMAGES

	function imagesFadeIn ( postId ) {
		console.log("imagesFadeIn");
		$(".current").animate({
			"opacity": "1"
		}, 2000);	
	}

	// 2.1.8. MANAGE FOUR COLUMNS

	function manageCols ( cols ) {
		console.log("manageCols");
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

	// 2.1.9. CLICK ON IMAGES

	function imagesClick ( thisLi ) {
		console.log("imagesClick");
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

	// 2.1.10. WRAPPER SHIFT

	function wrapperShift () {
		console.log("wrapperShift");

		// Is there a way to simplify this ??

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

	// 2.1.11. INITIATE ON LOAD

	function imagesInit () {
		console.log("imagesInit");
		imagesHtmlPrep( "init" ); // no. of columns // initial load
		imagesInject( ); // no. of imgs/col
		imagesAnim( "current" );
		// Check if images have loaded
		$("#load_wrapper").imagesLoaded().done( function(){
		    imagesFadeIn();

		    // Receipt slide up
			$("#receipt_wrapper").css("top","0px");
  		});	

	}

	// 2.1.12. ARTIST IMAGES LOAD

	function artistImages ( thisArtist ) {
		console.log("artistImages");
		// get ID of post to load
		var postId = thisArtist.attr("id");
		// get number of columns
		var cols = thisArtist.attr("data-cols");

		// check if not loaded already
		if ( $("body").find("#wrapper-" + postId).length === 0 ) {

			// prepare html with id of wrapper_postId
			// imagesHtmlPrep( postId ); 

			// ajax call
			/*$( "#wrapper-" + postId ).find(".load_wrapper").load("?p=" + postId, function () {
				console.log("loaded");
			});*/
			
			// $.load("?p=" + postId, function (response) {
			// 	// "#" + postId refers to newly created (or not) in bg
			// 	$( "#wrapper-" + postId ).find(".load_wrapper").html( response );                   
			// }).done(function () {

			// 	imagesInject( "toLoad" );

			// 	noCols ( cols, "toLoad" );

			// 	imagesAnim( );
				
			// 	// wrapperShift

			// 	// update url

			// }); 
			
		} 

	}

// 2.2. RECEIPT

	// 2.2.1. VITRINE CLOSE ON SCROLL

	function vitrineCloseOnScroll () {	
		console.log("vitrineCloseOnScroll");	
		$(".r_hole").each( function(){			
			var thisOffset = $(this).offset().top;
			var winH = $(window).height();
			// detect if vitrine is visible or not
			if ( $(window).scrollTop() < thisOffset - ( winH / 2 ) || $(window).scrollTop() > thisOffset + ( winH / 2 ) ) {
				// detect if vitrine has class .no_close
				if ( !$(this).hasClass("no_close") ) {
					$(this).css("height", "0px").removeClass("clicked");	
				}
			}
		});
	}

	// 2.2.2. FILTER INDEX

	function filterIndex ( thisClick ) {
		console.log("filterIndex");

		// empty results wrapper
		var resultWrapper = $("#index .index_results");
		resultWrapper.empty();
		
		if ( thisClick.parents("#index_categories").length ) { // CATEGORIES
			var thisCat = thisClick.text().toLowerCase();
			// loop through LIs
			$(".sub_index li").each( function(){
				if ( $(this).hasClass(thisCat) ) {	
					// append any results to result wrapper
					// add new id to avoid conflicts
					var newId = "result-" + $(this).attr("id");
					$(this).clone().attr("id", newId).addClass("result").appendTo(resultWrapper);
				}
			});
		} else { // LETTERS
			// get clicked letter
			var thisLetter = thisClick.text();
			// loop through LIs
			$(".sub_index li").each( function(){
				var initial = $(this).data("initial");
				if ( initial === thisLetter ) {
					// append any results to result wrapper
					$(this).clone().addClass("result").appendTo(resultWrapper);
				}
			});
		}
		// underline clicked letter or cat
		$(".index_menu a").css("border-bottom","");
		thisClick.css("border-bottom","1px solid black");
		// animate wrapper height
		$(".sub_index").css("height", resultWrapper.height() );

	}

	// 2.2.3. ARTIST INFO TOGGLE

	function artistInfoToggle ( target ) {
		console.log("artistInfoToggle");	 
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

	// 2.2.4. VITRINE TOGGLE

	function vitrineToggle ( thisId ) {
		console.log("vitrineToggle");
		// button = id (e.g. toggle-147) 
		var thisA = thisId.split("-")[1];

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

	// 2.2.5. ARTIST VITRINE OPEN

	function artistVitrineOpen ( thisArtist ) {
		console.log("artistVitrineOpen");
		// thisArtist returns results LI

		// BACKGROUND FUNCTION — BG SECTION 2.2
		artistImages( thisArtist ); 

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

	// 2.2.6. ARTIST VITRINE CLOSE

	function artistVitrineClose () {
		console.log("artistVitrineClose");
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

	// 2.2.7. SEE MORE

	function seeMore ( slug ) {

		// SCROLL DOWN TO INDEX ANCHOR
		var indexOffset = $("#index").offset().top;
		$("html,body").animate({
			scrollTop: indexOffset
		}, 500);	

		// OPEN SUB INDEX WITH ARTIST'S NAME
		console.log(slug);

		// SHOW IN INDEX_RESULTS
			// empty results wrapper
		var resultWrapper = $("#index .index_results");
		resultWrapper.empty();

			// loop through index
		var newId;
		$(".sub_index li").each( function(){
			if ( $(this).attr("data-slug") === slug ) {
				newId = "result-" + $(this).attr("id");
				$(this).clone().attr("id", newId).addClass("result").appendTo(resultWrapper);
			}
		});

			// animate wrapper height
		$(".sub_index").css("height", resultWrapper.height() );

		// TOGGLE INFO CONTAINER

		var target = $("#" + newId).find(".index_artist_content");
		artistInfoToggle( target );

		// UNPAUSE ANIMATION

		$(".img_loop").removeClass("paused");
			// Hide info
		$(".img_info").css("opacity","0");
		$("#img_info_fixed").empty();

	}


	