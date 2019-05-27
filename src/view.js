function create_news_block(answer, fragment) {
	let token = news__template.content.cloneNode(true);
	token.querySelector('.news__template__image').src = answer.urlToImage;
	token.querySelector('.news__template__title').innerHTML = answer.title;
	token.querySelector('.news__template__description').innerHTML = answer.description;
	token.querySelector('.news__template__link').href = answer.url;
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
