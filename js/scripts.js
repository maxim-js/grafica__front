$(document).ready(function(){


	// select
	$('select').selectmenu();


	//placeholder
	$('input, textarea').placeholder();

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


	
	//tabs
	$('.js-tabs-nav').each(function() {
		$('.js-tab-block[data-tab="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
	})
	$('.js-tabs-nav a').on('click', function() {
		if ($(this).hasClass('active')) {} else {
			$('.js-tab-block').removeClass('active');
			$(this).parents('.js-tabs-nav').find('.active').removeClass('active');
			$(this).addClass('active');
			$('.js-tabs-nav').each(function() {
				$('.js-tab-block[data-tab="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
			})
		}
		return false;
	})


	//works slider
	$('.works-box .slider').owlCarousel({
		loop: true,
		nav: false,
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
			1: {items: 1},
			768: {items: 2},
			1024: {items: 2, nav: true, dots: false}
		},
	})

	/*if ($('.slider-box .sl-item').size()>1) {*/
		
	/*}*/


	//popup callback
	$('#popup-callback').dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: 300,
		show: { effect: "fade", duration: 400 },
		hide: { effect: "fade", duration: 400 },
		dialogClass: '',
		title: ''
	})
	$('.js-btn-popup-callback').on('click', function() {
		$('#popup-callback').dialog('open');
		return false;
	})

	$('#popup-manager').dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: 300,
		show: { effect: "fade", duration: 400 },
		hide: { effect: "fade", duration: 400 },
		dialogClass: '',
		title: ''
	})
	$('.js-btn-popup-manager').on('click', function() {
		$('#popup-manager').dialog('open');
		return false;
	})

	$('#popup-reg').dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: 300,
		show: { effect: "fade", duration: 400 },
		hide: { effect: "fade", duration: 400 },
		dialogClass: '',
		title: ''
	})
	$('.js-btn-popup-reg').on('click', function() {
		$('#popup-reg').dialog('open');
		return false;
	})

	$('#popup-auth').dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: 300,
		show: { effect: "fade", duration: 400 },
		hide: { effect: "fade", duration: 400 },
		dialogClass: '',
		title: ''
	})

	$('.js-btn-popup-auth').on('click', function() {
		$('#popup-auth').dialog('open');
		return false;
	})

	$('#popup-forget-password').dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: 300,
		show: { effect: "fade", duration: 400 },
		hide: { effect: "fade", duration: 400 },
		dialogClass: '',
		title: ''
	})

	$('.js-btn-popup-pass').on('click', function() {
		$('#popup-forget-password').dialog('open');
		return false;
	})

	$('#popup-service').dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: 300,
		show: { effect: "fade", duration: 400 },
		hide: { effect: "fade", duration: 400 },
		dialogClass: '',
		title: ''
	})

	$('.js-btn-popup-service').on('click', function() {
		$('#popup-service').dialog('open');
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
		title: ''
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
		title: ''
	})

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
			
		}
	})

	$('#popup-review').dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: 300,
		show: { effect: "fade", duration: 400 },
		hide: { effect: "fade", duration: 400 },
		dialogClass: '',
		title: ''
	})

	$('#popup-pass').dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		draggable: false,
		width: 300,
		show: { effect: "fade", duration: 400 },
		hide: { effect: "fade", duration: 400 },
		dialogClass: '',
		title: ''
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

	$(document).on("click touchstart", function (event) {
		if ($(".ui-dialog").has(event.target).length === 0) $('#popup-callback').dialog('close');
	});

	$(document).on("click touchstart", function (event) {
		if ($(".ui-dialog").has(event.target).length === 0) $('#popup-manager').dialog('close');
	});

	$(document).on("click touchstart", function (event) {
		if ($(".ui-dialog").has(event.target).length === 0) $('#popup-success').dialog('close');
	});

	$(document).on("click touchstart", function (event) {
		if ($(".ui-dialog").has(event.target).length === 0) $('#popup-review').dialog('close');
	});




	//price range
	/*$('#range').slider({
		range: true,
		min: 0,
		max: 5000,
		values: [0, 5000],
		slide: function( event, ui ) {
			$('span#min').text(ui.values[0]);
			$('span#max').text(ui.values[1]);

			$('input#min').val(ui.values[0]);
			$('input#max').val(ui.values[1]);
	  },
	  	change: function(event, ui){

			$('.filter-form').submit();
	  	}
	})
	$('#min').val($('#range').slider('values', 0));
	$('#max').val($('#range').slider('values', 1));*/
	$('#widget').draggable();


	//counter   
	$('.frm-counter .btn-action-minus').on('click', function(){
	    var cnt=$(this).parents('.frm-counter').find('input').val();
	    cnt=parseInt(cnt);
	    if (cnt>1) {
	        $(this).parents('.frm-counter').find('input').val(cnt-1);
	    }
	    return false;
	})
	$('.frm-counter .btn-action-plus').on('click', function(){
	    var cnt=$(this).parents('.frm-counter').find('input').val();
	    $(this).parents('.frm-counter').find('input').val(cnt-1+2);
	    return false;
	})

	
});