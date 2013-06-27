/**
 *
 * jQuery Full-width Slider v1.0
 *
 *
 * under the MIT (http://www.opensource.org/licenses/mit-license.php) License.
 *
 * Copyright 2011 Toro_Unit(www.torounit.com) All rights reserved.
 *
 *
 */

(function($){
	$.fn.fullWidthSlider = function(options){

		//Default
		var defaults = {
			width:	960,
			height:	400,
			time:	5000,
			slideStage:	".stage",
			slideMember:"li",
			slideNavi:	".slideNavi",
			nav:true,
			mouseoverStop:true
		}
		var config = $.extend(defaults, options);
		
		$(this).css({overflow:"hidden",width:"100%",position:"relative",height:config.height});
		
		//現在の表示
		var current = 1;
	
		//DOM要素の取得
		$self = $(this);
		if($self.find(config.slideStage).length){
			$slideBox = $self.find(config.slideStage);
		}else{
			$slideBox = $self;
		}

		$slideNav = $self.find(config.slideStage);

	
		//見切れないように要素のコピー
		$slideList = $self.find(config.slideMember);
		$booby = $self.find(config.slideMember).length-2;

		$slideList.filter(":last").clone().prependTo($slideBox);
		$slideList.filter(":eq("+$booby+")").clone().prependTo($slideBox);
		$slideList.filter(":first").clone().appendTo($slideBox);		
		$slideList.filter(":eq(1)").clone().appendTo($slideBox);		

		//増えたので再取得
		$slideList = $self.find(config.slideMember);


		var windowWidth = $(window).width();
		$(window).resize(function(){
			windowWidth = $(window).width();
			$slideBox.css({marginLeft:config.width*(-current-1.5)+windowWidth*0.5});
		});

		//入れ物のCSS
		$slideBox.css({
			width:$slideList.length*config.width,
			height:config.height,
			overflow:"hidden",
			marginLeft:config.width*(-2.5)+windowWidth*0.5
		});
		
		//中身の方
		$slideList.css({
			width:config.width,
			height:config.height,
			float:"left"
		});
		
		
		//アニメーション
		var slide = function(target){

				if(target >= $slideList.length-3){
					target = 1;
					$slideBox.css({marginLeft:config.width*(-1.5)+windowWidth*0.5});
					
				}
				if(target < 1){
					target = $slideList.length-4;
					$slideBox.css({marginLeft:config.width*(-target-2.5)+windowWidth*0.5});
					
				}				
				$slideBox.stop().animate({marginLeft:config.width*(-target-1.5)+windowWidth*0.5});

				current = target;
		
		
		}

		
		//自動スクロール
		var timer;
		
		var setTimer = function(target){
			clearInterval(timer);
			timer = setInterval(function(){
				current += 1;
				slide(current);
			},config.time);
		}
		setTimer(current);
		





		
		if(config.nav){

			//sideNav
			$self.append('<a href="#" class="leftNav"></a>');
			$self.append('<a href="#" class="rightNav"></a>');
		
			$(".leftNav,.rightNav").css({
				display:"block",
				position:"absolute",
				width:config.width,
				height:config.height,
				top:0,
				zIndex:100
			}).click(function(){
				return false;
			});

			$(".leftNav").css({
				right:"50%",
				marginRight:config.width/2
			})

			$(".rightNav").css({
				left:"50%",
				marginLeft:config.width/2
			})


			$(".leftNav").click(function(){
				current = current-1;
				slide(current);
				setTimer(current);
			});

			$(".rightNav").click(function(){
				current = current+1;
				slide(current);
				setTimer(current);
			});
		
		
		}
		

		if(config.mouseoverStop){

			//スクロール停止
			$slideBox.mouseover(function(){
				clearInterval(timer);
			}).mouseout(function(){
				setTimer();
			});
		}
		
	
	}


})(jQuery);



