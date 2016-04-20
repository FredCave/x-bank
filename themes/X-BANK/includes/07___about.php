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
				<h1>About X Bank</h1>
				<div class="back_to_top"><a href=""><img src="<?php bloginfo('template_url'); ?>/img/up_arrow.png" /></a></div>
			</div>
			<?php addBreak(); ?>

			<!-- SECTION CONTENT -->

			<div class="section_content">
				<div class="about_text">
					<?php the_field("info_about"); ?>
				</div>

				<h1 id="vault">The Vault</h1>
				<div class="about_text">
					<?php the_field("info_vault_text"); ?>
				</div>

				<!--
				<h1 id="coin">The Coin</h1>
				<div class="about_text">
					Coming Soon
				</div>
				-->

				<h1>Opening Times:</h1>

				<div class="about_opening asterisks">
					<?php openingTimes(); ?>
				</div>

				<div class="about_social_media">
					<!-- SOCIAL MEDIA LINKS HERE -->
				</div>		
			
			</div>

	<?php endwhile;
	endif;
	wp_reset_postdata(); 
	?> 
	
</section>
