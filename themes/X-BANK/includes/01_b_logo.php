<?php $the_query = new WP_Query( array("name" => "info") );
	if ( $the_query->have_posts() ) :
		while ( $the_query->have_posts() ) : $the_query->the_post(); ?>

		<div id="r_address">
			<a target="_blank" href="https://www.google.fr/maps/place/Spuistraat+172,+1012+VT+Amsterdam,+Netherlands/@52.3726029,4.8870131,17z/data=!3m1!4b1!4m2!3m1!1s0x47c609c6a90ef831:0xb39838ed6e795376">			
				<?php 
				$string = get_field("info_address"); 
				echo str_replace(' ', '*', $string);
				?>
			</a>
		</div>


<?php endwhile;
endif; ?>