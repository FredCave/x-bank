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
					<div class="about_text">
						<?php the_field("info_about"); ?>
					</div>
				<?php } ?>

				<!-- W AMSTERDAM -->
				<?php if ( get_field("info_w_amsterdam") ) { ?>
					<h1>W Amsterdam</h1>
					<div class="about_text">
						<?php the_field("info_w_amsterdam"); ?>
					</div>
				<?php } ?>

				<!-- THE VAULT -->
				<?php if ( get_field("info_vault_text") ) { ?>
					<h1 id="vault">The Vault</h1>
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

				<h1 id="press">
					<span class="link">
						<a target="_blank" href="https://www.dropbox.com/sh/c6wsgz7u18juee2/AAAkKxLUgGHAapOjjnDTCsfUa?dl=0
">Press Area</a>
					</span>
				</h1>

				<!--
				<h1 id="vacancies">
					<span class="link">
						<a target="_blank" href="https://www.dropbox.com/sh/mvuxsofbc4la4jz/AAC83Z1zIaWOVEQ-5LrMXJdva?dl=0
">Vacancies</a>
					</span>
				</h1>
				-->
			
			</div>

	<?php endwhile;
	endif;
	wp_reset_postdata(); 
	?> 
	
</section>