




/*
     FILE ARCHIVED ON 0:12:40 Nov 16, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 18:28:55 Jun 28, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*******************************************************************************

	CSS on Sails Framework
	Title: Slimstown
	Author: XHTMLized.com
	Date: July 2012	

*******************************************************************************/
var tTimer = null;
var autoSliderActive = true;
var Site = {

	/**
	 * Init Function
	 */
	init: function() {
		$("body").removeClass("no-js");
		
		$("a[rel=colorbox]").colorbox();
		$("a[rel=colorbox-video]").colorbox({iframe:true, width:"560px", height:"415px"});
		
		this.sliderImagesLoading();
		this.sliderGames();
		this.filterGames();
		
		$('#navigation').find('.current-menu-item').html('<span>'+$('#navigation').find('.current-menu-item').find('a:first').text()+'</span>');
		if($('body.home').length && $('h1').find('a').length) $('h1').html($('h1').find('a').html());
		if($('body.home').length) {
			var tW = $('body').width() - 1024;
			$('.main-slider').find('a.prev, a.next').css({'width':tW/2+'px'});
		}
		
		if($('.game-details').length){
			$('.game-details li').each(function(){
				if($(this).find('span').text().length > 0) $(this).css({'display':'block'});
			});
			$('.app-cont').find('.app-links').each(function(){
				if($(this).attr('href').length < 2 || $(this).attr('href') == '#') $(this).hide();  
			});
		}
		
		if($('.bg_game_img').length) {
			var tg = $('.bg_game_img'),
				tgH = tg.height(),
				tgW = tg.width();
				
			if(!$.browser.ie && $('body').width() > 480 && $('body').width() <= 1024) {
				$('body').css({'-webkit-background-size':tgW+'px '+tgH+'px'});	
			}
		}
		
		window.onresize = function() {
  			var tg = $('.bg_game_img'),
			  	tgH = tg.height(),
				tgW = tg.width();
				
			if(!$.browser.ie && $('body').width() > 480 && $('body').width() <= 1024) {
		  		$('body').css({'-webkit-background-size':tgW+'px '+tgH+'px'});
		  	}
		};
		
		if (window.PIE) {
	        $('.game-listing li a, .three-boxes li.box, #filters li a:hover, #filters li.current_page_item a, .main-column .slider ul li a, .app-cont, .video-list li a, #content .content, .row input, .row label, .row textarea').each(function() {
	            PIE.attach(this);
	        });
        }
	},
	
	sliderImagesLoading:function(){
		if($('.main-slider').length) {
			var $this = this;
			
			$('.main-slider').find('li').each(function(){
				var tLi =$(this),
					tImgUrl = tLi.attr('data-bg'),
					tImg = '<img title="bg" alt="bg" class="attachment-post-thumbnail wp-post-image" src="'+tImgUrl+'" style="visibility: hidden;">';
				
				if(tLi.prev('li').length > 0) tLi.prepend(tImg);
				
				tLi.find('img').css({'visibility':'hidden'});
				tLi.css({'background':'url('+tImgUrl+') center 0 no-repeat'});
				
				for(i=1;i<=5;i++){
					setTimeout(function(){
						if(tLi.find('img').width() > 20){
							var tHref = tImgUrl,
								tImg = tLi.find('img'),
								tH = tImg.height(),
								tW = tImg.width();
								
							if(!tH || tH < 800) tH = 800;
							tLi.css({'min-height':tH+'px'});
							if(!$.browser.ie) tLi.parent().css({'-webkit-background-size':tW+'px '+tH+'px'});
						}
					},200*i);
				}
			});
			
			setTimeout(function(){
				if(typeof sliderType == 'undefined') sliderType = 1;
				if(typeof sliderType != 'undefined'){
				switch(sliderType){
						case 1:
							$this.sliderMainInit(1);
							break;
						case 2:
							$this.sliderMainInit(2);
							break;
						case 3: 
							$this.sliderMainInit(3);
							break;
						default:
							$this.sliderMainInit(1);
					}
				}
			},2000);
			
			
		}
	},
	
	sliderMainInit:function(type){
		if(type == 1) this.sliderMain();
		if(type == 2) this.sliderMainFade();
		if(type == 3) this.sliderMainAccross();
		this.sliderAutoInit();
	},
	
	sliderAutoInit:function(){
		var ms = $('.main-slider'),
			$this = this;
		
		if(autoSliderActive){
			tTimer = setTimeout(function(){
				ms.find('.next').click();
				autoSliderActive = true;
				$this.sliderAutoInit();
			},8000);
		}
	},
	
	sliderReInit:function(){
		clearTimeout(tTimer);
		autoSliderActive = false;
		Site.sliderAutoInit();
	},
	
	sliderMain: function() {
		if($('.main-slider').length){
			
			var ms = $('.main-slider'),
				sl = ms.find('.slider'),
				sw = ms.find('.slider-switcher');
			
			//ms.find('.prev').hide();
			
			//if(sl.find('li').length > 0) ms.find('.next').show();
			//else ms.find('.next').hide();
			
			sl.css({'position':'relative','left':'0'});
			
			ms.find('.prev, .next').unbind().bind('click',function(e){
				e.preventDefault();
				
				Site.sliderReInit();
				
				if(!$('body').hasClass('animated')){
					$('body').addClass('animated');
					var no = ms.find('.slider').find('.active').prevAll().length;
					
					if($(this).hasClass('prev')){
						sl.prepend(sl.find('li:last')).css({'left':'-100%'});
						sl.animate({'left':'0%'},1000,function(){
							$('body').removeClass('animated');
							sl.find('.active').removeClass('active');
							sl.find('li:first').addClass('active');
							
							sw.find('.active').removeClass('active');
							sw.find('li').find('a[data-rel='+sl.find('.active').attr('data-rel')+']').addClass('active');
						});
					} else {
					
						sl.animate({'left':'-100%'},1000,function(){
							$('body').removeClass('animated');
							sl.css({'left':'0%'}).append(sl.find('li:first'));
							
							sl.find('.active').removeClass('active');
							sl.find('li:first').addClass('active');
							
							sw.find('.active').removeClass('active');
							sw.find('li').find('a[data-rel='+sl.find('.active').attr('data-rel')+']').addClass('active');
						});
					
					}
					
					/*
					if(no >= 0){
						if($(this).hasClass('prev')) no = no - 1;
						else no = (no + 1);
						
						nm = no*100;
						
						sl.animate({'left':'-'+nm+'%'},1000,function(){
							$('body').removeClass('animated');
							sl.find('.active').removeClass('active');
							sl.find('li').eq(no).addClass('active');
						});
						
						if(no+1 == sl.find('li').length){
							ms.find('.next').hide();
						} else ms.find('.next').show();
						
						if(no == 0) ms.find('.prev').hide();
						else ms.find('.prev').show();
						
						sw.find('.active').removeClass('active');
						sw.find('li').eq(no).find('a').addClass('active');
					}
					*/
				}
				return false;
			});
			
			ms.find('.slider-switcher').find('a').unbind().bind('click',function(e){
				e.preventDefault();
				
				Site.sliderReInit();
				
				var aNo = sw.find('.active').parent().prevAll('li').length,
					no = $(this).parent().prevAll('li').length,
					dr = $(this).attr('data-rel'),
					no1 = sl.find('li[data-rel='+dr+']').prevAll('li').length;
					
					
				nm = no1*100;
						
				sl.animate({'left':'-'+nm+'%'},1000,function(){
					sl.css({'left':'0'});
					
					var tPrevElems = sl.find('li[data-rel='+dr+']').prevAll('li');
					
					for(ii=0;ii<tPrevElems.length;ii++){
						sl.append(sl.find('li:first'));
					}
					
					$('body').removeClass('animated');
					sl.find('.active').removeClass('active');
					sl.find('li:first').addClass('active');
				});
				
				
				sw.find('.active').removeClass('active');
				$(this).addClass('active');
				
				return false;
			});
			
			
		}
	},
	
	sliderMainFade:function(){
		if($('.main-slider').length){
			
			var ms = $('.main-slider'),
				sl = ms.find('.slider'),
				sw = ms.find('.slider-switcher');
			
			sl.css({'position':'relative','left':'0%'});
			sl.find('li').css({'display':'none','position':'absolute','left':'0','top':'0','width':'100%'});
			sl.find('li:first').show();
			
			ms.add(sl).css({'width':'100%','overflow':'visible','min-height':'1200px'});
			
			ms.find('.prev, .next').unbind().bind('click',function(e){
				e.preventDefault();
				
				Site.sliderReInit();
				
				if(!$('body').hasClass('animated')){
					$('body').addClass('animated');
					var no = ms.find('.slider').find('.active').prevAll().length;
					
					if($(this).hasClass('prev')){
						sl.find('.active').removeClass('active');
						sl.find('li:first').fadeOut(600);
						sl.prepend(sl.find('li:last'));
						sl.find('li:first').fadeIn(1200).addClass('active');
						$('body').removeClass('animated');
					} else {
						sl.find('.active').removeClass('active');
						sl.find('li:first').fadeOut(600);
						sl.append(sl.find('li:first'));
						sl.find('li:first').fadeIn(1200).addClass('active');
						$('body').removeClass('animated');
					}
					
					sw.find('.active').removeClass('active');
					sw.find('li').find('a[data-rel='+sl.find('.active').attr('data-rel')+']').addClass('active');
					
				}
				return false;
			});
			
			ms.find('.slider-switcher').find('a').unbind().bind('click',function(e){
				e.preventDefault();
				
				Site.sliderReInit();
				
				var aNo = sw.find('.active').parent().prevAll('li').length,
					no = $(this).parent().prevAll('li').length,
					dr = $(this).attr('data-rel'),
					no1 = sl.find('li[data-rel='+dr+']').prevAll('li').length;
					
				sl.find('.active').removeClass('active');
				sl.find('li:first').fadeOut(600);
				
				var tPrevElems = sl.find('li[data-rel='+dr+']').prevAll('li');
					
				for(ii=0;ii<tPrevElems.length;ii++){
					sl.append(sl.find('li:first'));
				}
				
				sl.find('li:first').fadeIn(1200).addClass('active');
				
				sw.find('.active').removeClass('active');
				$(this).addClass('active');
				$('body').removeClass('animated');
				
				return false;
			});
			/*
			setTimeout(function(){
				ms.find('li').find('img').each(function(){
					var tHref = $(this).attr('src'),
						tH = $(this).height(),
						tW = $(this).width();
						
					if(!tH || tH < 800) tH = 800;
					$(this).css({'visibility':'hidden'})
					$(this).parent().css({'background':'url('+tHref+') center 0 no-repeat','min-height':tH+'px'});
					if(!$.browser.ie) $(this).parent().css({'-webkit-background-size':tW+'px '+tH+'px'});
				});
			},0);
			*/
		}
	},
	
	sliderMainAccross:function(){
		if($('.main-slider').length){
			
			var ms = $('.main-slider'),
				sl = ms.find('.slider'),
				sw = ms.find('.slider-switcher');
			
			sl.css({'position':'relative','left':'0%'});
			//sl.find('li:not(.active)').hide();
			
			ms.find('.prev, .next').unbind().bind('click',function(e){
				e.preventDefault();
				
				Site.sliderReInit();
				
				if(!$('body').hasClass('animated')){
					$('body').addClass('animated');
					var no = ms.find('.slider').find('.active').prevAll().length;
					
					if($(this).hasClass('prev')){
						sl.css({'left':'-100%'}).prepend(sl.find('li:last'));
						sl.animate({'left':'0%'},1000,function(){
							$('body').removeClass('animated');
							sl.find('.active').removeClass('active');
							sl.find('li:first').addClass('active');
							
							sw.find('.active').removeClass('active');
							sw.find('li').find('a[data-rel='+sl.find('.active').attr('data-rel')+']').addClass('active');
						});
					} else {
					
						sl.animate({'left':'-100%'},1000,function(){
							$('body').removeClass('animated');
							sl.css({'left':'0%'}).append(sl.find('li:first'));
							
							sl.find('.active').removeClass('active');
							sl.find('li:first').addClass('active');
							
							sw.find('.active').removeClass('active');
							sw.find('li').find('a[data-rel='+sl.find('.active').attr('data-rel')+']').addClass('active');
						});
					
					}
					
				}
				return false;
			});
			
			ms.find('.slider-switcher').find('a').unbind().bind('click',function(e){
				e.preventDefault();
				
				Site.sliderReInit();
				
				var aNo = sw.find('.active').parent().prevAll('li').length,
					no = $(this).parent().prevAll('li').length,
					dr = $(this).attr('data-rel'),
					no1 = sl.find('li[data-rel='+dr+']').prevAll('li').length;
					
					
				nm = no1*100;
				
				sl.find('li[data-rel='+dr+']').prevAll('li').hide();
				sl.find('.active').show();
				
				sl.animate({'left':'-100%'},1000,function(){
					sl.css({'left':'0%'});
					var tPrevElems = sl.find('li[data-rel='+dr+']').prevAll('li');
					
					for(ii=0;ii<tPrevElems.length;ii++){
						sl.append(sl.find('li:first'));
					}
					
					sl.find('li').show();
					
					sl.find('.active').removeClass('active');
					sl.find('li:first').addClass('active');
					$('body').removeClass('animated');
				});
				
				sw.find('.active').removeClass('active');
				$(this).addClass('active');
				
				return false;
			});
			/*
			setTimeout(function(){
				ms.find('li').find('img').each(function(){
					var tHref = $(this).attr('src'),
						tH = $(this).height(),
						tW = $(this).width();
						
					if(!tH || tH < 800) tH = 800;
					$(this).css({'visibility':'hidden'});
					$(this).parent().css({'background':'url('+tHref+') center 0 no-repeat','min-height':tH+'px'});
					if(!$.browser.ie) $(this).parent().css({'-webkit-background-size':tW+'px '+tH+'px'});
				});
			},0);
			*/
		}
	},
	
	sliderGames:function(){
		if($('.slider.game-pics').length > 0){
			var sl = $('.slider'),
				sUl = sl.find('ul'),
				sElemW = 195;
			
			sUl.css({'position':'relative','left':'0'});
			
			sl.find('.prev, .next').unbind().bind('click',function(e){
				e.preventDefault();
				
				if($(this).hasClass('next')){
					sUl.animate({'left':'-'+sElemW+'px'},600,function(){
						sUl.append(sUl.find('li:first'));
						sUl.attr('style','');
					});
				} else {
					sUl.prepend(sUl.find('li:last'));
					sUl.css({'left':'-'+sElemW+'px'});
					sUl.animate({'left':'0'},600,function(){
						
					});
				}
				
				return false;
			});
			
			
		}
	},
	
	filterGames:function(){
		if($('#filters').length) {
			$('#filters').find('a').bind('click',function(e){
				e.preventDefault();
				var tRel = $(this).text();
				
				$('.game-listing').find('li:visible').hide();
				$('.game-listing').find('.'+tRel).fadeIn(200);
				
				if(tRel == 'All Games') $('.game-listing').find('li').fadeIn(200);
				
				$('#filters').find('.current_page_item').removeClass('current_page_item');
				$(this).parent().addClass('current_page_item');
				
				return false;
			});
		}
	}
}

$(document).ready(function() {
	Site.init();
});