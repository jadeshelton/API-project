$(function(){

	$("#search-term").submit(function(event) {
		event.preventDefault();
		//$('#search-results').html('');
		var searchTerm = $("#query").val();
		getRequest(searchTerm);
		//$('nav').html('<h2 class="results-title">Results</h2>');
		});
});



function getRequest(searchTerm){
        $.ajax({
          url: "http://api.giantbomb.com/api/search/",
          type: "GET",
          data: {limit: 4, resources: "game", api_key : "5afdc9b4e5bc62e549e77349e86e49c88dc07605", query: searchTerm, field_list : ["id", "name", "genres", "description", "platforms"] ,  format : "jsonp", json_callback : "gamer" },
          dataType: "JSONP"
          
        });


}
//trying to figure out how to pull genre data in, sketch out website first!
function gamer(data) {
	var searchTerm = $("#query").val();
	$('nav').html('');
	$('nav').append('<h2 class="results-title">There are ' + data.number_of_total_results + ' Results for ' + searchTerm + '</h2>')
	//$('body').append('<h1>There are ' + data.number_of_total_results +' results for ' + searchTerm + '</h1');
	$.each(data.results, function (index, item) {
	
	//$('ul').append('dddddd')
	$('ul').append('<li><div id="vg-name-and-desc"><div id="game-name"><h4>' + item.name + '</h4></div><div class="img-desc"><div id="game-image"><img src="' + item.image + '" alt="Quiz-app" title="Quiz App"></div><div id="game-desc"><p>' + item.description + '</p></div></div></div><div id="vg-rank-and-info"><div class="information" id="game-genre"><h3>Genre: ' + item.genre + '</h3></div><div class="information" id="game-rank"><h3>Ranking: ' + item.rank + '</h3></div><div class="information" id="game-platforms"><h3>Platforms: ' + item.platforms + '</h3></div><div class="information" id="game-link"><h3>Link: <a href="' + item.link + '">Link to game data</a></h3></div></div></li>')	
	//$('body').append('<ul><li>' + item.name +  ': ' + '<a href="' + item.site_detail_url + '">' + item.site_detail_url + '</a>' + ' Genre: ' + item.genres + ' ' + item.image + '</li></ul>')
})

$.each( data.results,  function( index, item ) {
  console.log( item);
});

}

// how to have var searchTerm = $("#query").val(); only one time in entire query?