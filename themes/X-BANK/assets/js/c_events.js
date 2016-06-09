/*****************************************************************************
    
	3. EVENTS
		3.1. BACKGROUND EVENTS
			3.1.1. 	ON IMAGE CLICK
		3.2. RECEIPT EVENTS
			3.2.1. 	ADDRESS HIGHLIGHT ON HOVER
			3.2.2. 	MAIN VITRINE TOGGLE
			3.2.3. 	BACK TO TOP BUTTON
			3.2.4. 	CURRENT SHOW TOGGLE
			3.2.5. 	MENU CATEGORY CLICK
			3.2.6. 	INDEX CLICK ON LETTER OR CATEGORY
			3.2.	INDEX PAGINATION NAV
			3.2.7. 	ARTIST INFO TOGGLE
			3.2.8. 	ARTIST VITRINE TOGGLE
			3.2.9. 	SEARCH TOGGLE
			3.2.10. SEARCH KEYUP
			3.2.11. JUSTIFY LINES
			3.2.12. GOOGLE MAP TOGGLE
			3.2.13. SHOW IMAGES CLICK
		3.3 WINDOW EVENTS
			3.3.1. 	WINDOW LOAD 
			3.3.2. 	WINDOW SCROLL
			3.3.3. 	RESIZE HANDLER
			3.3.4. 	ON HASH CHANGE

*****************************************************************************/

