/****************************************************************************
    
	2. FUNCTIONS
		2.1. BACKGROUND
			2.1.1. VARIOUS BACKGROUND FUNCTIONS
				2.1.1.1. 	CLICK ON IMAGES
				2.1.1.2. 	ATTRIBUTE CLASS FOR NUMBER OF COLUMNS
				2.1.1.3.    INITIATE ON LOAD
				2.1.1.4. 	TMP – ROUND IMAGES
			2.1.2. BACKGROUND IMAGE CHANGE

				2.1.1. 	PREPARE HTML FOR IMAGES
				2.1.4. 	SHUFFLE FUNCTION
				2.1.5. 	INJECT IMAGES
				2.1.6. 	ANIMATE IMAGES
				2.1.7. 	FADE IN IMAGES
				2.1.8. 	MANAGE FOUR COLUMNS
				2.1.10. WRAPPER SHIFT
				2.1.12. ARTIST IMAGES LOAD
			
		2.2. RECEIPT
			2.2.1. 	REMOVE HASH
			2.2.2. 	URL DETECT
			2.2.3. 	VITRINE CLOSE ON SCROLL
			2.2.4. 	FILTER INDEX
			2.2.5. 	ARTIST INFO TOGGLE
			2.2.6. 	VITRINE TOGGLE
			2.2.7. 	ARTIST VITRINE OPEN
			2.2.8. 	ARTIST VITRINE CLOSE
			2.2.9. 	SEE MORE
			2.2.10. CATEGORY CLICK
			2.2.11. SCROLLER
			2.2.12. SHOW IMAGES
			2.2.13. SHOW TOGGLE
			2.2.14. AGENDA CHECK

*****************************************************************************/

