function displayResult(item, val, text, netValue) {
	console.log(item);
	console.log(val);
	console.log(text);
	console.log(netValue);
	$('#fundCode').val(netValue);
	
	$('.alert').show().html('You selected <strong>' + text + '</strong>: <strong>' + val+ '</strong>');
};