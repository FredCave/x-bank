<section id="index" class="index" data-cat="">

	<!-- SECTION HEADER -->

	<?php addBreak(); ?>
	<div class="section_head"><!-- ID HERE IS TEMPORARY -->
		<h1>Index</h1>
		<div class="back_to_top"><a href=""><img src="<?php bloginfo('template_url'); ?>/img/up_arrow.png" alt="Back to top" /></a></div>
	</div>
	<?php addBreak(); ?>

	<div class="section_content">

		<!--<p class="index_menu"><a href="">Previous Shows</a></p>-->

		<!-- CATEGORIES -->

		<ul id="index_categories" class="">
			<li><a href="">Fashion</a></li>
			<li><a href="">Art</a></li>
			<li><a href="">Design</a></li>
			<div class="clear"></div>
		</ul>

		<!-- SUB-CATEGORIES -->
		<div id="sub_cat_wrapper" class="">
			<ul id="fashion_sub_cat" class="sub_cat">
				<?php 
				$args = array(
					'child_of'		=> 4,
					'order'			=> "DESC",
					'hide_empty'	=> 1
				);
				$categories = get_categories( $args );
				$len = count( $categories );
				$loop = 1;
				echo "<span>";
				foreach($categories as $category) { 		
					echo "<li><a href=''>". $category->name ."</a></li>";
					if ( $loop === 3 ) {
						echo "</span><span>";
						$loop = 0;
					}
					$loop++;
				}
				echo "</span>";
				?>
				<div class="clear"></div>
			</ul>		

			<ul id="design_sub_cat" class="sub_cat">
				<?php 
				$args = array(
					'child_of'		=> 3,
					'order'			=> "DESC",
					'hide_empty'	=> 1
				);
				$categories = get_categories( $args );
				$len = count( $categories );
				$loop = 1;
				echo "<span>";
				foreach($categories as $category) { 		
					echo "<li><a href=''>". $category->name ."</a></li>";
					if ( $loop === 3 ) {
						echo "</span><span>";
						$loop = 0;
					}
					$loop++;
				}
				echo "</span>";
				?>
				<!--
				<span>
					<li><a href="">Books</a></li>
					<li><a href="">Chinaware</a></li>
					<li><a href="">Accessories</a></li>
				</span>
				<span>
					<li><a href="">Food & Drinks</a></li>
					<li><a href="">Interior</a></li>
					<li><a href="">Objects</a></li>
				</span>
				-->
				<div class="clear"></div>
			</ul>
		</div>	

		<!-- SEARCH -->
		<p id="index_search" class="index_menu">
			<!-- SEARCH TOGGLE BUTTON -->
			<!-- <a href="">Search</a> -->
			<!-- SEARCH FIELD -->
			<input id="search" class="" name="search" placeholder="Search" type="text" data-list=".sub_index">
		</p>

		<!-- DIVs WITH CONTENT -->
		
		<?php include("04_a_index.php"); ?>
				
		<!-- INDEX NAVIGATION -->
		<div id="index_nav"></div>

	</div>

</section>

<!-- HOLE GOES HERE -->

<div id="artist_vitrine" class="r_hole">
	<div class="r_hole_l"></div>
	<div class="r_hole_inset"></div>
	<div class="r_hole_r"></div>
</div>

<section id="index_bis" class="index">

	<div class="section_content">
		<!-- APPENDED GOES HERE -->
	</div>

	<ul class="index_results" data-block="">
		<!-- APPENDED RESULTS GO HERE -->
	</ul>

</section>