// 2.1. BACKGROUND

	// 2.1.1. VARIOUS BACKGROUND FUNCTIONS

		// 2.1.1.1. CLICK ON IMAGES

		function infoReset () {
			console.log("infoReset");
			$(".img_loop").removeClass("paused");

			// HIDE INFO
			$(".img_info").css("opacity","0");
			$("#img_info_fixed").empty().removeClass("active");		
		}

		function imagesClick ( thisLi ) {
			console.log("imagesClick");
			if ( !$(".img_loop").hasClass("paused") ) {
				$(".img_loop").addClass("paused");

				// SHOW INFO			
				$(".img_info").css("opacity","0");
				thisLi.find(".img_info").css("opacity","1").clone().appendTo("#img_info_fixed");
				$("#img_info_fixed").addClass("active");
			} else {
				infoReset();
			}
		}

		// 2.1.1.2. ATTRIBUTE CLASS FOR NUMBER OF COLUMNS

		function isNumber( input ) {
		    return !isNaN( input );
		}
		
		function noCols ( number, where ) {
			console.log("noCols");
			// var target;
			// if ( where === "current" ) {
			// 	target = $(".current");
			// } else {
			// 	target = $(".toLoad");
			// }		
			// var mQuery = parseInt( number );
			// var maxCols = parseInt( target.find(".container").attr("data-cols") );		
			// var noCols;
			// if ( isNumber(mQuery) ) {
			// 	noCols = Math.min(maxCols, mQuery);	
			// } else {
			// 	noCols = maxCols;
			// }
			// if ( noCols === 1 ) {
			// 	target.find(".container").addClass("container_1").removeClass("container_2 container_4");
			// } else if ( noCols === 2 ) {
		 //       	target.find(".container").addClass("container_2").removeClass("container_1 container_4");
			// } else {
			// 	target.find(".container").addClass("container_4").removeClass("container_1 container_2");
			// }	
		}

		// 2.1.1.3.	MANAGE FOUR COLUMNS

		function manageCols ( cols ) {
			console.log("manageCols");

			// if ( cols === 4 ) {

			// 	$(".appended").remove();
			// 	$(".duplicate").show();
			// } else {

			// 	// check if four column view is activated
			// 	if ( $(".load_wrapper ul").hasClass("column_view") ) {

			// 		// IF 2 OR 1 COLUMNS ALL COLUMNS ARE THE SAME
			// 		// HIDE DUPLICATES
			// 		$(".duplicate").hide();

			// 		// COPY ULs FROM 2, 3, 4 TO 1

			// 		var target_1 = $(".current .col_1 .img_loop");
			// 		var target_2 = $(".current .col_2 .img_loop");				
			// 		$(".current .movable_wrapper").each( function(i){
						
			// 			if ( i > 0 ) {
			// 				// JUST FROM 1st UL IN COLUMN
							
			// 				var targetImgs = $(this).find(".img_loop:first-child .img");
			// 				var noImages = targetImgs.length;
			// 				var appendHtml = [];
			// 				var appendImg,
			// 					clonedImg;
			// 				for ( var i = 0; i < noImages; i++ ) {
			// 					appendImg = targetImgs.eq(i);
			// 					clonedImg = appendImg.clone().addClass("appended");
			// 					appendHtml.push( clonedImg );
			// 				}
			// 				target_1.append(appendHtml);
			// 				target_2.append(appendHtml);

			// 			}
			// 		});
					
			// 	}
			// }
		}

		// 2.1.11. INITIATE ON LOAD

		function imagesInit () {
			console.log("imagesInit");
			// MAIN IMAGE PREP FUNCTION		
			imageManager( "init" );
			// CHECK IF IMAGES HAVE LOADED
			$("#load_wrapper").imagesLoaded().done( function(){
			    imagesFadeIn();
			    // RECEIPT SLIDE UP
				$("#receipt_wrapper").css("top","0px");
	  		});	

			// TMP
			// roundImages();
		}

		// 2.1.1.2. TMP – ROUND IMAGES

		function roundImages () {
			console.log("roundImages");
			// CREATE A PROXY DIV WITH IMG AS BG
			$(".bg_image").each( function(i) {
				var imgSrc = $(this).attr("src");
				var imgW = $(this).width();
				console.log(imgSrc);
				$(this).hide();
				$( "<div id='proxy_" + i + "' class='bg_proxy bg_image'></div>" ).insertAfter( $(this) );
				$( "#proxy_" + i ).css({
					// "border" : "1px solid purple",
					"width" : imgW,
					"height" : imgW,
					"background-image" : "url(" + imgSrc + ")",
					"background-position" : "center",
					"background-size" : "cover",
					"border-radius" : "50%",
					"box-shadow" : "18px 18px 23px 0px rgba(0,0,0,0.35)"
				});
			});
		}

	// 2.1.2. BACKGROUND IMAGE CHANGE

		// 2.1.2.X. PREPARE HTML FOR IMAGES
		// REDUNDANT????

		// function imagesHtmlPrep ( post ) {
		// 	console.log("imagesHtmlPrep");
		// 	// POST === ID OR "INIT"
		// 	// COLUMNS ALREADY CREATED IN PHP
		// 	// DESTINATION WRAPPER
		// 	if ( post === "init" ) {
		// 		$("#init_container").prepend( ulHTML ).attr("data-cols", "4" );	
		// 	// } else {
		// 	// 	// create new wrapper
		// 	// 	var newWrapper = $("<div></div>");
		// 	// 	// add load_wrapper for subsequent containers
		// 	// 	ulHTML += "<ul class='load_wrapper column_view hide'></ul>";
		// 	// 	newWrapper.attr( "id", "wrapper-" + moment ).attr("data-cols", "4" ).html( ulHTML );
		// 	// 	// add classes depending on no. of cols
		// 	// 	newWrapper.addClass("container container_4 wrapper_visible");
		// 	// 	// APPEND TO CURRENT WRAPPER
		// 	// 	// AS IT HAPPENS AFTER WRAPPERSHIFT FUNCTION
		// 	// 	newWrapper.appendTo( $(".current") );
		// 	}
		// }

		// 2.1.2.X. AJAX LOAD IMAGES

		function imagesLoad ( post ) {
			console.log("imagesLoad");
			// POST === POST ID
			// TARGET === .CURRENT
			// CHECK IF NOT LOADED ALREADY
			if ( !$("body").find("#wrapper-" + postId).length ) {
				// ADD LI TO LOAD WRAPPER
				$("#load_wrapper").append("<li id='wrapper-" + postId + "'></li>");

				// AJAX CALL
				$( "#wrapper-" + postId ).find(".load_wrapper").load("?p=" + postId, function () {
					console.log("Ajax loaded");
					// NEW WRAPPER ALREADY RENAMED CURRENT
					// noCols ( cols, "current" );	
					// imagesInject( "current" );	
					// $(".current").find(".duplicate").show();			
					// imagesAnim( ); 
					// imagesFadeIn();
				});			
			} else {
				console.log("Already loaded.");
			}	

		}

		// 2.1.2.X. INJECT IMAGES

			// SHUFFLE FUNCTION
		$.fn.randomize=function(a){(a?this.find(a):this).parent().each(function(){$(this).children(a).sort(function(){return Math.random()-0.5}).detach().appendTo(this)});return this};

		function imagesInject ( post ) {
			console.log("imagesInject");
			// POST === POST ID
			var target = $(".current"),
				source;
			if ( post === "init" ) {
				source = $("#init_container");
			} else {
				source = $("#wrapper_" + post);
			}

			// IF 4 COLUMN VIEW
			if ( source.find(".column_view").length ) {
				// LOOP THROUGH 4 EXISTING COLUMNS
				source.find(".column_view").each( function(i){
					$(this).find("li.img").each( function(){
						$(this).clone().appendTo( target.find(".movable_wrapper").eq(i).find(".img_loop") ); 	
					});
				});
				// COPY IMGS DEPENDING ON HOW MANY IMAGES THERE ARE
				for ( var j = 0; j < 2; j++ ) {				
					$(".movable_wrapper li.img").each( function(){
						var thisParent = $(this).parents(".img_loop");
						$(this).clone().appendTo( thisParent  ).addClass("duplicate");
					});
				}
			// DEFAULT IMAGE INJECTION
			} else {
				var noImages = target.find("li.img").length;
				var noCols = parseInt ( target.attr("data-cols") );
				// nocols = 4; ????
				// IMAGES INJECTED INTO ALL AVAILABLE ULs
				source.find("li.img").each( function(){
					$(this).clone().appendTo( target.find(".img_loop") ); 	
				});
				// COPY IMGS DEPENDING ON HOW MANY IMAGES THERE ARE
				for ( var j = 0; j < 2; j++ ) {		
					$(".movable_wrapper li.img").each( function(){
						var thisParent = $(this).parents(".img_loop");
						$(this).clone().appendTo( thisParent ).addClass("duplicate");
					});
				}
				// IF MULTIPLE ULs, COLs 2-4 ARE SHUFFLED	
				if ( noCols > 1 ) {
					for ( i=1; i < noCols; i++ ) {
						var parent = $(".movable_wrapper").eq( i ).find(".img_loop");
					    parent.find("li.img").randomize();
					}
				} 
			} // END OF 4 COLUMN CHECK

			// IF 4 COLUMN VIEW
			if ( target.find(".container").hasClass("container_2") || target.find(".container").hasClass("container_1") ) {
				// TMP REMOVED FOR DEBUGGING
				// manageCols();						
			} 

		}

		// 2.1.2.X. ANIMATE IMAGES 
		// 			CALLED ON MEDIA CHANGE

		function imagesAnim ( first ) {
			console.log("imagesAnim");

			if ( first ) { // FIRST === TRUE
				first = false;
				console.log("imagesAnim break");
			} else {

		 		var target = $(".current");
				
		 		// GET UL + WIN HEIGHT
		 		var ulH = target.find(".img_loop").height();
				var winH = $(window).height();
				var dest = ulH - ( winH * 2 );
				var time = dest / 18.6;

				// TIME = DISTANCE / SPEED

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

				// $.keyframe.debug = true;

				// SAFARI TEST
				var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
							   navigator.userAgent && !navigator.userAgent.match('CriOS');

				var count = 1;
				if ( isSafari ) {
					count = "infinite";
				} 

				target.find(".movable_wrapper:nth-child(odd) .img_loop").playKeyframe({
				    name: 'up', 
				    duration: time + 's', 
				    timingFunction: "ease-out",
				    direction: 'alternate',
				    iterationCount: count, 
				  	complete: function () {
				  		if ( !isSafari ) {
				  			console.log("secondary loop fired");
							target.find(".movable_wrapper:nth-child(odd) .img_loop").playKeyframe({
							    name: 'up', 
							    duration: time + 's', 
							    timingFunction: 'ease-in-out',
							    direction: 'alternate',
							    iterationCount: 'infinite'
							});	
				  		}
	   			  	}
				});

				target.find(".movable_wrapper:nth-child(even) .img_loop").playKeyframe({
				    name: 'down', 
				    duration: time + 's',  
				    timingFunction: "ease-out",
				    direction: 'alternate', 
				    iterationCount: count,
				    complete: function(){
				    	if ( !isSafari ) {
							console.log("secondary loop fired");
					    	target.find(".movable_wrapper:nth-child(even) .img_loop").playKeyframe({
							    name: 'down', 
							    duration: time + 's', 
							    timingFunction: 'ease-in-out',
							    direction: 'alternate', 
							    iterationCount: 'infinite'
							});	
						}
				    }
				});	

			} // END OF FIRST TIME CHECK

		}

		// 2.1.2.X. FADE IN IMAGES

		function imagesFadeIn () {
			console.log("imagesFadeIn");
			$(".current").animate({
				"opacity": "1"
			}, 2000, function() {
				console.log(412);
				$(".current").siblings(".wrapper").css({
					"opacity": "0"
				});
			});
		}

		// 2.1.2.X. IMAGE MANAGER

		function imageManager ( post ) {
			console.log("imageManager");
			// CENTRALISES THESE FUNCTIONS
				// imagesHtmlPrep( post ); – REDUNDANT???
			if ( post !== "init" ) {
				imagesLoad( post );
			}
			imagesInject( post );
			imagesAnim();
			imagesFadeIn();
		}

		// 2.1.2.X. WRAPPER SHIFT

		function wrapperShift ( post ) {
			console.log("wrapperShift");
		}

		// 2.1.2.X. MAIN FUNCTION

		function bgImages( post ) {
			console.log("bgImages");
			// WRAPPER SHIFT
			wrapperShift(post);
			// ONCE ANIMATION DONE LOAD NEW IMAGES
			imageManager(post);
		}

