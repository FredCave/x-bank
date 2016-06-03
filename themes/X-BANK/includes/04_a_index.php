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
						<a data-id="toggle-<?php the_ID(); ?>" class="artist_vitrine_toggle" href="">
							<?php 
							if ( get_field ("index_artist_portrait") ) {
								// IMAGE OBJECT ???
							} else { ?>
								<!-- TEMP CONTENT -->
								<img src="<?php bloginfo('template_url'); ?>/img/tmp.jpg" />
							<?php
							}
							?>
						</a>
					</div>

					<h1><a data-id="toggle-<?php the_ID(); ?>" class="artist_vitrine_toggle" href=""><?php the_title(); ?></a></h1>

					<div class="index_artist_bio">
						<?php 
						if ( get_field ("index_artist_bio") ) {
							the_field("index_artist_bio");
						} else { ?>
							<!-- TEMP CONTENT -->
							A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks.
						<?php
						}
						?>
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

	<ul class="index_results" data-block="">
		<!-- RESULTS GO HERE -->
	</ul>

</ul><!-- END OF #SUB_INDEX -->

