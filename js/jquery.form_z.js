/* работа с формами */

$(document).ready(function(){
		// удаление ошибки при помещении фокуса в поле формы
	$('form .check').focus(function(){
		$(this).parent('label').find('span.error').remove();
		$(this).next('span.error').remove();
	});
		// блок ошибки для select
	$('.category').click(function(){ $(this).find('span.error').remove(); });
		// работа чекбоксов
	checkboxInput();
		// загрузчик файлов	
	uploader_files();
		// удаление изображений из формы объявлений
	dell_img_from_form();
});



/* валидация полей форм */
function error_form(e){
	$('form span.error').remove(); // очищаем форму от предыдущих ошибок
	var result = false;
	var all = $(e).find(' .check');
	var count = all.length;

	for( var i = 0; i < count; i++ ){
		var el = all.eq(i);
		var val_el = $.trim( el.val() );
		var type = el.attr('data-type');

			// не пустые поля
		if(val_el){
			switch(type){
				case 'email':
					if(val_el.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) === null){
						el.after( err_block('не коректный email') );
						result = true;
					}
				break;
				case 'text':
					if(val_el.match(/^[a-zA-Zа-яёА-ЯЁ -.,]+$/) === null){
						el.after( err_block('здесь может быть только текст') );
						result = true;
					}
				break;
				case 'num':
					if(val_el.match(/^[0-9]+$/) === null){
						el.after( err_block('здесь могут быть только цифры') );
						result = true;
					}
				break;
				case 'phone':
					if(val_el.length < 4){
						el.after( err_block('число должно быть длинее 3 символов') );
						result = true;
					}else{
						if(val_el.match(/^[+0-9,. ()-]+$/) === null){
							el.after( err_block('не корректный номер телефона') );
							result = true;
						}
					}
				break;
				case 'common':
					if(val_el.match(/^[a-zA-Zа-яёА-ЯЁ ()-.,0-9_ :=\/]+$/) === null){
						el.after( err_block('допустим текст, цифры и знаки препинания') );
						result = true;
					}
				break;
				case 'link':
					if(val_el.match(/^[a-zA-Zа-яёА-ЯЁ :@%#-.,0-9_ ?&=\/]+$/) === null){
						el.after( err_block('не корректный текст ссылки') );
						result = true;
					}
				break;
				case 'checkbox':
					if(el.attr('data-required') == '1'){
						if( el.is(':checked') ){
							break;
						}else{
							var id = $(el).attr('id');
							$('label[for=' + id + ']').append( err_block('это поле обязательно для заполнения') );
							result = true;
						}
					}
				break;
			}
		}else{
				// обязательные поля
			if(el.attr('data-required') == '1'){
				if(el.attr('data-type') == 'select'){
					el.after( err_block_select('это поле обязательно для заполнения') );
				}else{
					el.after( err_block('это поле обязательно для заполнения') );
				}
				result = true;
			}
		}
	}
	return result; 
}

	// блок с текстом ошибки
function err_block(text){ 
    return "<span class='error'>"+text+"</span>";
}
	// блок с текстом ошибки
function err_block_select(text){ 
    return "<span class='error select'>"+text+"</span>";
}

	// работа чекбокса
function checkboxInput(){
	$('label.checkbox').click(function(){
		$(this).find('span.error').remove();
		var id = $(this).attr('for');
		if( $('#' + id).is(':checked') ){
			$(this).removeClass('act');
		}else{
			$(this).addClass('act');
		}
	});
}
	// загрузчик файлов
function uploader_files(){
	$('input.start').unbind('change');
	$('input.start').change(function(e){
		
		var request = new XMLHttpRequest(), file = [], error = [], f = e.target.files, main = $(this).closest('.label'),
			params = $(this).attr('data-param') , img_block, name_f,
			dr = '/files/uploads/tmp/', par = $.parseJSON( params ), e_drag = $(this).closest('div.label').find('[name=e_drag]'),
			dirRoot = $(this).closest('form').find('[name=Type]').val();
		main.find('div.info').html('');
		if( ( 1 + $(this).closest('.file').find('.img_cont').length ) > par.limit){
			error.push('Количество файлов - не больше '+par.limit+'шт.'); }
	  try {
			// устаревшие браузеры сразу перейдут в блок catch
		// form = new FormDatas();
		form = new FormData();
		if(par.type.indexOf( f[0].type) == -1){
			error.push('Формат допустимых к загрузке изображений - "jpg, png, gif".'); }
		if(f[0].size > par.size){
				error.push('Максимальный размер файла - не больше 3mb.'); }
		if(error.length){	// есть ошибка загрузки
			error = error.join('<br />');
			main.find('div.info').html( "<span class='error'>" + error + '</span>' ); 
			$(this).val('');
		}else{
			
			request.onload = function(){
				switch(request.responseText){
					case 'no':
						message_block("<p class='no'>Ошибка загрузки файла. Повторите попытку позже.</p>",false);
					break;
					default:
						//console.log(request.responseText);
						// показываем миниатюру загруженного изображения
						$.ajax({
							type: 'POST', data: { 'Type':'showImg', 'ImageName':request.responseText, 'dr':dr, 'id':0 }, url: '/ajax/'+dirRoot+'/', dataType: 'text',
							success: function(data){
								img_block = main.find('.img').html() + data;
								main.find('.img').html(img_block);
								// main.find('.img').append( data );
								
									// заполняем форму списка изображений
								var val = e_drag.val();
								e_drag.val( val + ','+ request.responseText);
								
									// если в параметрах передан дополнительный скрипт, исполняем
								if(par.script){ eval(par.script); }
									
								setTimeout(function(){
										// добавляем возможность удаления загруженных изображений
									dell_img_from_form();
										// добавляем возможность сортировки загруженных изображений
									drag_act();
								}, 1000);
								
								
							}
						});
					break;
				}
			}
				// загрузка на сервер
			form.append('upload[]', f[0]);
			form.append('params', params);
			request.open("POST", '/ajax/'+dirRoot+'/', true);
			request.send(form);
		}
			// до IE-10
	  }catch(e){
		if(error.length){	// есть ошибка загрузки
			error = error.join('<br />');
			main.find('div.info').html( "<span class='error'>" + error + '</span>' );
			$(this).val('');
		}else{
			upload_IE_act( $(this), params );
		}
	  }
	});
}



	// показываем сообщение в модальном окне
function message_block(text, href){
	$('.ekran').fadeIn(500);
	$('#modal_block form').animate( { top: '-130%' }, 500 );
	$('#modal_block .message_block .info').html(text);
	$('#modal_block .message_block').animate( { top: '150px' }, 500 );
	$('html, body').animate( { scrollTop: 0 }, "slow");
	setTimeout(function(){
		if( href ){ location.href = href; }
	}, 2500);
}

	// удаление изображений из формы
function dell_img_from_form(){
	$('.dell_img').unbind('mousedown');
	$('.dell_img').mousedown(function(){
		var el_number = $(this).closest('div').attr('data-count');
		if(el_number){	// для устаревших браузеров
			$(this).closest('div.file').find('input[data-count='+el_number+']').remove();
		}else{	// для остальных
			var val = $(this).closest('div.label').find('[name=e_drag]').val();
			name_f = $(this).closest('div').find('input').val();
			if( val ){
				$(this).closest('div.label').find('[name=e_drag]').val( val.replace( name_f, '' ) );
			}
			val = $(this).closest('div.label').find('[name=e_dell]').val();
			$(this).closest('div.label').find('[name=e_dell]').val( val + ',' + name_f );
		}
		$(this).closest('div').remove();
	}); 
}

	// действия для IE
function upload_IE_act( e, params ){
	// var new_el = e.clone();
	// e.after( new_el );
	// e.val('');
// return false;
	var parent = e.closest('div.file');
	var img = parent.find('.img');
		// параметры загрузчика
	par = $.parseJSON( params )
		// счетчик текущего элемента
	var el_number = e.attr('data-count');
		// количество существующих элементов
	var count = img.find('.img_cont').length;

		// дальше - если находимся в пределах лимита
	if( count < par.limit ){
		if( ( 1 + count ) >= par.limit ){
			parent.find('.start').hide();
		}
			// добавляем 1 раз 
		if( parent.find('input[name=params]').length < 1 ){
				// параметры для загрузчика
			parent.append("<input type='hidden' name='params' value='"+params+"' />");
			parent.append("<input type='hidden' name='countEl' value='' />");
		}
			// получаем имя файла
		var fileName = e.val();
		var fileName = e.val().split('\\');
		fileName = fileName[ fileName.length - 1 ];
			// содержимое блока под загружаемые файлы
		img.append( "<div class='e_drag img_cont' data-count='"+el_number+"'><span>"+fileName+"</span><a class='dell_img ie'>удалить</a><input type='hidden' value='"+fileName+"' /></div>" );
			// переносим input-file в контейнер
		var new_el = e.clone();
		parent.find( ".img_cont[data-count="+el_number+"]" ).append( new_el );
		new_el.removeClass('start');
			// очищаем стартовый input-file
		e.val('');
		e.attr('data-count', Number(el_number) + 1);
		parent.find('input[name=countEl]').val( img.find('.img_cont').length );
			// возобновляем события на элементы
		uploader_files();
		dell_img_from_form();
		drag_act();
	}
/* 
		var new_el = el.clone();
		new_el.attr('data-count', Number(el_number) + 1);
		new_el.val('');
			// получаем имя файла
		var val = el.val().split('\\');
		val = val[val.length - 1];
			// строим список загружаемых файлов
		var cont = $('.img').html();
		$('.img').html( cont + "<div class='e_drag' data-count='"+el_number+"'><span>"+val+"</span><a class='dell_img ie'>удалить</a><input type='hidden' value='"+val+"' /></div>" );
			// добавляем поле для загрузки еще одного файла
		el.after(new_el);
		el.removeClass('start');
		$('input[name=countEl]').val( $('.advert div.e_drag img').length );
		 */
		
}
/* 	// загрузчик файлов
function uploader_files(){
	$('input.start').change(function(e){
		
		var request = new XMLHttpRequest(), file = [], error = [], f = e.target.files, main = $(this).closest('.label'),
			params = $(this).attr('data-param') , img_block, name_f,
			dr = '/files/uploads/tmp/', par = $.parseJSON( params ), e_drag = $(this).closest('div.label').find('[name=e_drag]'),
			dirRoot = $(this).closest('form').find('[name=Type]').val();
		main.find('div.info').html('');
		if( ( 1 + $(this).closest('.file').find('.img_cont').length ) > par.limit){
			error.push('Количество файлов - не больше '+par.limit+'шт.'); }
	  try {
		
		if(par.type.indexOf( f[0].type) == -1){
			error.push('Формат допустимых к загрузке изображений - "jpg, png, gif".'); }
		if(f[0].size > par.size){
				error.push('Максимальный размер файла - не больше 3mb.'); }
		if(error.length){	// есть ошибка загрузки
			error = error.join('<br />');
			main.find('div.info').html( "<span class='error'>" + error + '</span>' ); 
			$(this).val('');
		}else{
			request.onload = function(){
				switch(request.responseText){
					case 'no':
						message_block("<p class='no'>Ошибка загрузки файла. Повторите попытку позже.</p>",false);
					break;
					default:
						// показываем миниатюру загруженного изображения
						$.ajax({
							type: 'POST', data: { 'Type':'showImg', 'ImageName':request.responseText, 'dr':dr, 'id':0 }, url: '/ajax/'+dirRoot+'/', dataType: 'text',
							success: function(data){
								img_block = main.find('.img').html() + data;
								main.find('.img').html(img_block);
								
									// заполняем форму списка изображений
								var val = e_drag.val();
								e_drag.val( val + ','+ request.responseText);
								
									// если в параметрах передан дополнительный скрипт, исполняем
								if(par.script){ eval(par.script); }
									
								setTimeout(function(){
										// добавляем возможность удаления загруженных изображений
									dell_img_from_form();
										// добавляем возможность сортировки загруженных изображений
									drag_act();
								}, 1000);
								
								
							}
						});
					break;
				}
			}
				// загрузка на сервер
			form = new FormData();
			form.append('upload[]', f[0]);
			form.append('params', params);
			request.open("POST", '/ajax/'+dirRoot+'/', true);
			request.send(form);
		}
			// до IE-10
	  }catch(e){
		if(error.length){	// есть ошибка загрузки
			error = error.join('<br />');
			main.find('div.info').html( "<span class='error'>" + error + '</span>' );
			$(this).val('');
		}else{
			upload_IE_act(params);
		}
	  }
	});
}



	// показываем сообщение в модальном окне
function message_block(text, href){
	$('.ekran').fadeIn(500);
	$('#modal_block form').animate( { top: '-130%' }, 500 );
	$('#modal_block .message_block .info').html(text);
	$('#modal_block .message_block').animate( { top: '150px' }, 500 );
	$('html, body').animate( { scrollTop: 0 }, "slow");
	setTimeout(function(){
		if( href ){ location.href = href; }
	}, 2500);
}

	// удаление изображений из формы
function dell_img_from_form(){
	$('.dell_img').mousedown(function(){
		var el_number = $(this).closest('div').attr('data-count');
		if(el_number){	// для устаревших браузеров
			$(this).closest('div.file').find('input[data-count='+el_number+']').remove();
		}else{	// для остальных
			var val = $(this).closest('div.label').find('[name=e_drag]').val();
			name_f = $(this).closest('div').find('input').val();
			if( val ){
				$(this).closest('div.label').find('[name=e_drag]').val( val.replace( name_f, '' ) );
			}
			val = $(this).closest('div.label').find('[name=e_dell]').val();
			$(this).closest('div.label').find('[name=e_dell]').val( val + ',' + name_f );
		}
		$(this).closest('div').remove();
	}); 
}

	// действия для IE
function upload_IE_act(params){
	var el = $('input.start');
	var el_number = el.attr('data-count');
	
//		console.log( el.attr('class') );
			// добавляем 1 раз
		if(!$('div.file input').is('[name=params]') ){
				// параметры для загрузчика
			$('div.file').append("<input type='hidden' name='params' value='"+params+"' />");
			$('div.file').append("<input type='hidden' name='countEl' value='' />");
		}
		var new_el = el.clone();
		new_el.attr('data-count', Number(el_number) + 1);
		new_el.val('');
			// получаем имя файла
		var val = el.val().split('\\');
		val = val[val.length - 1];
			// строим список загружаемых файлов
		var cont = $('.img').html();
		$('.img').html( cont + "<div class='e_drag' data-count='"+el_number+"'><span>"+val+"</span><a class='dell_img ie'>удалить</a><input type='hidden' value='"+val+"' /></div>" );
			// добавляем поле для загрузки еще одного файла
		el.after(new_el);
		el.removeClass('start');
		$('input[name=countEl]').val( $('.advert div.e_drag img').length );
		uploader_files();
		dell_img_from_form();
		drag_act();
		
} */

	// действия по сортировке перетаскиванием
function drag_act(){
  $('.e_drag').unbind('mousedown');
  $('.e_drag').dragdrop({
	makeClone: true,
	sourceHide: true,
	dragClass: "shadow",
	canDrag: function($src, event) {
		$srcElement = $src;
		srcIndex = $srcElement.index();
		dstIndex = srcIndex;
		return $src;
	},
	 canDrop: function($dst) {
		if (!$dst.is("div.e_drag")){
			$dst=$dst.closest("div.e_drag");
		}
		dstIndex = $dst.index();
		if (srcIndex<dstIndex){
			$srcElement.insertAfter($dst);
		}else{
			$srcElement.insertBefore($dst);
		}
		return true;
	},
	didDrop: function($src, $dst) {
		if (srcIndex!=dstIndex) {
			setTimeout(function(){
				var str = [];
				$('.e_drag').each(function(){
					str.push( $(this).find('input').val() );
				});
				$('[name=e_drag]').val( str.join(',') );
			}, 500);	
		}
	}
  });
}