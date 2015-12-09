<!-- AJAX LOADED CONTENT / JUST IMAGES -->
<ul class="img_loop">
	<?php 
	if( have_rows('index_images') ):
		$i = 0;
	    while ( have_rows('index_images') ) : the_row(); ?>
	        <li>
	        	<?php 
		        	$image = get_sub_field('index_image');
		        	$img_id = $image["id"];
		        	x_image_object( $img_id, $i );
		        ?>
		    </li>
	    <?php
	    $i++;
	    endwhile;
	endif;
	?>
</ul>