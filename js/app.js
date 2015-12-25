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
          data: {resource_type: "game", api_key : "5afdc9b4e5bc62e549e77349e86e49c88dc07605", query: searchTerm, field_list : ["id", "name", "genres"] ,  format : "jsonp", json_callback : "gamer" },
          dataType: "JSONP"
        });


}
//trying to figure out how to pull genre data in, sketch out website first!
function gamer(data) {
	var searchTerm = $("#query").val();
	$('body').append('<h1>There are ' + data.number_of_total_results +' results for ' + searchTerm + '</h1');
	$.each(data.results, function (index, item) {
	$('body').append('<ul><li>' + item.name +  ': ' + '<a href="' + item.site_detail_url + '">' + item.site_detail_url + '</a>' + ' Genre: ' + item.genres + ' ' + item.image + '</li></ul>')
})

$.each( data.results,  function( index, item ) {
  console.log( item);
});

}

// how to have var searchTerm = $("#query").val(); only one time in entire query?