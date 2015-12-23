$(function(){

	$("#search-term").submit(function(event) {
		event.preventDefault();
		$('#search-results').html('');
		var searchTerm = $("#query").val();
		getRequest(searchTerm);
		});
});

function getRequest(searchTerm){
	/*	var params = {
			api_key : "5afdc9b4e5bc62e549e77349e86e49c88dc07605", 
			query: "crash bandicoot", 
			field_list : "name, platforms", 
			format : "jsonp"
		};
		url = 'http://api.giantbomb.com/search/',
		$.getJSON(url, params, function(data) {
			showResults(data.results);
	});*/
        $.ajax({
          url: "http://api.giantbomb.com/search/",
          type: "GET",
          data: {api_key : "5afdc9b4e5bc62e549e77349e86e49c88dc07605", query: "crash bandicoot", field_list : "name, image, platforms", format : "jsonp", json_callback : "gamer" },
          dataType: "JSONP"
        });
}

/*
function showResults(results){
	$.each(results, function(index, item){
		console.log(item);
	});
}
*/
function gamer(data) {
	$.each(data.results, function(index, value) {
    $('body').append('Found ' + value + ' results for ' + query);
});

    // var games = data.game;
//this works console.table(data.results, ['name','platforms']);
  /*  $.each(data.results, function(index, value) {
    	console.table(index + value)
    });*/
//this works	 console.table(data.results, ['name','platforms']);
	// var result = $.grep(data.results, function(e){ return e.name; });
//	 $('body').append('<h1>' +   data.results + '</h1>');
       // alert( $( "body" ).data( data.results ) ); // undefined
$.each( data.results, function( index, value ) {
  console.log( value );
});

}