
 function get_sources() {
	 let source_url = "https://newsapi.org/v2/sources?country=us&apiKey=75ca9bece7084212836d148fab000e0d";
	 return fetch(new Request(source_url));
 }

 function get_news(info) {
  	let news_url = `https://newsapi.org/v2/top-headlines?${info.current_q != '' ? "q=" + info.current_q + "&" : ''}${info.current_source != '' ? "sources=" + info.current_source + "&" : "country=us&"}pageSize=5&page=${info.current_page}&apiKey=75ca9bece7084212836d148fab000e0d`;
  	return fetch(new Request(news_url));
 }

		get_sources()
		.then(response => { return response.json() })
		.then(data => create_sources(data))
		.then(() => show_sources(sources_array))
		.then(() => set_sources_eventListeners());

		get_news(news_info)
		.then (response => { return response.json() })
		.then(data => update_news(data, news_info))
		.then(() => show_news(news_array, news_info));

function set_sources_eventListeners() {
   	document.querySelector('.source-block').addEventListener('click', function() {
		news_info.current_page = 1;
		news_info.displayed_news_count = 0;
		news_info.current_source = find_source_button(event.target).querySelector('.template__source__id').innerHTML;
		clear_news();
		get_news(news_info)
		.then(response => { return response.json() })
		.then(data => update_news(data, news_info))
		.then(() => show_news(news_array, news_info));
	});
}

function find_source_button(elem)
{
	while (elem.tagName !== 'BUTTON')
	return elem.parentNode;
}

document.querySelector('.load-more-button').addEventListener('click', function() {
	get_news(news_info)
	.then (response => { return response.json() })
	.then(data => update_news(data, news_info))
	.then(() => show_news(news_array, news_info));
});

document.querySelector('.find-button').addEventListener('click', function() {
	news_info.current_page = 1;
	news_info.displayed_news_count = 0;
	news_info.current_q = document.querySelector('.find-input').value;
	clear_news();
	get_news(news_info)
	.then (response => { return response.json() })
	.then(data => update_news(data, news_info))
	.then(() => show_news(news_array, news_info));
});

document.querySelector('.find-input').addEventListener('keydown', function() {
	if (event.keyCode == 13)
	{
		news_info.current_page = 1;
		news_info.displayed_news_count = 0;
		news_info.current_q = document.querySelector('.find-input').value;
		clear_news();
		get_news(news_info)
		.then (response => { return response.json() })
		.then(data => update_news(data, news_info))
		.then(() => show_news(news_array, news_info));
	}
});
