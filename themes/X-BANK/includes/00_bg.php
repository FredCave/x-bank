<?php

/* IMAGE WRAPPER OBJECT FUNCTION */

function bg_wrapper ( $img, $a_obj ) { 
	// $A_OBJ = RELATIONSHIP POST ID
	$a_declared = false;
	if ( $a_obj ) {
		$a_declared = true; 
		$a_name = get_the_title( $a_obj[0] );
		// OVERRIDE $POST
		global $post;
		$post = get_post( $a_obj[0] );
		$a_slug = $post->post_name;
		// RESET $POST
		wp_reset_postdata();
	}

	?>

	<?php if ( $a_declared ) : ?>
		<span class="img_info_top img_info">
			<!-- LINK TO INDEX SECTION / LINK TO WEBSHOP -->	
			<a class="see_more" href="#index" data-artist="<?php echo $a_slug; ?>">See More</a> <!--/ <a href="">Buy it</a>-->
		</span>
	<?php else: ?>
		<span class="img_info_blank"></span>
	<?php endif; ?>

	<?php x_image_object( $img, True ); ?>

	<!-- IF NAME DECLARED -->
	<?php if ( $a_declared ) : ?>
		<span class="img_info_bottom img_info">
			<ul class="img_info_icons">

				<!-- FACEBOOK -->
				<li>
					<a target="_blank" href="<?php echo createFBUrl ( $img, $a_name ); ?>">
						<img src="<?php bloginfo('template_url'); ?>/img/icon_facebook.png" alt="Facebook icon" />
					</a>
				</li>
				<!-- TWITTER -->
				<li>
					<a class="twitter-share-button" 
						target="_blank" 
						data-url="<?php echo createTwitterUrl ( $img, $a_name )[1]; ?>" 
						href="<?php echo createTwitterUrl ( $img, $a_name )[2]; ?>">
						<img src="<?php bloginfo('template_url'); ?>/img/icon_twitter.png" alt="Twitter icon" />
					</a>
				</li>
			</ul>
		</span>
	<?php else: ?>
		<span class="img_info_blank"></span>
	<?php endif; ?>

<?php
} // END OF BG_WRAPPER_OBJECT FUNCTION

/* DEFAULT RANDOM IMAGE FUNCTION */

function x_images ( $noPosts ) {

	// DEACTIVATED !! NOT FULLY WORKING !!!!

	// Loop through number of index posts corresponding to $noPosts
	$args = array(
		"post_type" => "index",
		"posts_per_page" => $noPosts,
		"orderby" => "rand"
	);
	$the_query = new WP_Query( $args );
	if ( $the_query->have_posts() ) :
			
		echo "<ul id='init' class='img_loop'>";
		while ( $the_query->have_posts() ): $the_query->the_post(); 

			$imgName = get_the_title();
			global $post;
    		$post_slug = $post->post_name;
    		echo $post_slug . ", ";
			
			if ( have_rows("index_images") ) :
				echo "yes"; /*			
				// GET FIRST ROW
				$i = 0;
				while ( have_rows("index_images") ) : the_row(); 
					if ( $i === 0 ) { ?>				
						<li id="<?php echo $imgName; ?>" class="img">						
							<?php 
							// GET DATA
							$image = get_sub_field('index_image'); 
							// IMAGE OBJECT
							if( !empty($image) ): 
								bg_wrapper( $image, false );
							endif; 
							?>
						</li> 			
					<?php 
					}
				$i++;
				endwhile;
				*/

			endif; // end of image rows loop

		endwhile;
		echo "</ul>";
		wp_reset_postdata();
		
	endif;
}

function encodeURIComponent( $str ) {
    $revert = array('%21'=>'!', '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')');
    return strtr(rawurlencode($str), $revert);
}

function createFBUrl ( $_image, $_name ) {
	if ( $_name !== "" ) {
		$_text = encodeURIComponent( $_name . " at xbank.amsterdam" );
	} else {
		$_text = "xbank.amsterdam";
	}	
	$fb_url = "http://www.facebook.com/dialog/feed?app_id=" . 1196911897000591 .
		"&link=" . "http://xbank.amsterdam" .
		"&picture=" . $_image["url"] .
		"&name=" . $_text . 
		"&caption=xbank.amsterdam" . 
		"&redirect_uri=" . get_bloginfo( "url" ) . "/popupclose.html" . 
		"&display=popup"; 
	return $fb_url; 
}

