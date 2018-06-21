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
      }
    })
  }


  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  function createTweetElement(tweet) {
    let $tweet = `<article class='tweet'> 
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
  ${escape(tweet.created_at)}
  </footer>
</article>`
    return $tweet;
  }

  function renderTweets(tweets) {
    $('#tweets-container').empty()
    for (let i = 0; i < tweets.length; i++) {
      $('#tweets-container').prepend(createTweetElement(tweets[i]));
    }
  }


  $('form').on('submit', function (tweet) {
    tweet.preventDefault();
    var data = $('form').serialize();
    var textAreaLength = $('form textarea').val();
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
        $('form textarea').val('')
      })
    }
  })


  $('#nav-bar button').click(function () {
    $('section.new-tweet').slideToggle("slow");
    $('section.new-tweet textarea').focus().select();
  });

});