$( document ).ready(function() {

// 3.1. BACKGROUND EVENTS

	// 3.1.1. ON IMAGE CLICK

	$(".wrapper").on("click", ".bg_image", function(e){
		// console.log( 35, e.target );
		e.preventDefault();		
		// PAUSE / UNPAUSE FUNCTION
		imagesClick( $(this).parents("li") );		
	});

		// ON LINK CLICK

	// $(".wrapper").on("click", ".img_info_icons a", function(e){
	// 	// console.log( 55, e.target );
	// 	// e.preventDefault();
	// });		
	
	// SEE MORE

	$(".wrapper").on("click", ".see_more", function(e){
		seeMore( $(this).attr("data-artist") );
	});	

		// IMG_INFO_FIXED HERE

	$("#img_info_fixed").on("click", ".see_more", function(){
		seeMore( $(this).attr("data-artist") );
	});


// 3.2. RECEIPT EVENTS

	// 3.2.1. ADDRESS HIGHLIGHT ON HOVER

	$("#r_address a").hover( function(){
		$(this).find("p").addClass("highlight-centre");
	}, function(){
		$(this).find("p").removeClass("highlight-centre");
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
		var menuOffset = $("#r_menu").offset().top - 80;
		// scroll
		$("html,body").animate({
			scrollTop: menuOffset
		}, 500);
	});

	// 3.2.4. CURRENT SHOW TOGGLE

	$(".show_toggle").on( "click", function(e){
		e.preventDefault();
		var following = $(this).next(".show_content");
		if ( following.hasClass("clicked") ) {
			// CLOSE
			showToggleClose( $(this) );
		} else {
			// OPEN
			showToggleOpen( $(this) );	
		}
	});

		// READ LESS

	$(".show_toggle_text_close").on( "click", function(){
		showToggleClose( $(this) );
	});

	// 3.2.5. MENU CATEGORY CLICK

	$(".show_artist_link").on( "click", function(e){
		e.preventDefault();
		var thisSlug = $(this).data("artist");
		// console.log( 105, thisSlug );
		seeMore( thisSlug );
	});

	// 3.2.6. INDEX CLICK ON LETTER / CATEGORY

		// MENU TOP OF RECEIPT
	$(".menu_index").on("click", function (e) {
		e.preventDefault();
		var thisText = "x_" + $(this).text().toLowerCase();
		catClick( thisText );
		filterIndex( $(this) );
	});

	$("#index_categories a").on("click", function (e) {
		e.preventDefault();
		var thisText = "x_" + $(this).text().toLowerCase();
		catClick( thisText );
		filterIndex( $(this) );
	});	

		// SUB CATS
	$(".sub_cat a").on("click", function (e) {
		e.preventDefault();
		var thisText = "x_" + $(this).text().toLowerCase();
		catClick( thisText );
		filterIndex( $(this) );
	});	

	// 3.2.X. INDEX PAGINATION NAV

	$("#index_nav").on("click", ".index_nav", function (e) {
		e.preventDefault();	
		paginationNav( $(this) );
	});

	// 3.2.7. ARTIST INFO TOGGLE

	$(".index_results").on("click", ".index_artist_title a", function(e){
		e.preventDefault();
		if ( !$(this).hasClass("index_disabled") ) {
			var target = $(this).parents(".index_artist_title").next(".index_artist_content");
			artistInfoToggle( target );
		} 	
	});

	// 3.2.8. ARTIST VITRINE TOGGLE

	$(".index").on("click", ".artist_vitrine_toggle", function(e){
		e.preventDefault();
		wrapperShift( $(this).attr("data-id") );

		// VITRINE OPEN / CLOSE FUNCTION
		// vitrineToggle( $(this).attr("data-id") );
		
		// CHECK WHETHER ARTIST IS SELECTED, IN INDEX_BIS?? 
		
	});

	// 3.2.9. SEARCH TOGGLE

		// SHOW
	// $("#index_search a").on("click", function(){
	// 	$(this).hide().next().show();
	// });
	// 	// HIDE
	// $(document).click(function(e) { 
	//     if ( !$(e.target).closest("#index_search").length ) {
	//         $("#index_search input").hide().prev().show();
	//         // REMOVE UNDERLINE
	//         $(".index_menu a").css("border-bottom","");
	//     }        
	// });

	// 3.2.10. SEARCH KEYUP

		// INITIATE HIDESEEK PLUGIN

	$('#search').hideseek({
		ignore_accents: true,
		hidden_mode: false
	}).on("_after", function() {
		// EMPTY RESULTS WRAPPER
		var resultWrapper = $("#index .index_results");
		resultWrapper.empty();	
		// CURRENT CAT
		var thisCat = $("#index").attr("data-cat");
		if ( $("#index").attr("data-cat").length ) {
			$(".sub_index li").each( function(){
				if ( $(this).hasClass("hideseek_result") && $(this).hasClass( thisCat ) ) {
					// $(this).clone().appendTo(resultWrapper).hide();
					$(this).clone().appendTo(resultWrapper);
				}
			});	

			// RUN PAGINATION FILTER
			paginationFilter();		

		} else {
			resultWrapper.text("Please select a category.");
		}

		// ANIMATE WRAPPER HEIGHT
		console.log( resultWrapper.height() );
		$(".sub_index").css("height", resultWrapper.height() );

	});

	// 3.2.11. JUSTIFY LINES

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

	// 3.2.12. GOOGLE MAP TOGGLE

	$("#r_address_map_toggle").on( "click", function (e) {
		e.preventDefault();
		$(this).hide().next("#r_address_map").css("height","300px");
	});

	// 3.2.13. SHOW IMAGES CLICK

	$(".show_images_nav_left").on( "click", function(e) {
		e.preventDefault();
		showImgsBack( $(this) );
	});	

	$(".show_images_nav_right").on( "click", function(e) {
		e.preventDefault();
		showImgsForward( $(this) );
	});	

// 3.3 WINDOW EVENTS

	// 3.3.1. WINDOW LOAD 

	$(window).on("load", function(){
		removeHash();
		imagesInit();
		justify();
		// RUN FILTER WITH FASHION AS DEFAULT
		filterInit();
		// SHOW IMAGES INIT
		showImgsInit();	
	});

	// 3.3.2. WINDOW SCROLL THROTTLED

	$(window).on('scroll', _.throttle(function() {
		vitrineManageScroll( $(window).scrollTop() );
	}, 500 ));

		// STOP SCROLL ANIMATIONS ON MANUAL SCROLL

	var page = $("html, body");

	page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
       page.stop();
	});

	// 3.3.3. RESIZE HANDLER
	
	$(window).on( "resize", function(){
		// SHOW IMAGES INIT
		showImgsInit();	
	});

	var first = true;
	var handleMediaChange = function (mql) {
		console.log("mql");
	    // Gives number of columns for image injection
	    if ( mql.s.matches ) {
	        // Less than 600px wide     
	        noCols(1, "current");
	        manageCols();
	        imagesAnim("current", first);
	    } else if ( mql.m.matches ) {
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