!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){let n=[],r=[],o={displayed_news_count:0,current_page:1,current_source:"",current_q:"",all_loaded:!1};function c(e){let t=`https://newsapi.org/v2/top-headlines?${""!=e.current_q?"q="+e.current_q+"&":""}${""!=e.current_source?"sources="+e.current_source+"&":"country=us&category=science&"}pageSize=5&page=${e.current_page}&apiKey=75ca9bece7084212836d148fab000e0d`;return fetch(new Request(t))}function u(e,t){let n=news__template.content.cloneNode(!0);n.querySelector(".news__template__image").src=e.urlToImage,n.querySelector(".news__template__title").innerHTML=e.title,n.querySelector(".news__template__description").innerHTML=e.description,n.querySelector(".news__template__link").href=e.url,t.appendChild(n)}function l(e,t){let n=template__source.content.cloneNode(!0);n.querySelector(".template__source__id").innerHTML=e.id,n.querySelector(".template__source__button").title=e.description,t.appendChild(n)}function s(e,t){let n=document.createDocumentFragment();for(i=0;i<e.length;i++)u(e[i],n);document.querySelector(".news-block__news-list").appendChild(n),t.all_loaded?document.querySelector(".load-more-button").style.display="none":document.querySelector(".load-more-button").style.display="",0==t.displayed_news_count&&(document.querySelector(".news-block__no-articles-message").style.display="block")}function a(){let e=document.getElementsByClassName("news__template__link");for(i=0;i<e.length;)e[i].remove();document.querySelector(".news-block__no-articles-message").style.display="none",document.querySelector(".load-more-button").style.display="none"}function d(e,t){if(n.length=0,t.displayed_news_count<40){for(i=0;i<e.articles.length;i++)n[i]=e.articles[i];t.displayed_news_count+=e.articles.length,t.current_page++}t.all_loaded=e.totalResults==t.displayed_news_count||40==t.displayed_news_count}fetch(new Request("https://newsapi.org/v2/sources?country=us&category=science&apiKey=75ca9bece7084212836d148fab000e0d")).then(e=>e.json()).then(e=>(function(e){for(r.length=0,i=0;i<e.sources.length;i++)r[i]=e.sources[i]})(e)).then(()=>(function(e){let t=document.createDocumentFragment();for(i=0;i<e.length;i++)l(e[i],t);document.querySelector(".source-block").appendChild(t)})(r)).then(()=>void document.querySelector(".source-block").addEventListener("click",function(){o.current_page=1,o.displayed_news_count=0,o.current_source=function(e){for(;"BUTTON"!==e.tagName;)return e.parentNode}(event.target).querySelector(".template__source__id").innerHTML,a(),c(o).then(e=>e.json()).then(e=>d(e,o)).then(()=>s(n,o))})),c(o).then(e=>e.json()).then(e=>d(e,o)).then(()=>s(n,o)),document.querySelector(".load-more-button").addEventListener("click",function(){c(o).then(e=>e.json()).then(e=>d(e,o)).then(()=>s(n,o))}),document.querySelector(".find-button").addEventListener("click",function(){o.current_page=1,o.displayed_news_count=0,o.current_q=document.querySelector(".find-input").value,a(),c(o).then(e=>e.json()).then(e=>d(e,o)).then(()=>s(n,o))}),document.querySelector(".find-input").addEventListener("keydown",function(){13==event.keyCode&&(o.current_page=1,o.displayed_news_count=0,o.current_q=document.querySelector(".find-input").value,a(),c(o).then(e=>e.json()).then(e=>d(e,o)).then(()=>s(n,o)))})}]);