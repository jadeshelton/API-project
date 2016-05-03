//need to figure out how to get api_detail_url from first ajax call and pass into second ajax call to reutrn more game data.  Then have access to all data.

$(document).ready(function () {

/*once user submits query, run this function*/
	$("#search-term").submit(function(event) {
		var searchTerm = $("#query").val();
		event.preventDefault();
		$('nav').html('<h2 class="results-title">RESULTS GENERATING FOR ' + searchTerm.toUpperCase() + '</h2>');
		$('ul').html('');
		getRequest(searchTerm);
		$("body").css("cursor", "wait");
		});

});

/*API parameter data*/
function getRequest(searchTerm){
        $.ajax({
          url: "http://api.giantbomb.com/search/",
          type: "GET",
         // crossDomain : true,
          data: {resources: "game", 
          		api_key : "5afdc9b4e5bc62e549e77349e86e49c88dc07605", 
          		query: searchTerm, 
          		field_list: "api_detail_url,name,deck,original_release_date,image,platforms,original_game_rating,site_detail_url", 
          		format : "jsonp", 
          		//limit: 2,
          		json_callback : "gamer" 
          	},
          dataType: "JSONP",
          complete: function (data) {
        console.log(data);
    }

        });
      //  console.log(getRequest);
      
}

//What to do with results returned from API 
function gamer(data) {

	var searchTerm = $("#query").val();
	var releaseDate 
	$("body").css("cursor", "default");
	$('nav').html('');
	$('nav').append('<h2 class="results-title">THERE ARE ' + data.number_of_total_results + ' RESULTS FOR ' + searchTerm.toUpperCase() + '</h2>')

	$.each(data.results, function (index, item) {
		var apiDetailUrl = item.api_detail_url
	//	console.log(apiDetailUrl);

	if (item.platforms !== null && item.platforms !== undefined) {
		var thePlatforms = [];
		for (i = 0; i < item.platforms.length; i++) {
			thePlatforms.push(' ' + 	'<a href= "' + item.platforms[i].site_detail_url + '">' + item.platforms[i].name + '</a>'); 
			console.log(item.platforms[i].name);
		}
	}
	else {
		var thePlatforms = 'N/A';
	};


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
	var ratingValue = [];
	for (i = 0; i < item.original_game_rating.length; i++) {
		ratingValue.push(' ' + item.original_game_rating[i].name)
	}
	};

	if (item.original_release_date === undefined || item.original_release_date === null) {
		var itemReleaseDate = 'N/A';
	}
	else {
		var itemReleaseDate = item.original_release_date.substring(0,10);
	}

	//append data in list format
	$('ul').append('<li><div id="vg-name-and-desc"><div id="game-name"><h4>' + item.name + '</h4></div><div class="img-desc"><div id="game-image"><img src="' + imageValue.thumb_url + '" alt=game-image title="game-image"></div><div id="game-desc"><p>' + deckValue + '</p></div></div></div><div id="vg-rank-and-info"><div class="information" id="game-genre"><h3>Release Date: ' + itemReleaseDate + '</h3></div><div class="information" id="game-rank"><h3>Ranking: ' + ratingValue + '</h3></div><div class="information" id="game-platforms"><h3>Platforms: ' + /*item.platforms[0].name*/ thePlatforms + '</h3></div><div class="information" id="game-link"><h3>Link: <a href="' + item.site_detail_url + '">Link to game data</a></h3></div></div></li>')	
})

//console log data to review
$.each( data.results,  function( index, item ) {
	console.log(item);
	console.log(item.resource_type);
});

}
