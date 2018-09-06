<!DOCTYPE html>
<html >
<head>
  <!-- Site made with Mobirise Website Builder v4.8.1, https://mobirise.com -->
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="generator" content="Mobirise v4.8.1, mobirise.com">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
  <link rel="shortcut icon" href="assets/images/logo2.png" type="image/x-icon">
  <meta name="description" content="">
  <title>Solutions</title>
  <link rel="stylesheet" href="assets/web/assets/mobirise-icons/mobirise-icons.css">
  <link rel="stylesheet" href="assets/tether/tether.min.css">
  <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/bootstrap/css/bootstrap-grid.min.css">
  <link rel="stylesheet" href="assets/bootstrap/css/bootstrap-reboot.min.css">
  <link rel="stylesheet" href="assets/dropdown/css/style.css">
  <link rel="stylesheet" href="assets/theme/css/style.css">
  <link rel="stylesheet" href="assets/mobirise/css/mbr-additional.css" type="text/css">
  <script src="assets/web/assets/jquery/jquery.min.js"></script>
  <script src="assets/popper/popper.min.js"></script>
  <script src="assets/tether/tether.min.js"></script>
  <script src="assets/bootstrap/js/bootstrap.min.js"></script>
  <script src="assets/smoothscroll/smooth-scroll.js"></script>
  <script src="assets/dropdown/js/script.min.js"></script>
  <script src="assets/touchswipe/jquery.touch-swipe.min.js"></script>
  <script src="assets/theme/js/script.js"></script>
  <!--<script src="assets/formoid/formoid.min.js"></script>-->
  
  
</head>
<body>

<div id="menu"></div>
<script>$(function(){$('#menu').load('menu.html');});</script>

<section class="mbr-section form1 cid-qZdcVMoAah" id="form1-p"> 
    <div class="container">
        <div class="row justify-content-center">
            <div class="title col-12 col-lg-8">
                <h2 class="mbr-section-title align-center pb-3 mbr-fonts-style display-2">
                    Solutions
                </h2>
				<?php 
					$score=0;
					if ($_POST["Q1"]==3)
						$score=$score+1;
					if ($_POST["Q2"]==1)
						$score=$score+1;
					if ($_POST["Q3"]==2)
						$score=$score+1;
					if ($_POST["Q4"]==3)
						$score=$score+1;
					if ($_POST["Q5"]==1)
						$score=$score+1;
					if ($_POST["Q6"]==2)
						$score=$score+1;
					if ($_POST["Q7"]==3)
						$score=$score+1;
					if ($_POST["Q8"]==1)
						$score=$score+1;
					if ($_POST["Q9"]==1)
						$score=$score+1;
					if ($_POST["Q10"]==2)
						$score=$score+1;
					if ($_POST["Q11"]==2)
						$score=$score+1;
					if ($_POST["Q12"]==3)
						$score=$score+1;
					if ($_POST["Q13"]==2)
						$score=$score+1;
					if ($_POST["Q14"]==1)
						$score=$score+1;
					if ($_POST["Q15"]==3)
						$score=$score+1;
					if ($_POST["Q16"]==2)
						$score=$score+1;
					if ($_POST["Q17"]==3)
						$score=$score+1;
					if ($_POST["Q18"]==2)
						$score=$score+1;
					if ($_POST["Q19"]==1)
						$score=$score+1;
					if ($_POST["Q20"]==3)
						$score=$score+1;
					if ($score<18)
						echo "<h3 class='mbr-section-subtitle align-center mbr-light pb-3 mbr-fonts-style display-7'>We are sorry, but you can not unlock solutions. Keep trying...</h3>"; 
					else 
						echo "<h3 class='mbr-section-subtitle align-center mbr-light pb-3 mbr-fonts-style display-7'>Congrats! You have unlocked the solutions for all exercises</h3><script>localStorage.setItem('solutions','true');</script>";
				?>
            </div>
        </div>
    </div>
</section>

<div id="footer"></div>
<script>$(function(){$('#footer').load('footer.html');});</script>

</body>
</html>