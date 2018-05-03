const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback, page) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      q: `${searchTerm}`,
      key: 'AIzaSyDrZQIOJs7kdA1lIk1aExpN01EGDfNeBh8',
      part: 'snippet',
      pageToken: `${page}`,
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
  };
  $.ajax(settings);
}

function renderResults(result) {
  return `
    <div>
      <a href='http://www.youtube.com/watch?v=${result.id.videoId}'><img src='${result.snippet.thumbnails.medium.url}'
      ></a>
      <h2> ${result.snippet.title} </h2>
      <p>See more from this <a href='http://www.youtube.com/channel/${result.snippet.channelId}'>channel</a></p>
    </div>
  `;
}

function displaySearchData(data) {
  const results = data.items.map((item, index) => renderResults(item));
  $('.js-search-results').html(results);
  $('.js-navResults').removeClass('hidden');
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val('');
    getDataFromApi(query, displaySearchData, '');
  });
}

function watchNext() {
  $('.js-next-results').click(event => {
    event.preventDefault();

  })
}

$(watchSubmit);
