/* eslint-env browser */
/* global $ */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server
$(document).ready(function () {

  loadTweets();

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweetdata) {
        renderTweets(tweetdata);
        $('.counter').html(140)
      }
    })
  }


  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  function createTweetElement(tweet) {
    let dateCreated = humanizeDuration(new Date() - tweet.created_at, {units: ['d', 'm'], round:true})
    let $tweet = $(`<article class='tweet'> 

  <header>
  <img src="${escape(tweet.user.avatars.small)}">
  <h2>${escape(tweet.user.name)}</h2>
  <span class='user-handle'>${escape(tweet.user.handle)}</span>
  </header>
  
  <p>${escape(tweet.content.text)}</p> 
  <footer> 
  <span class ='icons'> 
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
  </span>
   ${dateCreated}
  </footer>
</article>`)
    $tweet.find('.fa-heart').on('click', function(){
      //$tweet.addClass('.red')
      console.log('Clicked/', tweet.content.text);
      $.ajax('/tweets/likes', {
        method:'POST', 
      })
    });

    return $tweet;
  }

  function renderTweets(tweets) {
    $('#tweets-container .fa-heart').off('click');
    $('#tweets-container').empty();
    for (let i = 0; i < tweets.length; i++) {
      $('#tweets-container').prepend(createTweetElement(tweets[i]));
    }
     
  }

  


  $('.new-tweet form').on('submit', function (tweet) {
    tweet.preventDefault();
    var data = $('.new-tweet form').serialize();
    var textAreaLength = $('.new-tweet form textarea').val();
    if (textAreaLength.length === 0) {
      alert('Text area cannot be empty')
    } else if (textAreaLength.length > 140) {
      alert('Text can not be more than 140 characters!')
    } else {
      $.ajax('/tweets', {
        method: 'POST',
        data: data
      }).done(function (res) {
        loadTweets(res);
        $('form textarea').val(''); 
      })
    }
  })

  

  $('#nav-bar button').click(function () {
    $('section.new-tweet').slideToggle("slow");
    $('section.new-tweet textarea').focus().select();
  });

});