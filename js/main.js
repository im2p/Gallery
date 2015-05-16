/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {
//array pos 0
    "use strict";
    var $imgval, $arraysize, $precounter, $imgpath, $imgname, $currentimageheight, $currentimagewidth,
		$containeroffsettop, $containeroffsetleft, $hiddenheight, $unhiddenheight, $currentstate, $navheight,
		$mouseypercent, $mousexpercent, $dimensionsarray;
	
    $imgval = 0;
    $precounter = 0;
	
	function echo(x) { $('#testecho').html(x); }
	function echo2(x) { $('#testecho2').html(x); }
	function echo3(x) { $('#testecho3').html(x); }
	function echo4(x) { $('#testecho4').html(x); }
	function echo5(x) { $('#testecho5').html(x); }

	
//Set sizes of elements
	function resizeports() {
//Add height and width conditional classes to images based on size. Zoom function varies for (.bg100 .height100) and (.bg100 .width100)
		if (($dimensionsarray[$imgval][0]) < ($dimensionsarray[$imgval][1])) {
			$('.portimage').addClass('height100');
		}
		if (($dimensionsarray[$imgval][0]) > ($dimensionsarray[$imgval][1])) {
			$('.portimage').addClass('width100');
		}
	}
	
	function echotests() {
		$(document).bind('mousemove', function (e) {
			echo('Test');
			echo2('Width: ' + $currentimagewidth);
			echo3('Height: ' + $currentimageheight);
			echo4('X: ' + $mousexpercent);
			echo5('Y: ' + $mouseypercent);
		});
	}
	echotests();
	
	function updatecontainersizes() {
		$navheight = $('.linkscontainer').height() + $('.navtoggler').height();
		$containeroffsettop = $('.gallerycontainer').offset().top;
		$containeroffsetleft = $('.gallerycontainer').offset().left;
		$currentimageheight = $('.imagecontainer').height();
		$currentimagewidth = $('.imagecontainer').width();
	}
	$(document).load(function () {
		updatecontainersizes();
		resizeports();
	});
	
//zoom on click  
    $('.imagecontainer').click(function () {
		$('.portimage, .imagecontainer').toggleClass('bg100');
		$('.galimg').toggleClass('galimghidden');
		$('.portimage').toggleClass('galimghidden');
    });

///////////////////////NAV TOGGLE////////////////////////////
	$currentstate = 0;
	function togglenav() {
		$currentstate += 1;
		$('.linkscontainer').slideToggle('fast', function () {
			updatecontainersizes();
		});
		if ($currentstate % 2 !== 0) {
			$('.navtoggler').html('˄ Show ˄');
		} else {
			$('.navtoggler').html('˅ Hide ˅');
		}
	}
	
//Adjust sizes every time window is resized
	$(window).resize(function () {
		updatecontainersizes();
		resizeports();
	});
	
//////////////////SCROLL BG//////////////////////
	function updatebgpos(e) {
	
		updatecontainersizes();
		$mouseypercent = ((((e.pageY) - $containeroffsettop) / ($currentimageheight)) * 100);
		$mousexpercent = ((((e.pageX) - $containeroffsetleft) / ($currentimagewidth)) * 100);
		$('.width100').css({backgroundPosition: ($mousexpercent) + '% 0%' });
		$('.height100').css({backgroundPosition: ' 0% ' + ($mouseypercent) + '%' });
	
	}
	$('.imagecontainer').bind('mousemove', function (e) {
		updatebgpos(e);
	});
////////////////////////////////////////////////
	

//pull php array into JSON
    $.ajax({
        type: 'POST',
        url: 'ajax.php',
        dataType: 'json',
        cache: false,
        success: function ($filepath) {
                   
            $imgpath = $filepath.imgpath;
            $imgname = $filepath.imgtitle;
			$dimensionsarray = $filepath.dimensions;
            $arraysize = $imgpath.length;

//changeimage || APPEND LEFT AND RIGHT NEED UPDATING
		
			function changeappendleft() {  //EXPERIMENTAL
				$('.deleteme').removeClass('bg100');
				$('.deleteme').css('background-size', 'contain');
				$('.deleteme').animate({'background-position': '-150%'}, 1000, function () {
					$(this).remove();
				});
				$('.imagecontainer').append('<div class="portimage incomming"></div>');
				$('.incomming').css('background-image', 'url("' + $imgpath[$imgval] + '")');
				$('.incomming').css('background-position', '250%');
				$('.incomming').animate({'background-position': '50%'}, 1000);
				$('.incomming').addClass('deleteme');
				$('.incomming').removeClass('incomming');
                $('.imgname').html($imgname[$imgval]);
				updatecontainersizes();
				resizeports();
			}
			function changeappendright() {  //EXPERIMENTAL
				$('.deleteme').removeClass('bg100');
				$('.deleteme').css('background-size', 'contain');
				$('.deleteme').animate({'background-position': '250%'}, 1000, function () {
					$(this).remove();
				});
				$('.imagecontainer').append('<div class="portimage incomming"></div>');
				$('.incomming').css('background-image', 'url("' + $imgpath[$imgval] + '")');
				$('.incomming').css('background-position', '-150%');
				$('.incomming').animate({'background-position': '50%'}, 1000);
				$('.incomming').addClass('deleteme');
				$('.incomming').removeClass('incomming');
                $('.imgname').html($imgname[$imgval]);
				updatecontainersizes();
				resizeports();
			}
			
			function changeappendfade() {
				if ($('.imagecontainer').hasClass('bg100')) {
					$('.imagecontainer').append('<div class="portimage incommingfade bg100"><img src="' + $imgpath[$imgval] + '" class="galimg galimghidden"></div>');
					if (($dimensionsarray[$imgval][0]) < ($dimensionsarray[$imgval][1])) {
						$('.incommingfade').addClass('height100');
					}
					if (($dimensionsarray[$imgval][0]) > ($dimensionsarray[$imgval][1])) {
						$('.portimage').addClass('width100');
					}
				} else {
					$('.imagecontainer').append('<div class="portimage incommingfade galimghidden"><img src="' + $imgpath[$imgval] + '" class="galimg"></div>');
					
				}
				if ($('.incommingfade').hasClass('height100')) {
					$('.incommingfade').css('background-position', '50% ' + $mouseypercent + '%');
				}
				if ($('.incommingfade').hasClass('width100')) {
					$('.incommingfade').css('background-position', $mousexpercent + '% 50%');
				}
				$('.incommingfade').css('background-image', 'url("' + $imgpath[$imgval] + '")');
				$('.incommingfade').addClass('currentfade');
				$('.incommingfade').removeClass('incommingfade');
				$('.deleteme').fadeOut(500);
				$('.currentfade').fadeIn(300, function () {
					$('.deleteme').delay(150).queue(function (del) {
						$(this).remove();
					});
					$(this).addClass('deleteme');
					$(this).removeClass('currentfade');
				});
				
				$('.imgname').html($imgname[$imgval]);
				updatecontainersizes();
				resizeports();
				
			}
			
			function changeimage($type) {
				//Disable buttons and set labels
				$('#currently').html('Current image: ' + ($imgval + 1));    //change counter
                
                if (($imgval + 1) === $arraysize) { $('#next').attr('class', 'btndisabled'); }
                if (($imgval + 1) !== $arraysize) { $('#next').attr('class', ' '); }
                if (($imgval + 1) === 1) { $('#prev').attr('class', 'btndisabled'); }
                if (($imgval + 1) !== 1) { $('#prev').attr('class', ' '); }
                
				if ($type === 'appendright') { changeappendright(); }
				if ($type === 'appendleft') { changeappendleft(); }
				if ($type === 'appendfade') { changeappendfade(); }
                $('.navbtn').removeClass('bold');
                $('#' + $imgval).addClass('bold');
            }

            
//preload images, create links
            while ($precounter < $arraysize) {
                $('<img />').attr('src', $imgpath[$precounter]);
                $('#links').append('<a class="navbtn" id="' + $precounter + '">' + ($precounter + 1) + '</a>');
				
				$('.status').append('<img class="preload" id="' + $precounter + '" src="' + $filepath.thumbarray[$precounter] + '" >');
                $precounter += 1;
            }
            changeimage('appendfade');
//Number Selection Actions 
            $('.navbtn').click(function () {
                if ($imgval !== parseInt($(this).attr("id"), 10)) {
                    $imgval = parseInt($(this).attr("id"), 10);
                    changeimage('appendfade');
                }
            });
			
			$('.preload').click(function () {
                if ($imgval !== parseInt($(this).attr("id"), 10)) {
                    $imgval = parseInt($(this).attr("id"), 10);
                    changeimage('appendfade');
                }
            });
			
//Previous/Next
			function nextimage() {
				if (($imgval + 1) !== $arraysize) {
                    $imgval += 1;
                    changeimage('appendfade');
                }
			}
			
			function previmage() {
				if (($imgval + 1) !== 1) {
                    $imgval -= 1;
                    changeimage('appendfade');
                }
			}
			
			$('.navtoggler').click(function () { togglenav(); });
            $('#next').click(function () { nextimage(); });
            $('#prev').click(function () { previmage(); });

			
			$(document).keydown(function (e) {
				switch (e.which) {
				case 37: // left
					previmage();
					break;
				case 38: // up
					if ($currentstate % 2 !== 0) { togglenav(); }
					break;
				case 39: // right
					nextimage();
					break;
				case 40: // down
					if ($currentstate % 2 === 0) { togglenav(); }
					break;
				default:
					return;
				}
				e.preventDefault(); // prevent the default action (scroll / move caret)
			});
            
 //Total number of images in array and add current image to counter           
            $('#arraysize').html($arraysize + ' Total images <br>');
        }
    });

});
   