function createTwitterUrl ( $_image, $_name ) {
	$twitter_url = [];
	if ( $_name !== "" ) {
		$_text = $_name . " at xbank.amsterdam";
	} else {
		$_text = "xbank.amsterdam";
	}	
	// $_url = encodeURIComponent ( "http://xbank.amsterdam?artist=" . $_name . "&image=" . $_image["url"] );
	$_url = encodeURIComponent ( "http://xbank.amsterdam" );
	$twitter_url[1] = $_url;
	$twitter_url[2] = "https://twitter.com/share" . 
		"?text=" . $_text . 
		"&hashtags=XBank, Amsterdam, " . str_replace( " ", "", $_name );		
	return $twitter_url;  
}

?>

<!-- IMAGES LOADED HERE, SEPARATE FROM WRAPPERS -->
<ul id="load_wrapper" class="hide">
	<!-- INITIAL CONTENT -->
	<li id="init_container" class="container" data-cols="4">
		<!-- IMAGES INITIALLY LOADED HERE AS UNSTYLED UL, ALL FURTHER HTML DONE IN JQUERY -->
		<!-- FIRST LOOP THROUGH CURATED BG IMAGE POST -->
		<?php
		$wp_query = new WP_Query("name=background-images");
		if ( $wp_query->have_posts() ) :
			$i = 0;
			while ( $wp_query->have_posts() ) : $wp_query->the_post();
				// If activate field is checked
				/* TEMP DEACTIVATED – SEE BELOW
				if( get_field('bg_activate') ) {	
				*/	
				if ( have_rows("bg_column_images") ) :
					// While corresponds to columns
					while ( have_rows("bg_column_images") ) : the_row();
													
						echo "<ul class='column_view'>";

							if ( have_rows("bg_column") ) :
								
								while ( have_rows("bg_column") ) : the_row(); ?>

									<li class="img">

										<?php 
										// GET DATA
										$image = get_sub_field("bg_column_image");
										$artist_obj = get_sub_field("bg_column_name");
										
										// IMAGE OBJECT
										if( !empty($image) ): 
											bg_wrapper( $image, $artist_obj );
										endif; 
										?>

									</li>
								<?php
								endwhile;
							endif;

						echo "</ul>";
						
					endwhile;
				endif;
					
				// If activate field is unchecked
				/* 
				} else {						
					
					// IF DEACTIVATED USE DEFAULT RANDOM IMAGE FUNCTION
					// TEMPORARILY DEACTIVATED AS NOT SURE ALL INDEX POSTS HAVE IMAGES
					// NECESSARY TO KEEP ??
					x_images( 16 );
				}
				*/ 
				$i++;
			endwhile;
			wp_reset_postdata();
		endif;
		?>
		</div>

	</li>
	<!-- ADDITIONAL POSTS APPENDED HERE -->
</ul>

<!-- COLUMN 1 -->
<div id="wrapper_1" class="wrapper current" data-current="init">
	<div class="movable_wrapper up col_1">
		<ul class='img_loop'></ul><ul class='img_loop'></ul>
	</div>
	<div class="movable_wrapper down col_2">
		<ul class='img_loop'></ul><ul class='img_loop'></ul>
	</div>
	<div class="movable_wrapper up col_3">
		<ul class='img_loop'></ul><ul class='img_loop'></ul>
	</div>
	<div class="movable_wrapper down col_4">
		<ul class='img_loop'></ul><ul class='img_loop'></ul>
	</div>
</div>

<!-- COLUMN 2 -->
<div id="wrapper_2" class="wrapper toLoad" data-current="">
	<div class="movable_wrapper up col_1">
		<ul class='img_loop'></ul><ul class='img_loop'></ul>
	</div>
	<div class="movable_wrapper down col_2">
		<ul class='img_loop'></ul><ul class='img_loop'></ul>
	</div>
	<div class="movable_wrapper up col_3">
		<ul class='img_loop'></ul><ul class='img_loop'></ul>
	</div>
	<div class="movable_wrapper down col_4">
		<ul class='img_loop'></ul><ul class='img_loop'></ul>
	</div>
</div>

<!-- IMAGE INFO BLOCK FOR SMALL SCREENS -->
<div id="img_info_fixed">

</div>
