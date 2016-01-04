
$(document).ready(function () {

/*once user submits query, run this function*/
	$("#search-term").submit(function(event) {
		var searchTerm = $("#query").val();
		event.preventDefault();
		$('nav').html('<h2 class="results-title">Results Generating for ' + searchTerm + '</h2>');
		$('ul').html('');
		var searchTerm = $("#query").val();
		getRequest(searchTerm);
		$("body").css("cursor", "wait");
		});

});

/*API parameter data*/
function getRequest(searchTerm){
        $.ajax({
          url: "http://api.giantbomb.com/search/",
          type: "GET",
          data: {resources: "game", api_key : "5afdc9b4e5bc62e549e77349e86e49c88dc07605", query: searchTerm, field_list: "name,deck,original_release_date,image,platforms,original_game_rating,site_detail_url" /*"name,deck,platforms,image,genres,original_release_date"*/, format : "jsonp", json_callback : "gamer" },
          dataType: "JSONP",
        });

}

/*What to do with results returned from API*/
function gamer(data) {

	var searchTerm = $("#query").val();
	$("body").css("cursor", "default");
	$('nav').html('');
	$('nav').append('<h2 class="results-title">There are ' + data.number_of_total_results + ' Results for ' + searchTerm + '</h2>')

	$.each(data.results, function (index, item) {

	if (item.deck === undefined || item.deck === null) {
     var deckValue = 'N/A';
	}
	else {
	var deckValue = item.deck;
	};

	if (item.image === undefined || item.image === null) {
     var imageValue = 'N/A';
	}
	else {
	var imageValue = item.image;
	};

	if (item.original_game_rating === undefined || item.original_game_rating === null) {
     var ratingValue = 'N/A';
	}
	else {
	var ratingValue = item.original_game_rating[0].name;
	}

	/*append data in list format*/
	$('ul').append('<li><div id="vg-name-and-desc"><div id="game-name"><h4>' + item.name + '</h4></div><div class="img-desc"><div id="game-image"><img src="' + imageValue.icon_url + '" alt=game-image title="game-image"></div><div id="game-desc"><p>' + deckValue + '</p></div></div></div><div id="vg-rank-and-info"><div class="information" id="game-genre"><h3>Release Date: ' + item.original_release_date + '</h3></div><div class="information" id="game-rank"><h3>Ranking: ' + ratingValue + '</h3></div><div class="information" id="game-platforms"><h3>Platforms: ' + item.platforms[0].name + '</h3></div><div class="information" id="game-link"><h3>Link: <a href="' + item.site_detail_url + '">Link to game data</a></h3></div></div></li>')	

})

/*console log data to review*/
$.each( data.results,  function( index, item ) {
  console.log( item);
});

}
