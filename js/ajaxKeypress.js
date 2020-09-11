$(document).on('click','ul#pruducts li',function(){
	var id = $(this).closest('div');
	id = id.attr('id');
	var input = $('div[id="'+id+'"] input.trigger-prod');
	var input2 = $('div[data-prodId="'+id+'"] input.trigger-prod-id');
	input.val($(this).attr('value'));
	input2.val($(this).attr('data-id'));
	$('div[id="'+id+'"] ul#pruducts').css('display','none');
})

$(document).on('click', function(){
	$('ul#pruducts').css('display','none');
})

$(document).ready(function(){
	$('input.trigger-prod').keyup(function(){
		var id = $(this).closest('div');
		id = id.attr('id');
		
		var search = $(this).val();
		var input2 = $('div[data-prodId="'+id+'"] input.trigger-prod-id');
		if(search == '' || search == ' '){
			input2.val('');
		}

		$.post('/ajax/ajaxCatalog/', 'string='+search, function(data){
			data = JSON.parse(data);
			var selector = 'div[id="'+id+'"] ul#pruducts';
			console.log(data);
			$(selector).html(data);
			$(selector).css('display','block');
		})
	})
	
})	
	