<section id="contact">

<!-- SECTION HEADER -->

<?php addBreak(); ?>
<div class="section_head">
	<h1>Contact</h1>
	<div class="back_to_top"><a href=""><img src="<?php bloginfo('template_url'); ?>/img/up_arrow.png" /></a></div>
</div>
<?php addBreak(); ?>

<!-- SECTION CONTENT -->

<div class="section_content">

	<?php $the_query = new WP_Query( array("name" => "info") );
		if ( $the_query->have_posts() ) :
			while ( $the_query->have_posts() ) : $the_query->the_post(); ?>

			<div id="r_address">
				
				<?php 
				$string = get_field("info_address"); 
				// echo str_replace(' ', '*', $string);
				echo $string;
				?>

				<a href="" id="r_address_map_toggle">
					See in Google Maps
				</a>

				<div id="r_address_map">
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.879613726372!2d4.887013115801996!3d52.3726028797866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609c6a90ef831%3A0xb39838ed6e795376!2sSpuistraat+172%2C+1012+VT+Amsterdam%2C+Netherlands!5e0!3m2!1sen!2sfr!4v1460102225108" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
				</div>

			</div>

			<!-- OPENING TIMES -->

			<?php 
			$x_query = new WP_Query("name=info");
			if ( $x_query -> have_posts() ) :
				while ( $x_query -> have_posts() ) : $x_query->the_post(); ?>

				<h1>Opening Times:</h1>

				<div class="about_opening asterisks">
					<?php openingTimes(); ?>
				</div>

			<?php endwhile;
			endif;
			wp_reset_postdata(); 
			?> 

			<!-- SOCIAL MEDIA LINKS -->

			<h1>FOLLOW US:</h1>

			<ul id="r_icons">
				<!-- FACEBOOK -->
				<li>
					<a target="_blank" href="https://www.facebook.com/X-BANK-893775603976100/">
						<img src="<?php bloginfo('template_url'); ?>/img/icon_facebook.svg" onerror="this.src='<?php bloginfo('template_url'); ?>/img/icon_facebook.png'" />
					</a>
				</li>
				<!-- INSTAGRAM -->
				<li>
					<a target="_blank" href="https://www.instagram.com/xbank.amsterdam/">
						<img src="<?php bloginfo('template_url'); ?>/img/icon_instagram.svg" onerror="this.src='<?php bloginfo('template_url'); ?>/img/icon_instagram.png'" />
					</a>
				</li>	
				<!-- TWITTER -->
				<li>
					<a target="_blank" href="https://twitter.com/xbank_amsterdam">
						<img src="<?php bloginfo('template_url'); ?>/img/icon_twitter.svg" onerror="this.src='<?php bloginfo('template_url'); ?>/img/icon_twitter.png'" />
					</a>
				</li>
			</ul>

	<?php endwhile;
	endif; ?>

</div>

</section>