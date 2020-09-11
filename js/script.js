$(document).ready(function(){


	//placeholder
	$('input, textarea').placeholder();

	//select
	$('select').selectmenu({
		change: function() {
			$(this).parents('.frm-field-label').addClass('filled');
		},
		open: function() {
			$(this).parents('.frm-field-label').addClass('open');
		},
		close: function() {
			$(this).parents('.frm-field-label').removeClass('open');
		}
	});
	$('form#filter select[name="mark"]').selectmenu({
		classes: {
			"ui-selectmenu-menu":"mark-filter"
		}
	});
	$('form#filter select[name="model"]').selectmenu({
		classes: {
			"ui-selectmenu-menu":"model-filter"
		}
	});


	$('form#onlineScore select[name="mark"]').selectmenu({
		classes: {
			"ui-selectmenu-menu":"mark-online"
		}
	});
	$('form#onlineScore select[name="model"]').selectmenu({
		classes: {
			"ui-selectmenu-menu":"model-online"
		}
	});

	$('form#question-form select[name="mark"]').selectmenu({
		classes: {
			"ui-selectmenu-menu":"mark-review"
		}
	});
	$('form#question-form select[name="model"]').selectmenu({
		classes: {
			"ui-selectmenu-menu":"model-review"
		}
	});

	//phone masked
	$('input[type="tel"]').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	
	//popup block
	$('.js-popup-wrap .js-btn-toggle').on('click touchstart', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
		} else {
			$('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
			$(this).addClass('active');
		}
		return false;
	})
	$('.js-popup-wrap .js-btn-close').on('click', function() {
		$(this).parents('.js-popup-wrap').children('.js-btn-toggle').removeClass('active');
		return false;
	})
	$(document).click(function(event) {
	    if ($(event.target).closest(".js-popup-block").length) return;
	    $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
	    event.stopPropagation();
	});


	//frm field label
	$('.frm-field-label input').on('keyup', function() {
		if ($(this).val()=='') {
			$(this).parent().removeClass('filled');
		} else {
			$(this).parent().addClass('filled');
		}
	})
	$('.frm-field-label select').on('change', function() {
		if ($(this).children('option:selected').text()=='') {
			$(this).parent().removeClass('filled');
		} else {
			$(this).parent().addClass('filled');
		}
	})


	//popup order
	$('#popup-order').dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: 300,
		show: { effect: "fade", duration: 400 },
		hide: { effect: "fade", duration: 400 },
		dialogClass: '',
		title: '',
		open: function() {
			//select
			$('select').selectmenu({
				change: function() {
					$(this).parents('.frm-field-label').addClass('filled');
				}
			});
		}
	})
	$('.js-btn-popup-order').on('click', function() {
		$('#popup-order').dialog('open');
		$('.main-menu-wrap .js-btn-toggle').removeClass('active');
		return false;
	})

	$('#popup-drive').dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: 300,
		show: { effect: "fade", duration: 400 },
		hide: { effect: "fade", duration: 400 },
		dialogClass: '',
		title: '',
		open: function() {

		}
	})
	$('.js-btn-popup-drive').on('click', function() {
		$('#popup-drive').dialog('open');
		$('.main-menu-wrap .js-btn-toggle').removeClass('active');
		return false;
	})

	$('#popup-pledge').dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: 300,
		show: { effect: "fade", duration: 400 },
		hide: { effect: "fade", duration: 400 },
		dialogClass: '',
		title: '',
		open: function() {

		}
	})
	$('.js-btn-popup-pledge').on('click', function() {
		$('#popup-pledge').dialog('open');
		$('.main-menu-wrap .js-btn-toggle').removeClass('active');
		return false;
	})

	$('#popup-success').dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: 300,
		show: { effect: "fade", duration: 400 },
		hide: { effect: "fade", duration: 400 },
		dialogClass: '',
		title: '',
		open: function() {
			
		}
	})
	$('#popup-success-changed').dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: 300,
		show: { effect: "fade", duration: 400 },
		hide: { effect: "fade", duration: 400 },
		dialogClass: '',
		title: '',
		open: function() {
			
		}
	})


	$('#popup-success-review').dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: 300,
		show: { effect: "fade", duration: 400 },
		hide: { effect: "fade", duration: 400 },
		dialogClass: '',
		title: '',
		open: function() {
			
		}
	})

	$('#popup-add').dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: 300,
		show: { effect: "fade", duration: 400 },
		hide: { effect: "fade", duration: 400 },
		dialogClass: '',
		title: '',
		open: function() {
			
		}
	})


	//photos box
	$('.photos-box').each(function() {
	    $(this).find('.main-block').find('.active').removeClass('active');
	    if ($(this).children('.preview-block').find('.active').size()==0) {
	        $(this).children('.preview-block').find('li').eq(0).children('.item-photo').addClass('active');
	    }
	    $(this).children('.main-block').find('.item-photo').eq($(this).children('.preview-block').find('.item-photo.active').parent().index()).addClass('active');
	})
	$('.photos-box .preview-block .item-photo').on('click', function () {
	    if ($(this).hasClass('active')) {} else {
	        $(this).parents('.photos-box').children('.preview-block').find('.item-photo.active').removeClass('active')
	        $(this).parents('.photos-box').children('.main-block').find('.item-photo').removeClass('active')
	            .eq($(this).parent().index()).addClass('active');
	        $(this).addClass('active');
	    }
	    return false;
	})


	//slider box
	if ($('.slider-box .sl-item').size()>1) {
		$('.slider-box .slider').owlCarousel({
			items: 1,
			loop: true,
			nav: true,
			dots: true,
			smartSpeed: 1000,
			fluidSpeed: 1000,
			autoplaySpeed: 1000,
			navSpeed: 1000,
			dotsSpeed: 1000,
			dragEndSpeed: 1000,
			responsiveRefreshRate: 100,
			autoHeight: false,
			autoplay: false,
			autoplayTimeout: 5000,
		})
	}


	//list box
	$('.list-box .more a').on('click', function() {
		$(this).parent().addClass('active');
		return false;
	})
	$('.list-box .hide a').on('click', function() {
		$(this).parents().find('.more').removeClass('active');
		return false;
	})


	//catalog slider
	$('.catalog-slider-box .slider').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		smartSpeed: 1000,
		fluidSpeed: 1000,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		dotsSpeed: 1000,
		dragEndSpeed: 1000,
		responsiveRefreshRate: 100,
		autoHeight: false,
		autoplay: false,
		autoplayTimeout: 5000,
		responsive: {
			0: {items: 1},
			480: {items: 2},
			768: {items: 3},
			1200: {items: 4}
		},
	})


	//reviews slider
	$('.reviews-slider-box .slider').owlCarousel({
		loop: true,
		nav: true,
		dots: true,
		smartSpeed: 1000,
		fluidSpeed: 1000,
		autoplaySpeed: 1000,
		navSpeed: 1000,
		dotsSpeed: 1000,
		dragEndSpeed: 1000,
		responsiveRefreshRate: 100,
		autoHeight: true,
		autoplay: false,
		autoplayTimeout: 5000,
		responsive: {
			0: {items: 1},
			768: {items: 2},
			1200: {items: 3},
		},
		onResized: function() {
			var owlHeight=0;
			$('.reviews-slider-box').find('.owl-item.active').each(function() {
				if ($(this).height()>owlHeight) {
					owlHeight=$(this).height();
				}
			});
			$('.reviews-slider-box').find('.owl-height').css('height', owlHeight);
		},
		onInitialized: function() {
			var owlHeight=0;
			$('.reviews-slider-box').find('.owl-item.active').each(function() {
				if ($(this).height()>owlHeight) {
					owlHeight=$(this).height();
				}
			});
			$('.reviews-slider-box').find('.owl-height').css('height', owlHeight);
			$('.reviews-slider-box .owl-dots').attr('data-count', $('.reviews-slider-box .owl-dots .owl-dot').size());
		},
		onTranslated: function() {
			var owlHeight=0;
			$('.reviews-slider-box').find('.owl-item.active').each(function() {
				if ($(this).height()>owlHeight) {
					owlHeight=$(this).height();
				}
			});
			$('.reviews-slider-box').find('.owl-height').css('height', owlHeight);
		}
	})


	$("#reg-form, #auth-form, #change-form").submit(function(e){
		e.preventDefault();
		var data = $(this).serialize();
		var url = "/ajax/ajaxAvtor/";
		ajaxLoad(data, url).complete(function (dat) {
            try {
                var result = dat.responseText;
                var mas = JSON.parse(result);
               console.log(mas);
            } catch (e) {
                console.log(e);
            }
        });
	})

	
});
$(window).load(function() {
      $('[data-fancybox]').fancybox({
      	buttons: [
  	        "fullScreen",
  	        "thumbs",
  	        "close"
  	    ],
      	afterShow: function() {
			$('.fancybox-button--arrow_left').each(function() {
				$(this).attr('title', 'Предыдущая');
			})
			$('.fancybox-button--play').each(function() {
				$(this).attr('title', 'Слайдшоу (P)');
			})
			$('.fancybox-button--arrow_right').each(function() {
				$(this).attr('title', 'Следующая');
			})
			$('.fancybox-button--fullscreen').each(function() {
				$(this).attr('title', 'На весь экран (F)');
			})
			$('.fancybox-button--thumbs').each(function() {
				$(this).attr('title', 'Предосмотр (G)');
			})
			$('.fancybox-button--close').each(function() {
				$(this).attr('title', 'Закрыть (Esc)');
			})
      	}
      })
});


function ajaxLoad(data, url, type) {
    type = type || "data";
    var param = {type: "POST", url: url, data: data};
    if (type == 'file') {
        param.contentType = false;
        param.processData = false;
    }
    ;
    //console.log(param);
    return $.ajax(param);
}
