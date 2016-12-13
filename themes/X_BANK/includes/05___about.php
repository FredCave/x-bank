<?php
	function openingTimes () {
		if( have_rows('opening_times') ):
			$i = 0;
			while ( have_rows('opening_times') ) : the_row();		
				/* get day */
				switch ($i) {
				    case 0: $day = "Monday"; break;
				    case 1: $day = "Tuesday"; break;
				    case 2: $day = "Wednesday"; break;
				    case 3: $day = "Thursday"; break;
				    case 4: $day = "Friday"; break;
				    case 5: $day = "Saturday"; break;	
				    case 6: $day = "Sunday"; break;						       
				}
				$i++;				
				// times
				$times = get_sub_field('times');
				if ( !$times ) {
					$times = "Closed";
				}
				echo "<li>";
				// put into star function
				starFiller( 26, $day, $times );
				echo "</li>";
			endwhile;
		endif;			
	}
?>

<section id="about">
	
	<?php 
	$x_query = new WP_Query("name=info");
	if ( $x_query -> have_posts() ) :
		while ( $x_query -> have_posts() ) : $x_query->the_post(); ?>
			
			<!-- SECTION HEADER -->

			<?php addBreak(); ?>
			<div class="section_head">
				<h1>About</h1>
				<div class="back_to_top"><a href=""><img src="<?php bloginfo('template_url'); ?>/img/up_arrow.png" alt="Back to top" /></a></div>
			</div>
			<?php addBreak(); ?>

			<!-- SECTION CONTENT -->

			<div class="section_content">
				<!-- X BANK -->
				<?php if ( get_field("info_about") ) { ?>
					<h1>X Bank</h1>
					<div class="about_image">
						<?php 
						$img = get_field("info_about_image"); 
						x_image_object( $img );
						?>
					</div>
					<div class="about_text">
						<?php the_field("info_about"); ?>
					</div>
				<?php } ?>

				<!-- W AMSTERDAM -->
				<?php if ( get_field("info_w_amsterdam") ) { ?>
					<h1>W Amsterdam</h1>
					<div class="about_image">
						<?php 
						$img = get_field("info_w_amsterdam_image"); 
						x_image_object( $img );
						?>
					</div>
					<div class="about_text">
						<?php the_field("info_w_amsterdam"); ?>
					</div>
				<?php } ?>

				<!-- THE VAULT -->
				<?php if ( get_field("info_vault_text") ) { ?>
					<h1 id="vault">The Vault</h1>
					<div class="about_image">
						<?php 
						$img = get_field("info_vault_image"); 
						x_image_object( $img );
						?>
					</div>
					<div class="about_text">
						<?php the_field("info_vault_text"); ?>
					</div>
					<div class="about_text">
						<?php the_field("info_vault_specs"); ?>
					</div>
					<div class="about_text">
						<?php the_field("info_vault_contact"); ?>
					</div>
				<?php } ?>

				<!--
				<h1 id="coin">The Coin</h1>
				<div class="about_text">
					Coming Soon
				</div>
				-->

				<?php
				$career_query = new WP_Query( "name=careers" );
				if ( $career_query->have_posts() ) :
					while ( $career_query->have_posts() ): $career_query->the_post(); 
						// CHECK IF LINKS
						$links = get_field( "career_links" );
						if ( $links[0]["career_link"] ) : ?>
							
							</div><!-- END OF .SECTION_CONTENT -->

							<?php addBreak(); ?>
							<div class="section_head">
								<h1 id="careers">Careers</h1>
								<div class="back_to_top"><a href=""><img src="<?php bloginfo('template_url'); ?>/img/up_arrow.png" alt="Back to top" /></a></div>
							</div>
							<?php addBreak(); ?>

							<div class="section_content">

							<div class="about_image career_image">
								<?php 
								$img = get_field("career_image"); 
								x_image_object( $img );
								?>
							</div>
							<div class="about_text">
								<?php the_field("career_text"); ?>
							</div>
							<ul class="about_links">
								<?php
								if( have_rows("career_links") ):
							    	while ( have_rows("career_links") ) : the_row();
							    		// CHECK IF FILE IS UPLOADED
							        	$link = get_sub_field( "career_link" ); 
										if ($link) :
							        		?>
											<li>
												<p>
													<a target="_blank" href="<?php echo $link['url']; ?>">
														<?php 
														$link_title = get_sub_field( "career_link_title" ); 
														// GET DATE
														$date = date_create( $link["date"] );
														if ( $link_title ) {
															echo $link_title . "<br>";
														} else {
															echo "Untitled";
														}
														?>
													</a>
												</p>
												<p><?php echo date_format($date,"d/m/Y"); ?></p>
											</li>
										<?php
										endif;
							    	endwhile;
								endif;
								?>
							</ul>
						<?php
						endif;
					endwhile;
				endif;
				?>
			
			</div><!-- END OF .SECTION_CONTENT -->

	<?php endwhile;
	endif;
	wp_reset_postdata(); 
	?> 
	
</section>