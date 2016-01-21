<?php $the_query = new WP_Query( array("name" => "info") );
	if ( $the_query->have_posts() ) :
		while ( $the_query->have_posts() ) : $the_query->the_post(); ?>

		<div id="r_address">
			<?php 
			$string = get_field("info_address"); 
			echo str_replace(' ', '*', $string);
			?>
		</div>

<?php endwhile;
endif; ?>
