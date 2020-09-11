$(document).ready(function(){

	$(document).click(function(){
		$(".invalid").removeClass('invalid');
	});

	$('.custom-but').click(function(){
		if($('.custom-checkbox').is(':checked') == false) { 
				$('.custom-checkbox-wrapper').addClass('invalid');
				
				console.log('no');
				return false;
		}
	});

	$('.custom-but-2').click(function(){
		if($('.custom-checkbox-2').is(':checked') == false) { 
				$('.custom-checkbox-wrapper-2').addClass('invalid');
				
				console.log('not');
				return false;
		}
	});

	window.setClient = function(data, formId){
		//console.log($("#left-menu .nav li.disabled"));
		$(".nav li.disabled").removeClass("disabled");
	}

	window.auth = function(data, formId){
		location.href = "/";	
	}

	window.callback = function(message, formId){
		var mes = $("#"+formId).find(".popup-message");
		mes.text(message);
		mes.addClass('fadeInDown');
		mes.removeClass("hidden");
		mes.show();
		setTimeout(function(){
			//
			mes.removeClass('fadeInDown');
			mes.addClass('fadeOutUp');
			
			$(".fancybox-overlay").trigger('click');
			$("#"+formId).find("form")[0].reset();
		}, 3000);
		setTimeout(function(){
			mes.text('');
			mes.hide();
			mes.addClass("hidden");
			mes.removeClass('fadeOutUp');
		}, 4000);
	}

	
	window.addOrder = function(data, formId){
		$("#"+formId).find("[type=submit]").remove();
		window.callback(data, formId);
		setTimeout(function(){
			location.href = "/";	
		}, 4000);
	}
	
	
	
	window.updateOrderList = function(data){
		
		if (typeof(data.List)!="undefined"){
			$(".content .order-table").html(data.List);
			if (typeof(data.Paginator)!="undefined"){
				$("header .pages-pagination").html(data.Paginator);
			}else{
				$("header .pages-pagination").remove();
			}
			if (typeof(data.Title)!="undefined"){
				$("header .page-nav-block h1").html(data.Title);
			}
			if (typeof(data.OrderInfo)!="undefined"){
				$("header .order-header-block h1").html(data.OrderInfo);
			}
		}
	}
	
	window.checkOrderList = function(data){
		
		if (typeof(data.id)!="undefined"){
			
			if (typeof(data.Class)!="undefined"){
				$(".content .order-table tr[data-id="+data.id+"] ").addClass(data.Class);
			}
			if (typeof(data.Status)!="undefined"){
				$(".content .order-table tr.small").html(data.Status);
			}
			$(".content .order-table tr[data-id="+data.id+"] td.first").append("<span class='update animate'>заказ обновлен</span>");
			$(".content .order-table tr[data-id="+data.id+"] td.first .update").slideDown();
			
			setTimeout(function(){
				$(".content .order-table tr[data-id="+data.id+"] td.first .update").slideUp();
				// $(".content .order-table tr[data-id="+data.id+"] td.first .update").animate(
					// {top: "50px",height: 0,padding: 0, display: "none"},300);
			}, 1000);
			setTimeout(function(){
				$(".content .order-table tr[data-id="+data.id+"] td.first .update").remove();
			}, 1500);
		}
	}
	
	/*$("p.user button").click(function(){
		$.ajax({
			type: "POST",
			url: "/ajax/user/",
			data: "function=logout",
			success: function(data){
				location.reload();
			}
		});
	});*/

	
	//window.auth('ke@delosite.net');
	$("a#passVost").click(function(){
		$(".fancybox-overlay").trigger('click');
		$.fancybox.open({href: "#popup-recovery"},{
			helpers : {
				overlay : {
					css : {
						'background' : 'rgba(0, 0, 0, 0.5)'
					}
				}
			},
			padding: 0,
			'scrolling' : 'visible'
		});
		return false;
		
		var login = $(this).closest("form").find("input[name=e-mail]");
		var path = $(this).data('path');
		var formId = $(this).closest("form").data('formid');
		var reg = new RegExp("^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$");
		var rez = true;
		console.log();
		if (!reg.test(login.val())){
			rez=false;
			setTimeout(function(){$(login).addClass('invalid')},10);
		}
		if (rez){
			var data = "function=passVost&email=" + login.val();
			submitForm(data, path, formId);
		}
	});
	
	
	$("a.rebuy").click(function(){
		var orderId = $(this).closest(".cart-list--row").data("id");
		submitForm("function=rebuy&orderId="+orderId+"","/ajax/basket/","popup-buy");
	});
	
	function submitForm(data, path, formId){
		//console.log(data);
		//console.log(path);
		//return false;
		$('body').preloader('start');
		$.ajax({
			type: "POST",
			url: path,
			data: data,
			success: function(data){
				//console.log(data);
				try{
					data = JSON.parse(data);
					//console.log(data);
					
					if (typeof(data.error)!='undefined'){
						$('body').preloader('stop');
						var mes = $("#"+formId).find(".popup-message");
						mes.text(data.error);
						mes.addClass('fadeInDown');
						mes.removeClass("hidden");
						mes.show();
						setTimeout(function(){
							//mes.hide();
							mes.removeClass('fadeInDown');
							mes.addClass('fadeOutUp');
							mes.text('');
						}, 3000);
						setTimeout(function(){
							mes.hide();
							mes.addClass("hidden");
							mes.removeClass('fadeOutUp');
						}, 4000);
						
					}else{
						if (typeof(data.url)!='undefined'){
							location.href = data.url;
						}else{
							window[data.function](data.data, formId);
						}
						
						$('body').preloader('stop');
					}
				}catch(e){
					console.log(data);
					//location.reload();
				}
				
			}
		});
	};
	
	
});