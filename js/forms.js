$(document).ready(function(){

	$('label[for="side01"]').click(function(){
		$('input[name="address"]').hide();
	})
	$('label[for="side02"]').click(function(){
		$('input[name="address"]').show();
	})

	$('.frm-select.dotted label').click(function(){
		var elemId = $(this).attr('for');
		var id = $('.frm-select.dotted input#'+elemId).attr('data-id');
		var brand = $('.frm-select.dotted input#'+elemId).attr('data-brand');

		if($('.frm-select.dotted input#'+elemId).is(':checked') == true){
			var formData = new FormData();

			formData.append('function', 'unsetBrand');
			formData.append('id', id);
			formData.append('brand', brand);

			$.ajax({
				url: '/ajax/basket/',
				dataType: 'text',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				type: 'post',
				success: function(data){
					console.log(data);
				}	
			})
		}else{
			var formData = new FormData();

			formData.append('function', 'brand');
			formData.append('id', id);
			formData.append('brand', brand);

			$.ajax({
				url: '/ajax/basket/',
				dataType: 'text',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				type: 'post',
				success: function(data){
					console.log(data);
				}	
			})
		}
	})

	$('form#changeUserData input[type="submit"]').click(function(e){
		e.preventDefault();
		var name = $('form#changeUserData input[name="name"]').val();
		var email = $('form#changeUserData input[name="email"]').val();
		var phone = $('form#changeUserData input[name="phone"]').val();
		var password = $('form#changeUserData input[type="password"]').val();

		$.post('/ajax/user/','function=update&name='+name+'&email='+email+'&phone='+phone+'&password='+password,function(data){
			$('#popup-success-changed').dialog('open');
		})

	})

	$('table#table-history tr td').click(function(){
		var id = $(this).closest('tr').attr('data-id');
		console.log(id);
		$( "table#table-history tr[data-parent-id='"+id+"']").toggle( "fast", function() {
		  // Animation complete.
		});
	})

	$('#popup-auth ul li').click(function(){
		$('#popup-auth ul li').removeClass('active');
		$(this).addClass('active');

		var id = $(this).attr('id');

		$('#popup-auth form').hide();
		$('#popup-auth form#'+id).show();
	})

	$('.register-block ul li').click(function(){
		$('.register-block ul li').removeClass('active');
		$(this).addClass('active');

		var id = $(this).attr('id');

		$('.register-block form').hide();
		$('.register-block form#'+id).show();
	})

	$('.filter-section input').on('change',function(){
		$('.filter-form').submit();
	})

	$('.item-catalog a.addToCart').click(function(e){
		e.preventDefault();
		var id = $(this).attr('data-item');

		$.post('/ajax/basket/','function=add&id='+id,function(data){
			data = JSON.parse(data);

			$('.product-cart a.addToCart[data-add="'+id+'"]').addClass('addedToCart');
			$('.product-cart a.addToCart[data-add="'+id+'"]').removeClass('addToCart');

			$('nav .actions-wrap .btn-action-cart').text(data.Count);

			$('#popup-add').dialog('open');
		})
	})

	$('.price-wrap a.addToCartDetail').click(function(e){
		e.preventDefault();
		var id = $(this).attr('data-item');
		if($('.frm-select.dotted input.brand1').is(':checked') == false){
			var brand1 = '';
		}else{
			var brand1 = '&brand1='+$('.frm-select.dotted input.brand1').attr('data-brand');
		}

		if($('.frm-select.dotted input.brand2').is(':checked') == false){
			var brand2 = '';
		}else{
			var brand2 = '&brand2='+$('.frm-select.dotted input.brand2').attr('data-brand');
		}

		if($('.frm-select.dotted input.brand3').is(':checked') == false){
			var brand3 = '';
		}else{
			var brand3 = '&brand3='+$('.frm-select.dotted input.brand3').attr('data-brand');
		}

		if($('.frm-select.dotted input.brand4').is(':checked') == false){
			var brand4 = '';
		}else{
			var brand4 = '&brand4='+$('.frm-select.dotted input.brand4').attr('data-brand');
		}

		if($('.frm-select.dotted input.brand5').is(':checked') == false){
			var brand5 = '';
		}else{
			var brand5 = '&brand4='+$('.frm-select.dotted input.brand5').attr('data-brand');
		}
		/*var brand2 = $('.frm-select.dotted input.brand2').is(':checked');
		var brand3 = $('.frm-select.dotted input.brand3').is(':checked');
		var brand4 = $('.frm-select.dotted input.brand4').is(':checked');
		var brand5 = $('.frm-select.dotted input.brand5').is(':checked');*/

		$.post('/ajax/basket/','function=add'+brand1+''+brand2+''+brand3+''+brand4+''+brand5+'&id='+id,function(data){
			data = JSON.parse(data);

			$('.product-box .price-wrap .button a.addToCartDetail[data-item="'+id+'"]').addClass('addedToCartDetail');
			$('.product-box .price-wrap .button a.addToCartDetail[data-item="'+id+'"]').text('Добавлено');
			$('.product-box .price-wrap .button a.addToCartDetail[data-item="'+id+'"]').removeClass('addToCartDetail');

			$('nav .actions-wrap .btn-action-cart').text(data.Count);

			$('#popup-add').dialog('open');
		})
	})

	$('form#orderForm input[name="name"]').click(function(){
		$('form#orderForm div.error-input-name').hide();
	})
	$('form#orderForm input[name="phone"]').click(function(){
		$('form#orderForm div.error-input-phone').hide();
	})
	$('form#orderForm input[name="email"]').click(function(){
		$('form#orderForm div.error-input-email').hide();
	})
	$('form#orderForm label').click(function(){
		$('form#orderForm div.error-check').hide();
	})
	$('form#orderForm input[type="checkbox"]').click(function(){
		$('form#orderForm div.error-check').hide();
	})

    $(".frm-select-wrap input[name='entity']").change(function(e) {
        if($(this).val()==1) {
            $("input[name='org-name'], input[name='org-address']").parent("div").show(400);
            $(".frm-row-submit input[data-pay='online']").hide(400);
            $(".frm-row-submit input[data-pay='order']").val("Сформировать счет");
        } else {
            $("input[name='org-name'], input[name='org-address']").parent("div").hide(400);
            $(".frm-row-submit input[data-pay='online']").show(400);
            $(".frm-row-submit input[data-pay='order']").val("Сделать заявку");
        }
    })

	$('form#orderForm input[type="submit"]').click(function(e){
		e.preventDefault();

		var name = $('form#orderForm input[name="name"]').val();
		var phone = $('form#orderForm input[name="phone"]').val();
		var email = $('form#orderForm input[name="email"]').val();
		var address = $('form#orderForm input[name="address"]').val();
		var delivery = $('form#orderForm input[name="side"]').val();
		var entity = $('form#orderForm input[name="entity"]:checked').val();
		var ent_name = $('form#orderForm input[name="org-name"]').val();
		var ent_address = $('form#orderForm input[name="org-address"]').val();

		var pay = $(this).data('pay');

		var checkInputs = true;

		if(name == '' || name == ' '){
			$('form#orderForm div.error-input-name').css('display','inline-block');
			checkInputs = false;
		}
		if(phone == '' || phone == ' '){
			$('form#orderForm div.error-input-phone').css('display','inline-block');
			checkInputs = false;
		}
		if(email == '' || email == ' '){
			$('form#orderForm div.error-input-email').css('display','inline-block');
			checkInputs = false;
		}
		if(entity>0 && ent_name.trim()=='') {
			$('form#orderForm div.error-input-org_name').css('display','block');
			checkInputs = false;
		}
		if(entity>0 && ent_address.trim()=='') {
			$('form#orderForm div.error-input-org_address').css('display','block');
			checkInputs = false;
		}
		if($('form#orderForm input[type="checkbox"]').is(':checked') == false){
			$('form#orderForm div.error-check').css('display','block');
			checkInputs = false;
		}


		if(checkInputs == true){
			var formData = new FormData();

			formData.append('name', name);
			formData.append('phone', phone);
			formData.append('email', email);
			formData.append('address', address);
			formData.append('delivery', delivery);
			formData.append('pay', pay);
			formData.append('entity', entity);
			if(entity>0) {
				formData.append('ent_name', ent_name);
				formData.append('ent_address', ent_address);
			}
			formData.append('function', 'newOrder');

			$.ajax({
				url: '/ajax/basket/',
				dataType: 'text',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				type: 'post',
				success: function(data){
					$('nav .actions-wrap .btn-action-cart').text('0');
					$('.cart-box .items-wrap').html('<h2>Корзина пуста</h2>');
					$('.cart-total-wrap').remove();
					$('form#orderForm')[0].reset();
					
					if(pay == 'online'){
						location.href = data;
					}else{
						if(entity>0) {
							location.href=data;
							window.open("http://graphics.delosite38.ru/"+data);
							$('#popup-order .notice').append( "<br><div сlass='link_schet'><a style='font-weight:bold' href='"+data+"'>Открыть платежный документ (счет)</a></div>" );
						}
						$('#popup-order').dialog('open');
					}

					/*$('#popup-order').dialog('open');*/
					//location.href = data;
					$('form#orderForm input[type="submit"]').remove();
					
				}	
			})
		}

	})

	$('.frm-counter .btn-action-minus').click(function(e){
		e.preventDefault();

		
		var id = $(this).attr('data-id');
		var value = $('.item-cart[data-id="'+id+'"] .frm-counter input').val();


		console.log(value);

		if(value >= 1){
			$.post('/ajax/basket/', 'function=update&count='+value+'&id='+id, function(data){
				if(data){
					data = JSON.parse(data);

					console.log(data);

					$('nav .actions-wrap .btn-action-cart').text(data.Count);
					$('.cart-total-wrap .details-wrap .item-detail.item b').html(data.Summ+' <span class="r"></span>');
					$('.cart-total-wrap .total-wrap').html('Сумма заказа: '+data.Summ+' <span class="r"></span>');
					if(data.DSumm == 0){
						$('.cart-total-wrap .details-wrap .item-detail.delivery b').html('Бесплатно');
					}else{
						$('.cart-total-wrap .details-wrap .item-detail.delivery b').html(data.DSumm+' <span class="r"></span>');
					}
					
				}	
			})
		}
	})

	$('.frm-counter .btn-action-plus').click(function(e){
		e.preventDefault();

		var id = $(this).attr('data-id');
		var value = $('.item-cart[data-id="'+id+'"] .frm-counter input').val();

		$.post('/ajax/basket/', 'function=update&count='+value+'&id='+id, function(data){
			if(data){
				data = JSON.parse(data);
				$('nav .actions-wrap .btn-action-cart').text(data.Count);
				$('.cart-total-wrap .details-wrap .item-detail.item b').html(data.Summ+' <span class="r"></span>');
				$('.cart-total-wrap .total-wrap').html('Сумма заказа: '+data.Summ+' <span class="r"></span>');
				if(data.DSumm == 0){
					$('.cart-total-wrap .details-wrap .item-detail.delivery b').html('Бесплатно');
				}else{
					$('.cart-total-wrap .details-wrap .item-detail.delivery b').html(data.DSumm+' <span class="r"></span>');
				}
			}
		})
	})

	$('.frm-counter input').on('change',function(){

		var id = $(this).closest('.item-cart').attr('data-id');
		var value = $(this).val();

		if(value <= 0){
			$(this).val(1);
			var value = $(this).val();
		}

		$.post('/ajax/basket/', 'function=update&count='+value+'&id='+id, function(data){
			if(data){
				data = JSON.parse(data);
				$('nav .actions-wrap .btn-action-cart').text(data.Count);
				$('.cart-total-wrap .details-wrap .item-detail.item b').html(data.Summ+' <span class="r"></span>');
				if(data.DSumm == 0){
					$('.cart-total-wrap .details-wrap .item-detail.delivery b').html('Бесплатно');
				}else{
					$('.cart-total-wrap .details-wrap .item-detail.delivery b').html(data.DSumm+' <span class="r"></span>');
				}
			}
		})
	})

	$('.cart-box .items-wrap .item-cart .btn-action-del').click(function(e){
		e.preventDefault();

		var id = $(this).attr('data-id');
		var countItems = $('.cart-box .items-wrap .item-cart').length;

		console.log(countItems);

		$.post('/ajax/basket/', 'function=delItem&id='+id, function(data){
			if(data){
				data = JSON.parse(data);
				$('nav .actions-wrap .btn-action-cart').text(data.Count);
				$('.cart-total-wrap .details-wrap .item-detail.item b').html(data.Summ+' <span class="r"></span>');
				$('.cart-total-wrap .total-wrap').html('Сумма заказа: '+data.Summ+' <span class="r"></span>');
				if(data.DSumm == 0){
					$('.cart-total-wrap .details-wrap .item-detail.delivery b').html('Бесплатно');
				}else{
					$('.cart-total-wrap .details-wrap .item-detail.delivery b').html(data.DSumm+' <span class="r"></span>');
				}

				$('.cart-box .items-wrap .item-cart[data-id="'+id+'"]').remove();

				console.log(countItems);
				if(data.Count == 0){
					$('.cart-box .items-wrap').html('<h2>Корзина пуста</h2>');
					$('.cart-total-wrap').remove();
				}
			}
		})
		
	})

	$('form#reg input[name="name"]').click(function(){
		$('form#reg div.error-input-login').hide();
	})
	$('form#reg input[name="email"]').click(function(){
		$('form#reg div.error-email').hide();
	})
	$('form#reg input[name="password"]').click(function(){
		$('form#reg div.error-input-password').hide();
	})
	$('form#reg label').click(function(){
		$('form#reg div.error-check').hide();
	})
	$('form#reg input[type="checkbox"]').click(function(){
		$('form#reg div.error-check').hide();
	})

	$('form#reg input[type="submit"]').click(function(e){
		e.preventDefault();

		var name = $('form#reg input[name="name"]').val();
		var email = $('form#reg input[name="email"]').val();
		var password = $('form#reg input[name="password"]').val();
		var type = $('form#reg input[name="rd"]:checked').val();
		console.log(type);
		var checkbox = $('form#reg #regCheckPage');
		var checkInputs = true;

		if(name == '' || name == ' '){
			$('form#reg div.error-input-login').css('display','inline-block');
			checkInputs = false;
		}
		if(password == '' || password == ' '){
			$('form#reg div.error-input-password').css('display','inline-block');
			checkInputs = false;
		}
		if(email == '' || email == ' '){
			$(' form#reg div.error-email').css('display','inline-block');
			checkInputs = false;
		}
		if($('form#reg input[type="checkbox"]').is(':checked') == false){
			$('form#reg div.error-check').css('display','block');
			checkInputs = false;
		}

		if(checkInputs == true){
			var formData = new FormData();

			formData.append('name', name);
			formData.append('email', email);
			formData.append('password', password);
			formData.append('type', type);
			formData.append('function', 'reg');

			$.ajax({
				url: '/ajax/user/',
				dataType: 'text',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				type: 'post',
				success: function(data){
					var dataJSON = JSON.parse(data);

					if(dataJSON.error == 0){
						window.location.href = '/personal/profile/';
					}else{
						$('#popup-pass .main-title').text(dataJSON.error);
						$('#popup-pass').dialog('open');
					}

				}	
			})
		}

	})


	$('form#auth input[name="email"]').click(function(){
		$('form#auth div.error-email').hide();
	})
	$('form#auth input[name="password"]').click(function(){
		$('form#auth div.error-input-password').hide();
	})

	$('form#auth input[type="submit"]').click(function(e){
		e.preventDefault();

		var email = $('form#auth input[name="email"]').val();
		var password = $('form#auth input[name="password"]').val();
		var checkInputs = true;

		if(password == '' || password == ' '){
			$('form#auth div.error-input-password').css('display','inline-block');
			checkInputs = false;
		}
		if(email == '' || email == ' '){
			$('form#auth div.error-email').css('display','inline-block');
			checkInputs = false;
		}

		if(checkInputs == true){
			var formData = new FormData();

			formData.append('email', email);
			formData.append('password', password);
			formData.append('function', 'auth');

			$.ajax({
				url: '/ajax/user/',
				dataType: 'text',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				type: 'post',
				success: function(data){
					var dataJSON = JSON.parse(data);

					if(dataJSON.error == 0){
						window.location.href = '/personal/profile/';
					}else{
						$('#popup-pass .main-title').text(dataJSON.error);
						$('#popup-pass').dialog('open');
					}

					

				}	
			})
		}

	})

	$('#popup-callback input[name="name"]').click(function(){
		$('#popup-callback div.error-input-name').hide();
	})
	$('#popup-callback input[name="phone"]').click(function(){
		$('#popup-callback div.error-input-phone').hide();
	})
	$('#popup-callback label').click(function(){
		$('#popup-callback div.error-check').hide();
	})
	$('#popup-callback input[type="checkbox"]').click(function(){
		$('#popup-callback div.error-check').hide();
	})

	$('#popup-callback input[type="submit"]').click(function(e){
		e.preventDefault();

		var name = $('#popup-callback input[name="name"]').val();
		var phone = $('#popup-callback input[name="phone"]').val();
		var checkbox = $('#popup-callback #popup01');
		var checkInputs = true;

		if(name == '' || name == ' '){
			$('#popup-callback div.error-input-name').css('display','inline-block');
			checkInputs = false;
		}
		if(phone == '' || phone == ' '){
			$('#popup-callback div.error-input-phone').css('display','inline-block');
			checkInputs = false;
		}
		if($('#popup-callback input[type="checkbox"]').is(':checked') == false){
			$('#popup-callback div.error-check').css('display','block');
			checkInputs = false;
		}

		if(checkInputs == true){
			var formData = new FormData();

			formData.append('name', name);
			formData.append('phone', phone);
			formData.append('function', 'recall');

			$.ajax({
				url: '/ajax/call/',
				dataType: 'text',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				type: 'post',
				success: function(data){
					var dataJSON = JSON.parse(data);
					$('#popup-callback').dialog('close');
					$('#popup-success').dialog('open');
				}	
			})
		}

	})

	$('#popup-manager input[name="name"]').click(function(){
		$('#popup-manager div.error-input-name').hide();
	})
	$('#popup-manager input[name="phone"]').click(function(){
		$('#popup-manager div.error-input-phone').hide();
	})
	$('#popup-manager label').click(function(){
		$('#popup-manager div.error-check').hide();
	})
	$('#popup-manager input[type="checkbox"]').click(function(){
		$('#popup-manager div.error-check').hide();
	})

	$('#popup-manager input[type="submit"]').click(function(e){
		e.preventDefault();

		var name = $('#popup-manager input[name="name"]').val();
		var phone = $('#popup-manager input[name="phone"]').val();
		var checkInputs = true;

		if(name == '' || name == ' '){
			$('#popup-manager div.error-input-name').css('display','inline-block');
			checkInputs = false;
		}
		if(phone == '' || phone == ' '){
			$('#popup-manager div.error-input-phone').css('display','inline-block');
			checkInputs = false;
		}
		if($('#popup-manager input[type="checkbox"]').is(':checked') == false){
			$('#popup-manager div.error-check').css('display','block');
			checkInputs = false;
		}

		if(checkInputs == true){
			var formData = new FormData();

			formData.append('name', name);
			formData.append('phone', phone);
			formData.append('function', 'recall2');

			$.ajax({
				url: '/ajax/call/',
				dataType: 'text',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				type: 'post',
				success: function(data){
					var dataJSON = JSON.parse(data);
					$('#popup-manager').dialog('close');
					$('#popup-success').dialog('open');
				}	
			})
		}

	})


	$('#question-form input[name="author"]').click(function(){
		$('#question-form div.error-input-name').hide();
	})
	$('#question-form textarea').click(function(){
		$('#question-form div.error-input-review').hide();
	})
	$('#question-form label').click(function(){
		$('#question-form div.error-check').hide();
	})
	$('#question-form input[type="checkbox"]').click(function(){
		$('#question-form div.error-check').hide();
	})

	$('#question-form input[type="submit"]').click(function(e){
		e.preventDefault();

		var name = $('#question-form input[name="author"]').val();
		var review = $('#question-form textarea').val();
		var checkInputs = true;

		if(name == '' || name == ' '){
			$('#question-form div.error-input-name').css('display','inline-block');
			checkInputs = false;
		}
		if(review == '' || review == ' '){
			$('#question-form div.error-input-review').css('display','inline-block');
			checkInputs = false;
		}
		if($('#question-form input[type="checkbox"]').is(':checked') == false){
			$('#question-form div.error-check').css('display','block');
			checkInputs = false;
		}

		if(checkInputs == true){
			var formData = new FormData();

			formData.append('author', name);
			formData.append('question', review);

			$.ajax({
				url: '/ajax/questions/',
				dataType: 'text',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				type: 'post',
				success: function(data){
					console.log(data);
					$('form#question-form')[0].reset();
					$('#popup-review').dialog('open');
				}	
			})
		}

	})

	$('a.logout').click(function(e){
		e.preventDefault();

		$.post('/ajax/user/', 'function=logout', function(data) {
			window.location = "/personal/";
		});
	})

	$('#pass-form input[type="submit"]').click(function(e){
		e.preventDefault();

		var email = $('#pass-form input[name="email"]').val();
		var checkInputs = true;

		if(email == '' || email == ' '){
			$('#pass-form div.error-input-email').css('display','inline-block');
			checkInputs = false;
		}

		if(checkInputs == true){
			var formData = new FormData();

			formData.append('function', 'passVost');
			formData.append('email', email);

			$.ajax({
				url: '/ajax/user/',
				dataType: 'text',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				type: 'post',
				success: function(data){
					$('form#pass-form')[0].reset();
					$('#popup-forget-password').dialog('close');
					$('#popup-pass .frm-title').text(data);
					$('#popup-pass').dialog('open');
				}	
			})
		}

	})

	$('form#mesInRefer input[type="submit"]').click(function(e){
		e.preventDefault();

		var id = $('form#mesInRefer input[name="mesId"]').val();
		var mes = $('form#mesInRefer textarea').val();
		var file = $('form#mesInRefer input[name="file"]').prop('files');
		var checkInputs = true;

		if(checkInputs == true){
			var form_data = new FormData();
			form_data.append('func', 'mes');
			form_data.append('message', mes);
			form_data.append('id', id);
			$.each( file, function( key, value ){
        		form_data.append( key, value );
   			});

			$.ajax({
				url: '/ajax/refs/',
				dataType: 'text',
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,
				type: 'post',
				success: function(data){
					if(data){
						console.log(data);
						location.reload();
					}
				}	
			})
		}
	})

	$('.addToRefs').click(function(e){
		e.preventDefault();

		var title = $(this).attr('title');

		var form_data = new FormData();
		form_data.append('func', 'addRefs');
		form_data.append('title', title);

		$.ajax({
				url: '/ajax/refs/',
				dataType: 'text',
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,
				type: 'post',
				success: function(data){
					window.location = "/personal/referals/";
				}	
			})
	})


	/*Отправка первого сообещения*/

	$('#referrals-form input[name="name"]').click(function(){
		$('#referrals-form div.error-input-name').hide();
	})
	$('#referrals-form input[name="email"]').click(function(){
		$('#referrals-form div.error-input-email').hide();
	})
	$('#referrals-form textarea').click(function(){
		$('#referrals-form div.error-input-message').hide();
	})
	$('#referrals-form label').click(function(){
		$('#referrals-form div.error-check').hide();
	})
	$('#referrals-form input[type="checkbox"]').click(function(){
		$('#referrals-form div.error-check').hide();
	})

	$('form#referrals-form input[type="submit"]').click(function(e){
		e.preventDefault();

		var message = $('form#referrals-form textarea').val();
		var name = $('form#referrals-form input[name="name"]').val();
		var email = $('form#referrals-form input[name="email"]').val();
		var file = $('form#referrals-form input[name="file"]').prop('files');
		var checkInputs = true;


		if(name == '' || name == ' '){
			$('div.error-input-name').css('display','inline-block');
			checkInputs = false;
		}
		if(email == '' || email == ' '){
			$('div.error-input-email').css('display','inline-block');
			checkInputs = false;
		}
		if(message == '' || message == ' '){
			$('div.error-input-message').css('display','inline-block');
			checkInputs = false;
		}
		if($('#referrals-form input[type="checkbox"]').is(':checked') == false){
			$('#referrals-form div.error-check').css('display','block');
			checkInputs = false;
		}
		if(checkInputs == true){
			var form_data = new FormData();
			form_data.append('func', 'firstMes');
			form_data.append('message', message);
			form_data.append('name', name);
			form_data.append('email', email);
			$.each( file, function( key, value ){
        		form_data.append( key, value );
   			});
   			//console.log(form_data);
			$.ajax({
				url: '/ajax/refs/',
				dataType: 'text',
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,
				type: 'post',
				success: function(data){
					window.location = "/personal/referals/";
				}	
			})
		}
	})
	/**/

});