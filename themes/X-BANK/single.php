<!-- AJAX LOADED CONTENT / JUST IMAGES (+ OPTIONS MENU ) -->
<ul class="img_loop">
	<?php 

	/*
		IMAGE OPTIONS:
		ARTIST NAME
		TITLE??
		WEBSHOP LINK (TO ARTIST)	
			OR OPTIONAL EXTERNAL LINK
		SOCIAL MEDIA SHARE
	*/

	if( have_rows('index_images') ):
	    while ( have_rows('index_images') ) : the_row(); ?>
			<!-- FUNCTION EXPORTS JUST IMG TAGS -->
        	<li>
	        	<?php 
		        	$image = get_sub_field('index_image');
		        	$img_id = $image["id"];
		        	x_image_object( $img_id );
		        ?>
		    </li>
	    <?php
	    endwhile;
	endif;
	?>
</ul>