<!--

	MAKE INTO AJAX CALL ONCE THE REST HAS LOADED

-->	

<?php
	echo "<ul id='sub_index'>";

	// Create a range of letters
	$letters = range('A', 'Z');
	// Loop through letters
	foreach ( $letters as $letter ) {
		
		// Create individual LIs for each letter
		echo "<li id='";
		echo $letter;
		echo "'>";
		$i = 0;
		$args = array(
			"post_type" => "index",
			"posts_per_page" => -1,
			"orderby" => name
		);
		$index_query = new WP_Query( $args );
		if ( $index_query->have_posts() ) :
			while ( $index_query->have_posts() ): $index_query->the_post();
				
				$initial = get_the_title()[0];
				if ( $initial === $letter ) {
					echo "<div class='index_artist'>"; ?>
					<span><a href=""><?php the_title(); ?></a></span>

					<!-- LOAD THE REST OF THE CONTENT HERE ???? -->

					<div class="index_artist_content">
						A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.
						<div class="clear"></div>
					</div> 

					<?php echo "</div>";
					$i++;
				}
				
			endwhile;
		endif;
		wp_reset_postdata;

		if ( $i === 0 ) {
			echo "Sorry, nothing found.";
		}
		echo "</li>";
		$i = 0;
	}

	echo "</ul>";
?>