// 2.2. RECEIPT

	// 2.2.1. VITRINE CLOSE ON SCROLL

	function removeHash () { 
	    // PUSH STATE NEEDS FALLBACK FOR IE
	    // history.pushState("", document.title, window.location.pathname + window.location.search);
	}

	// 2.2.2. URL DETECT

	function urlDetect() {
		var hash = window.location.hash;
		// IF HASH EXISTS
		if ( hash.length ) {
			console.log( "urlDetect", hash.substring(1) );
			
			// GET SLUG
			var slug = hash.substring(1);

			// IF IN AGENDA
			if ( $( "[data-slug=" + hash.substring(1) + "]" ).parents("") ) {

			}
				// OPEN UP POST

			// IF INDEX
				// SEEMORE

			// IF ENTRY DOESN'T HAVE CLASS INDEX_DISABLED
			console.log( $( "[data-slug=" + hash.substring(1) + "]" ).find("a").attr("class") );
			if ( !$( "[data-slug=" + hash.substring(1) + "]" ).find("a").hasClass("index_disabled") ) {
				// SEE MORE FUNCTION	
				seeMore( hash.substring(1) );				
			} else {
				console.log("deactived");	
			}
		} else {
			// PAGE RESET ??
			// CLOSE ALL / SCROLL TO TOP
			$("html,body").animate({
				scrollTop: 0
			}, 500);
		}
	}

	// 2.2.3. VITRINE CLOSE ON SCROLL

	var firstTime = true;
	function vitrineManageScroll ( scroll ) {	
		// console.log("vitrineManageScroll");	

		// ON FIRST SCROLL OPEN MAIN VITRINE
		if ( firstTime ) {
			// console.log(526, firstTime);
			// vitrineToggle ( "toggle-main" );
			// firstTime = false;
		}

		$(".r_hole").each( function(){			
			var thisOffset = $(this).offset().top;
			var winH = $(window).height();
			var vitrH = $(this).height();
			// detect if vitrine is visible or not
			if ( scroll < thisOffset - ( winH / 2 ) || scroll > thisOffset + ( winH / 2 ) ) {
				// detect if vitrine has class .no_close
				if ( !$(this).hasClass("no_close") ) {
					$(this).css("height", "0px").removeClass("clicked");	
				}

			}
		});
	}

	// 2.2.4. FILTER INDEX

	function filterInit () {
		console.log("filterInit");
		// RUN FILTER INDEX WITH FASHION IS DEFAULT
		// $( "#index_categories li:first-child a" ).trigger( "click" );
	}

	function showBlock ( blockNo ) {
		// BLOCK PARAMETER GIVES BLOCK LENGTH
		console.log( "showBlock", blockNo );
		// blockNo 2 => blockNo > 25 && blockNo <= 50 
		// blockNo X => blockNo > (X-1)*25 && blockNo <= X * 25
		
		// RECORD CURRENT BLOCK
		$("#index .index_results").attr( "data-block", blockNo );

		// HIGHLIGHT SELECTED BLOCK
		$("#index_nav_" + blockNo).css({
			"border-bottom" : "1px solid black"
		}).siblings().css({
			"border-bottom" : ""			
		});

		$("#index .index_results li").each( function(i){
			if ( i >= ( ( blockNo - 1 ) * 25 ) && i < ( blockNo * 25 ) ) {
				$(this).addClass("result");					
			} else {
				$(this).removeClass("result");		
			}
		});
	}

	function paginationNav ( click ) {
		console.log("paginationNav");
		// GET ID
		var stem = click.attr("id").substring(10),
			currentBlock = parseInt( $("#index .index_results").attr( "data-block" ) ),
			maxBlock = parseInt( $("#index .index_results").attr( "data-max" ) ),
			stemNo;
		console.log( 547, stem );
		if ( stem === "left" ) {
			// LEFT
			stemNo = currentBlock - 1;
			if ( stemNo !== 0 ) {
				console.log(580);
				showBlock( stemNo );	
			}
		} else if ( stem === "right" ) {
			// RIGHT
			stemNo = currentBlock + 1;
			if ( stemNo <= maxBlock ) {
				console.log(587);
				showBlock( stemNo );	
			}
		} else {
			// NUMBER
			stemNo = parseInt( stem );
			showBlock( stemNo );		
		}
		
		// ANIMATE WRAPPER HEIGHT
		var resultWrapper = $("#index .index_results");
		$(".sub_index").css("height", resultWrapper.height() );
	}

	function paginationFilter () {
		console.log("paginationFilter");
		// IF MORE THAN 40 RESULTS
		var maxResults = 30,
			block = 25,
			results = $("#index .index_results li").length;
		console.log( 549, results );
		if ( results > maxResults ) {
			console.log(552);

			// COUNT HOW MANY BLOCKS ARE NEEDED
			var blocks = Math.ceil(results / block);
				// REGISTER THIS NUMBER
			$("#index .index_results").attr("data-max", blocks);
			console.log( 563, blocks );

			var navHtml = "<a id='index_nav_left' class='index_nav' href=''><</a>";
			// FOR EACH BLOCK ADD A NUMBER LINK
			for ( var i = 1; i <= blocks; i++ ) {
				navHtml += "<a id='index_nav_" + i + "' class='index_nav' href=''>" + i + "</a>";
			}
			navHtml += "<a id='index_nav_right' class='index_nav' href=''>></a>";

			// APPEND TO HTML + SHOW 
			$("#index_nav").html(navHtml).show();

			// FIND FIRST BLOCK AND ADD RESULT CLASS
			showBlock( 1 );

		} else {
			// NO FILTER – ALL RESULTS APPENDED TO FINAL AREA
			console.log(554);
			$("#index .index_results li").each( function(){
				// ADD RESULT CLASS TO MAKE VISIBLE
				$(this).addClass("result");
			});

			// HIDE NAV
			$("#index_nav").hide();
		}
	}

	function filterIndex ( thisClick ) {
		console.log("filterIndex");

		// MODIFIED TO BE BASED ON CATEGORIES AND NOT LETTERS

		// EMPTY RESULTS WRAPPER
		var resultWrapper = $("#index .index_results");
		resultWrapper.empty();

		// EMPTY SEARCH FIELD IF NOT SUB-CAT
		if ( !thisClick.parents().hasClass("sub_cat") ) {
			$("#search").val("");
		}

		// GET CLICKED LETTER (CAT)
		var thisCat = thisClick.text().toLowerCase();
		// loop through LIs 

		$(".sub_index li").each( function(){
			// console.log( thisCat, thisLetter );
			// var initial = $(this).data("initial");
			if ( $(this).hasClass(thisCat) ) {
				// add new id to avoid conflicts
				var newId = "result-" + $(this).attr("id");

				// APPEND ANY RESULTS TO RESULT WRAPPER WITHOUT ADDING CLASS "RESULT"
				// $(this).clone().attr("id", newId).addClass("result").appendTo(resultWrapper);
				$(this).clone().attr("id", newId).appendTo(resultWrapper);
			} 
		});	

		// RUN PAGINATION FILTER
		paginationFilter();		
		
		// underline clicked letter or cat
		// $(".index_menu a").css("border-bottom","");
		// thisClick.css("border-bottom","1px solid black");
		// THIS IS INCLUDED IN CATCLICK FUNCTION

		// MAKE SUB-CATEGORES VISIBLE
		if ( thisCat === "fashion" ) {
			$(".sub_cat").hide();
			$("#fashion_sub_cat").show();
			// MEASURE SUB_CAT LI BECAUSE SUB_CAT COLLAPSES ON LARGE WIDTHS
			var subCatH = $("#fashion_sub_cat li").height();
			// ON SMALL SCREEN IF SMALLER THAN SUB_CAT
			if ( subCatH < $("#fashion_sub_cat").height() ) {
				subCatH = $("#fashion_sub_cat").height();
			}
			console.log( 547, subCatH );
			$("#sub_cat_wrapper").css( "height", subCatH + 12 );
		} else if ( thisCat === "design" ) {
			$(".sub_cat").hide();
			$("#design_sub_cat").show();
			// MEASURE SUB_CAT
			var subCatH = $("#design_sub_cat").height();
			console.log( 554, subCatH );
			$("#sub_cat_wrapper").css( "height", subCatH + 12 );
		} else if ( thisCat === "art" ) {
			// HIDE SUB-CATS
			$(".sub_cat").hide();
			$("#sub_cat_wrapper").css( "height", "0px" );
		}
		// animate wrapper height
		$(".sub_index").css("height", resultWrapper.height() );

	}

	// 2.2.5. ARTIST INFO TOGGLE

	function artistInfoToggle ( target ) {
		console.log("artistInfoToggle");	 
		// TARGET = .INDEX_ARTIST_CONTENT

		var resultWrapper = $("#index .index_results");
		var childrenH = 0;

		if ( !target.hasClass("clicked") ) {
			console.log(580);
			// CLOSE EXISTING POSTS 
			$(".index_artist_content").removeClass("clicked").css("height","0");
			
			// GET HEIGHT OF CONTENT AND DECLARE CSS TO GET ANIMATION
			target.children().each( function(){
				childrenH += $(this).outerHeight(true);
			});
			console.log(587, childrenH);
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
			
			// update url
			var name = target.parents("li").attr("data-slug");
			window.location.hash = name;
		
		} else {
			console.log(606);			
			target.removeClass("clicked").css(
				"height", "0px"
			);	
			resultWrapper.removeClass("open");	

			// clear url
			removeHash();
		
		}
		// ANIMATE WRAPPER HEIGHT
		// CALCULATE HEIGHT BASED ON LI'S HEIGHT + HEIGHT OF CHILD
		var calcH = childrenH;
		console.log(623, calcH);
		$(".index_artist_title").each( function(){
			calcH += $(this).height();
		});		
		console.log(627, calcH);
		$(".sub_index").css("height", calcH );
		
		// SCROLL TO TOP OF POST	
		setTimeout( function(){
			var targetOffset = target.offset().top - 60;
			$("html,body").animate({
				scrollTop: targetOffset
			}, 1000);			
		}, 500 );

	}

	// 2.2.6. VITRINE TOGGLE

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
				var scrollTarget = $( "#result-" + thisA ).offset().top;
				// scrollTarget = artist.offset().top;				
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

	// 2.2.7. ARTIST VITRINE OPEN

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

	// 2.2.8. ARTIST VITRINE CLOSE

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

	// 2.2.9. SEE MORE

	function seeMore ( slug ) {
		console.log( "seeMore", slug );
		// SCROLL DOWN TO INDEX ANCHOR
		var indexOffset = $("#index").offset().top;
		// need to account for closing vitrine
		var vitrineH = $(".r_hole").height();

		$("html,body").animate({
			scrollTop: indexOffset + vitrineH
		}, 1000);	

		// SHOW IN INDEX_RESULTS
			// EMPTY RESULTS WRAPPER
		var resultWrapper = $("#index .index_results");
		resultWrapper.empty();

			// LOOP THROUGH INDEX
		var newId;
		$(".sub_index li").each( function(){
			if ( $(this).attr("data-slug") === slug ) {
				newId = "result-" + $(this).attr("id");
				$(this).clone().attr("id", newId).addClass("result").appendTo(resultWrapper);
			}
		});

			// TOGGLE INFO CONTAINER
		var target = $("#" + newId).find(".index_artist_content");
		artistInfoToggle( target );

		// UNPAUSE ANIMATION
		infoReset();

	}

	// 2.2.10. CATEGORY CLICK

				// GET CATEGORY OF PARENT IF SUB-CAT
				// if ( $(this).parents(".sub_cat").length ) {
				// 	var parentCat = $(this).parents(".sub_cat").attr("id").split("_")[0];
				// 	// FIND PARENT CAT
				// 	$("#index_categories li").each( function(){
				// 		if ( $(this).find("a").text().toLowerCase() === parentCat ) {
				// 			// REMOVE UNDERLINE
				// 			$(this).css(
				// 				"border-bottom", "1px solid transparent"
				// 			);
				// 		}
				// 	});
				// }

	function catClick ( thisId ) {
		// CLEAR RESULTS
		var resultWrapper = $("#index .index_results");
		resultWrapper.empty();

		// CHANGE INDEX TITLE – REMOVED
		catName = thisId.split("_");
		console.log( 975, catName[1] );
		// $("#index .section_head h1").text( catName[1] + " Index" );
		
		// ADD ATTRIBUTE TO INDEX
		$("#index").attr( "data-cat", catName[1] );

		// IF PARENT CAT DE-UNDERLINE SUB-CATS
		$("#index_categories li").each( function(){
			if ( catName[1] === $(this).find("a").text().toLowerCase() ) {
				console.log(998);
				$(".sub_cat li").css(
					"border-bottom", "1px solid transparent"
				);
			}
		});

		// UNDERLINE CATEGORY IN INDEX
		$("#index_categories li, .sub_cat li").each( function(){
			if ( $(this).text().toLowerCase() === catName[1] ) {

				// REMOVES UNDERLINE ON OTHER SUB-CATS UNDER SAME CAT
				$(this).parents(".sub_cat").find("li").css(
					"border-bottom", "1px solid transparent"
				);
				// UNDERLINES THIS
				$(this).css(
					"border-bottom", "1px solid black"
				).siblings().css(
					"border-bottom", "1px solid transparent"
				);
			}
		});

		// animate wrapper height
		$(".sub_index").css("height", resultWrapper.height() );

		// ACTIVATE SEARCH
		// $("#index_message").css("height","0");
		// $(".index_letter a").removeClass("disabled");
		// $("#index_search input").removeClass("disabled");

	}

	// 2.2.11. SCROLLER
	// ONLY USED IN AGENDA ????

	function scroller ( thisClick ) {
		console.log("scroller");
		var target = thisClick.parents(".show_wrapper").find(".scroll_target");
		$("html,body").animate({
			scrollTop: target.offset().top - 80
		}, 500);
	}

	// 2.2.12. SHOW IMAGES

	function showImgsInit () {
		console.log("showImgsInit");
		// RESIZE SLIDESHOW – WIDTH = HEIGHT
		var imgW = $(".show_images").width();
		$(".show_images").css( "height", imgW );
		// IF NO VISIBLE IMG – SET ONE
		if ( !$(".show_images").find(".visible").length ) {
			$(".show_images li:first-child").addClass("visible");
		} 
		// IF MULTIPLE IMAGES – SHOW NAV
		var imgCount = $(".show_images li").length;
		// console.log( 873, imgCount );
		if ( imgCount > 1 ) {
			$(".show_images_nav").show();
		} 		
	}

	function showImgsBack ( click ) {
		console.log("showImgsBack");	
		var images = click.parents(".show_images_nav").prev(".show_images");
		if ( images.find(".visible").prev().length ) {
			// MOVE TO PREVIOUS SLIDE
			images.find(".visible").removeClass("visible").prev().addClass("visible");
		} else {
			// GO TO END
			images.find(".visible").removeClass("visible");
			images.find("li:last-child").addClass("visible");
		}
	}

	function showImgsForward ( click ) {
		console.log("showImgsForward");	
		var images = click.parents(".show_images_nav").prev(".show_images");
		if ( images.find(".visible").next().length ) {
			// MOVE TO NEXT SLIDE
			images.find(".visible").removeClass("visible").next().addClass("visible");
		} else {
			// BACK TO BEGINNING
			images.find(".visible").removeClass("visible");
			images.find("li:first-child").addClass("visible");
		}
	}

	// 2.2.13. SHOW TOGGLE

	function showToggleOpen ( click ) {
		console.log("showToggleOpen");	
		var target = click.parents(".show_wrapper").find(".show_content");
		var contentsH = 0;
		// MODIFY HEIGHT
		target.children().each( function(){
			contentsH += $(this).outerHeight(true);
		});
		target.css( "height", contentsH ).addClass("clicked");
		// SCROLL TO TARGET
		scroller( click );
		// HIDE READ MORE BUTTON IN CLICKED SHOW
		click.parents(".show_wrapper").find(".show_toggle_text").css( "opacity", "0" );		
		// CHECK IF POST INCLUDES IMAGES
		var imgCount = click.parents(".show_wrapper").attr("data-count");
		if ( imgCount > 0 ) {
			// GET ID
			var showId = click.parents(".show_wrapper").attr("id");
			console.log( 1139, showId );
			wrapperShift( showId );
		}		
	}

	function showToggleClose ( click ) {
		console.log("showToggleClose");
		var target = click.parents(".show_wrapper").find(".show_content");
		target.css( "height", 0 ).removeClass("clicked");
		setTimeout( function(){
			// RESET READ MORE BUTTON + IMAGE LINK
			click.parents(".show_wrapper").find(".show_toggle_text").css( "opacity", "" );		
		}, 1000 );
		// SCROLL BACK TO TOP
		scroller( click );			
	}

	// 2.2.14

	function agendaCheck () {
		console.log("agendaCheck");
		$("#agenda .section_content").each( function(){
			// CHECK IF SHOW WRAPPERS
			var wrappers = $(this).find(".show_wrapper").length;
			// IF NO SHOWS HIDE HEADER
			if ( wrappers === 0 ) {
				$(this).prevAll().hide();
			}
		});
	}

	