<<<<<<< HEAD
<ul id="r_menu">
	<span>
		<li><a class="menu_index" href="#index" id="index_fashion">Fashion</a></li>
		<li><a class="menu_index" href="#index" id="index_art">Art</a></li>
		<li><a class="menu_index" href="#index" id="index_design">Design</a></li>
	</span>
	<span>
		<li><a class="" href="#agenda">Agenda</a></li>
		<li><a class="" href="#about">About</a></li>
		<li><a class="" href="#vault">The Vault</a></li>
		<li><a class="" href="#contact">Contact</a></li>
	</span>
</ul>	
=======
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
			<!-- SOCIAL MEDIA LINKS -->

			<ul id="r_icons">
				<!-- FACEBOOK -->
				<li>
					<a target="_blank" href="https://www.facebook.com/X-BANK-893775603976100/">
						<img src="<?php bloginfo('template_url'); ?>/img/icon_facebook.svg" />
					</a>
				</li>
				<!-- INSTAGRAM -->
				<li>
					<a href="">
						<img src="<?php bloginfo('template_url'); ?>/img/icon_instagram.svg" />
					</a>
				</li>	
				<!-- TWITTER -->
				<li>
					<a href="">
						<img src="<?php bloginfo('template_url'); ?>/img/icon_twitter.svg" />
					</a>
				</li>
			</ul>

		</div>


<?php endwhile;
endif; ?>
>>>>>>> 3564134f44d211b0ea349ddc87cc1c90ab000e7d
