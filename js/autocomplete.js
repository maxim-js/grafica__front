$('input[name="title"]').change(function(){
	var Value = $(this).val();
	var ValueLow = Value.toLowerCase();
	var ValueSplited = ValueLow.split('');
	
	for(var i = 0; i <= ValueSplited.length-1; i++){
		switch (ValueSplited[i]) {
			case 'а':
				ValueSplited[i] = 'a';
				break;
			case 'б':
				ValueSplited[i] = 'b';
				break;
			case 'в':
				ValueSplited[i] = 'v';
				break;
			case 'г':
				ValueSplited[i] = 'g'
				break;
			case 'д':
				ValueSplited[i] = 'd';
				break;
			case 'е':
				ValueSplited[i] = 'e';
				break;
			case 'ё':
				ValueSplited[i] = 'e';
				break;
			case 'ж':
				ValueSplited[i] = 'zh';
				break;
			case 'з':
				ValueSplited[i] = 'z';
				break;
			case 'и':
				ValueSplited[i] = 'i';
				break;
			case 'й':
				ValueSplited[i] = 'y';
				break;
			case 'к':
				ValueSplited[i] = 'k';
				break;
			case 'л':
				ValueSplited[i] = 'l';
				break;
			case 'м':
				ValueSplited[i] = 'm';
				break;
			case 'н':
				ValueSplited[i] = 'n';
				break;
			case 'о':
				ValueSplited[i] = 'o';
				break;
			case 'п':
				ValueSplited[i] = 'p';
				break;
			case 'р':
				ValueSplited[i] = 'r';
				break;
			case 'с':
				ValueSplited[i] = 's';
				break;
			case 'т':
				ValueSplited[i] = 't';
				break;
			case 'у':
				ValueSplited[i] = 'u';
				break;
			case 'ф':
				ValueSplited[i] = 'f';
				break;
			case 'х':
				ValueSplited[i] = 'h';
				break;
			case 'ц':
				ValueSplited[i] = 'ts';
				break;
			case 'ч':
				ValueSplited[i] = 'ch';
				break;
			case 'ш':
				ValueSplited[i] = 'sh'
				break;
			case 'щ':
				ValueSplited[i] = 'sh';
				break;
			case 'ъ':
				ValueSplited[i] = '';
				break;
			case 'ы':
				ValueSplited[i] = 'i';
				break;
			case 'ь':
				ValueSplited[i] = '';
				break;
			case 'э':
				ValueSplited[i] = 'e';
				break;
			case 'ю':
				ValueSplited[i] = 'yu';
				break;
			case 'я':
				ValueSplited[i] = 'ya';
				break;
			case ' ':
				ValueSplited[i] = '-'
				break;
			case '!':
				ValueSplited[i] = ''
				break;
			case '@':
				ValueSplited[i] = ''
				break;	
			case '?':
				ValueSplited[i] = ''
				break;	
			case '$':
				ValueSplited[i] = ''
				break;	
			case '(':
				ValueSplited[i] = ''
				break;		
			case '^':
				ValueSplited[i] = ''
				break;	
			case ')':
				ValueSplited[i] = ''
				break;	
			case '*':
				ValueSplited[i] = ''
				break;	
			case '=':
				ValueSplited[i] = ''
				break;
			case '+':
				ValueSplited[i] = ''
				break;
			case '|':
				ValueSplited[i] = ''
				break;
			case '/':
				ValueSplited[i] = ''
				break;												
			case ':':
				ValueSplited[i] = ''
				break;
			case ';':
				ValueSplited[i] = ''
				break;
			case '.':
				ValueSplited[i] = ''
				break;		
			case '~':
				ValueSplited[i] = ''
				break;	
				
			default:
				ValueSplited[i] = ValueSplited[i];																															
		}
	}
	var ValueJoined = ValueSplited.join('');
	$('input[name="Link"]').val(ValueJoined);
	//console.log(ValueJoined);
	
})