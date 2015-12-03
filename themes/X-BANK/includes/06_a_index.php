<ul id="sub_index">

	<div id="index_results"></div>
	
	<?php
	$args = array(
		"post_type" => "index",
		"posts_per_page" => -1,
		"orderby" => name
	);
	$index_query = new WP_Query( $args );
	if ( $index_query->have_posts() ) :
		while ( $index_query->have_posts() ): $index_query->the_post(); ?>
			<?php 
			$initial = get_the_title();
			?>
			<li class="index_artist <?php echo print_categories(); ?>" data-initial="<?php echo $initial[0]; ?>">
				
				<!-- TITLE, VISIBLE IN LIST -->
				<span class="index_artist_title"><a href=""><?php the_title(); ?></a></span>

				<!-- REST OF CONTENT, VISIBLE WHEN EXPANDED -->
				<div class="index_artist_content">
					<!-- ARTIST IMAGE -->
					<?php the_field("index_artist_bio"); ?>
				</div>

			</li>

		<?php	
		endwhile;
	endif;
	wp_reset_postdata;
?>
</ul><!-- END OF #SUB_INDEX -->

