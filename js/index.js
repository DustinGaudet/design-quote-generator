$(document).ready(function(){
  
  // prevent getJSON from caching API response
  $.ajaxSetup({ cache: false });
  
  // Make the API call
  getQuotes();
  
  // bind getQuotes to btn here
  $('#generate').on('click', getQuotes);
  
});

function getQuotes() {
  $.getJSON("https://cors-anywhere.herokuapp.com/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=")
    .done(updateHtml);
}

function updateHtml(json){
  // parse the json response because it is formatted as HTML (THANKS)
  var quoteEl = $.parseHTML(json[0].content);
  var quoteTxt = $(quoteEl).text();
  var sourceEl = $('<div/>').html(json[0].title);
  var sourceTxt = $(sourceEl).text();
  
  // Update all the quote and source elements
  // (Multiple were used for the visual effect)
  multiTextUpdate('.quote', quoteTxt);
  multiTextUpdate('.source', '- ' + sourceTxt);
  updateTweet(quoteTxt, sourceTxt);
}

// This function takes a selector and applies a 
// text update to each of its elements
function multiTextUpdate(selector, txt) {
  var arr = $(selector);
  for (var i = 0; i < arr.length; i++){
    $(arr[i]).text(txt);
  }
}

// updates the text and hashtag parameters
// for a twitter intent tweet generator
function updateTweet(quote, source){
  quote = encodeURI(quote);
  source = source.split(' ').join('');
  $('#tweet').attr('href', 'https://twitter.com/intent/tweet?text=' + quote + '&hashtags=' + source);
}