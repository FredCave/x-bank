<ul class="sub_index">

	<?php
	$args = array(
		"post_type" => "index",
		"posts_per_page" => -1,
		"orderby" => "name",
		"order" => "asc" 
	);
	$index_query = new WP_Query( $args );
	if ( $index_query->have_posts() ) :
		while ( $index_query->have_posts() ): $index_query->the_post(); ?>
			<?php 
			$initial = get_the_title();
			$slug = toAscii( get_the_title() );
			// get no. of cols defined in post
			if ( get_field("index_no_columns") ) {
				$noCols = get_field("index_no_columns");
			} else {
				$noCols = 2;
			} ?>
			
			<li id="<?php the_ID(); ?>" 
				class="index_artist <?php print_categories( get_the_ID() ); ?>" 
				data-initial="<?php echo $initial[0]; ?>" 
				data-slug="<?php echo $slug; ?>" 
				data-cols="<?php echo $noCols; ?>">
			
				<!-- TITLE, VISIBLE IN LIST -->
				<div class="index_artist_title asterisks">
					<a href="">
						<?php 
						$a = get_the_title();
						$b = "";
						echo "<p class='line_stretch'>";
						starFiller( 43, $a, $b );
						echo "</p>";
						?>
						<div class="clear"></div>
					</a>
				</div>

				<!-- REST OF CONTENT, VISIBLE WHEN EXPANDED -->
				<div class="index_artist_content">
					
					<div class="index_artist_image">
						<a id="toggle-<?php the_ID(); ?>" class="artist_vitrine_toggle" href=""><img src="<?php bloginfo( "template_url" ); ?>/img/BK.jpg" /></a>
					</div>

					<h1><a id="toggle-<?php the_ID(); ?>" class="artist_vitrine_toggle" href=""><?php the_title(); ?></a></h1>

					<div class="index_artist_bio">
						<?php the_field("index_artist_bio"); ?>
					</div>

					<div class="index_artist_shop_link">
						
					</div>

					<div class="clear"></div>
				</div>

			</li>

		<?php	
		endwhile;
	endif;
	wp_reset_postdata(); ?>

	<ul class="index_results">
		<!-- RESULTS GO HERE -->
	</ul>
	
</ul><!-- END OF #SUB_INDEX -->
