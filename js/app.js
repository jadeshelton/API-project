$(function(){

	$("#search-term").submit(function(event) {
		event.preventDefault();
		$('#search-results').html('');
		var searchTerm = $("#query").val();
		getRequest(searchTerm);
		});
});



function getRequest(searchTerm){
        $.ajax({
          url: "http://api.giantbomb.com/search/",
          type: "GET",
          data: {api_key : "5afdc9b4e5bc62e549e77349e86e49c88dc07605", query: searchTerm, field_list : "name, image, platforms", format : "jsonp", json_callback : "gamer" },
          dataType: "JSONP"
        });
}

function gamer(data) {
	var searchTerm = $("#query").val();
	$('body').append('<h1>There are ' + data.number_of_total_results + ' results for ' + searchTerm + '</h1>')
	$.each(data.results, function(index, data) {
    $('body').append('<p>' + data.name + ' ' + data.resource_type + '</p>');
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