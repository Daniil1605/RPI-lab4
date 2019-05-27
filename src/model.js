let news_array = [];
let sources_array = [];

let news_info = {
			displayed_news_count: 0,
			current_page: 1,
			current_source: '',
			current_q: '',
			all_loaded: false
		};


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

    function create_sources(data) {
    	sources_array.length = 0;
    	for (i=0; i<data.sources.length; i++)
    		sources_array[i] = data.sources[i];
    }
