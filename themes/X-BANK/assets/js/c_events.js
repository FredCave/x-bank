/*****************************************************************************
    
	3. EVENTS
		3.1. BACKGROUND EVENTS
			3.1.1. ON IMAGE CLICK
		3.2. RECEIPT EVENTS
			3.2.1. ADDRESS HIGHLIGHT ON HOVER
			3.2.2. MAIN VITRINE TOGGLE
			3.2.3. BACK TO TOP BUTTON
			3.2.4. CURRENT SHOW TOGGLE
			3.2.5. INDEX CLICK ON LETTER OR CATEGORY
			3.2.6. ARTIST INFO TOGGLE
			3.2.7. ARTIST VITRINE TOGGLE
			3.2.8. SEARCH TOGGLE
			3.2.9. SEARCH KEYUP
			3.2.10. JUSTIFY LINES
		3.3 WINDOW EVENTS
			3.3.1. WINDOW LOAD 
			3.3.2. WINDOW SCROLL
			3.3.3. RESIZE HANDLER
			3.3.4. ON HASH CHANGE

*****************************************************************************/

$( document ).ready(function() {

// 3.1. BACKGROUND EVENTS

	// 3.1.1. ON IMAGE CLICK

	$(".wrapper").on("click", "li.img", function(e){
		if ( e.target.tagName.toLowerCase() === "a" ) {		
			// IF SEE MORE LINK
			if ( e.target.className = "see_more" ) { 
				e.preventDefault(); // TMP
				var link = e.target.attributes["data-artist"].value;
				seeMore( link );
			} 
		} else {
			// normal pause / unpause function
			imagesClick( $(this) );		
		}
	});

	// IMG_INFO_FIXED HERE

	$("#img_info_fixed").on("click", ".see_more", function(){
		seeMore( $(this).attr("data-artist") );
	});


// 3.2. RECEIPT EVENTS

	// 3.2.1. ADDRESS HIGHLIGHT ON HOVER

	$("#r_address").hover( function(){
		$(this).find("p").addClass("highlight-right");
	}, function(){
		$(this).find("p").removeClass("highlight-right");
	});

	// 3.2.2. MAIN VITRINE TOGGLE

	$("a.main_vitrine").on("click", function(e){
		e.preventDefault();
		vitrineToggle ( $(this).attr("id") );
	});

	// 3.2.3. BACK TO TOP BUTTON

	$(".back_to_top a").on("click", function(e){
		e.preventDefault();
		// get offset of menu
		var menuOffset = $("#r_menu").offset().top;
		// scroll
		$("html,body").animate({
			scrollTop: menuOffset
		}, 500);
	});

	// 3.2.4. CURRENT SHOW TOGGLE

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
			following.css( "height", contentsH ).addClass("clicked");
			scroller( $(this) );		
		}
	});

	// 3.2.5. INDEX CLICK ON LETTER OR CATEGORY

	$(".index_menu a").on("click", function(e){
		e.preventDefault();
		filterIndex( $(this) );
	});

	// 3.2.6. ARTIST INFO TOGGLE

	$(".index_results").on("click", ".index_artist_title a", function(e){
		e.preventDefault();
		var target = $(this).parents(".index_artist_title").next(".index_artist_content");
		artistInfoToggle( target );
	});

	// 3.2.7. ARTIST VITRINE TOGGLE

	$(".index").on("click", ".artist_vitrine_toggle", function(e){
		e.preventDefault();
		// VITRINE OPEN / CLOSE FUNCTION
		vitrineToggle( $(this).attr("id") );
		
		// CHECK WHETHER ARTIST IS SELECTED, IN INDEX_BIS?? 
		
	});

	// 3.2.8. SEARCH TOGGLE

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

	// 3.2.9. SEARCH KEYUP

		// INITIATE HIDESEEK PLUGIN
	$('#search').hideseek({
		ignore_accents: true,
		hidden_mode: true
	}).on("_after", function() {
		// empty results wrapper
		var resultWrapper = $("#index .index_results");
		resultWrapper.empty();	

		//console.log( $('#search')[0].value, $('#search')[0].value.length );
		var noResults = $(".result").length;

		// if over 20 results && only one input character
		if ( $('#search')[0].value.length === 1 && noResults > 20 ) {
		} else {
			// loop through LIs — check if has class .result — see plugin file for modifications
			$(".sub_index li").each( function(){
				if ( $(this).hasClass("result") ) {
					$(this).clone().appendTo(resultWrapper).hide();
				}
			});
		}
		// animate wrapper height
		$(".sub_index").css("height", resultWrapper.height() );

	});

	// 3.2.10. JUSTIFY LINES

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

// 3.3 WINDOW EVENTS

	// 3.3.1. WINDOW LOAD 

	$(window).on("load", function(){
		removeHash();
		imagesInit();
		justify();	
	});

	// 3.3.2. WINDOW SCROLL

	$(window).on("scroll", function(){
		vitrineCloseOnScroll();
	});

	// 3.3.3. RESIZE HANDLER
	var first = true;
	var handleMediaChange = function (mql) {
		console.log("mql");
	    // Gives number of columns for image injection
	    if (mql.s.matches) {
	        // Less than 600px wide     
	        noCols(1, "current");
	        manageCols();
	        imagesAnim("current", first);
	    } else if (mql.m.matches) {
	        // More than 600px wide
			noCols(2, "current");
			manageCols();
			imagesAnim("current", first);
			// reset any image infos
			infoReset();		
	    } else {
	    	// More than 900px wide
			noCols(4, "current");
			justify();
			manageCols( 4 );
			imagesAnim("current", first); // need to check if first time
			// reset any image infos
			infoReset();
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

	// 3.3.4. ON HASH CHANGE

	$(window).hashchange( function(){
		urlDetect();
	});


});