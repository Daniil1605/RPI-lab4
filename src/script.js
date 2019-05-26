let news_array = [];
let sources_array = [];

let news_info = {
			displayed_news_count: 0,
			current_page: 1,
			current_source: '',
			current_q: '',
			all_loaded: false
		};

		get_sources()
		.then(response => { return response.json() })
		.then(data => update_sources(data))
		.then(() => show_sources(sources_array))
		.then(() => set_sources_eventListeners());

		get_news(news_info)
		.then (response => { return response.json() })
		.then(data => update_news(data, news_info))
		.then(() => show_news(news_array, news_info));

function get_sources() {
	let source_url = "https://newsapi.org/v2/sources?country=us&category=science&apiKey=75ca9bece7084212836d148fab000e0d";
	return fetch(new Request(source_url));
}

function get_news(info) {
	let news_url = `https://newsapi.org/v2/top-headlines?${info.current_q != '' ? "q=" + info.current_q + "&" : ''}${info.current_source != '' ? "sources=" + info.current_source + "&" : "country=us&category=science&"}pageSize=5&page=${info.current_page}&apiKey=75ca9bece7084212836d148fab000e0d`;
	return fetch(new Request(news_url));
}

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

function create_news_block(article, fragment) {
	let token = news__template.content.cloneNode(true);
	token.querySelector('.news__template__image').src = article.urlToImage;
	token.querySelector('.news__template__title').innerHTML = article.title;
	token.querySelector('.news__template__description').innerHTML = article.description;
	token.querySelector('.news__template__link').href = article.url;
	fragment.appendChild(token);
}

function create_source_list(source, fragment) {
	let token = template__source.content.cloneNode(true);
	token.querySelector('.template__source__id').innerHTML = source.id;
	token.querySelector('.template__source__button').title = source.description;
	fragment.appendChild(token);
}

function show_news(news_array, info) {
	let fragment = document.createDocumentFragment();
	for (i=0; i<news_array.length; i++) {
		create_news_block(news_array[i], fragment);
	}
	document.querySelector('.news-block__news-list').appendChild(fragment);
	if (info.all_loaded)
		document.querySelector('.load-more-button').style.display = 'none';
	else
		document.querySelector('.load-more-button').style.display = '';
	if (info.displayed_news_count == 0)
		document.querySelector('.news-block__no-articles-message').style.display = 'block';
}

function show_sources(sources_array) {
	let fragment = document.createDocumentFragment();
	for (i=0; i<sources_array.length; i++) {
		create_source_list(sources_array[i], fragment);
	}
	document.querySelector('.source-block').appendChild(fragment);
}

function clear_news() {
	let list = document.getElementsByClassName('news__template__link');
	for (i=0; i<list.length;)
		list[i].remove();
	document.querySelector('.news-block__no-articles-message').style.display = 'none';
	document.querySelector('.load-more-button').style.display = 'none';
}

function update_news(data, info) {
	news_array.length = 0;
	if (info.displayed_news_count < 40) {
		for (i=0; i<data.articles.length; i++)
			news_array[i] = data.articles[i];
		info.displayed_news_count += data.articles.length;
		info.current_page++;
	}
	info.all_loaded = (data.totalResults == info.displayed_news_count || info.displayed_news_count == 40);
}

function update_sources(data) {
	sources_array.length = 0;
	for (i=0; i<data.sources.length; i++)
		sources_array[i] = data.sources[i];
}
