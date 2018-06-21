/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server
$(document).ready(function () {

  loadTweets();

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}


// Fake data taken from tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

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
  for(let i = 0; i < tweets.length; i++) {
      $('#tweets-container').prepend(createTweetElement(tweets[i]));
  }

}


$('form').on('submit', function(tweet){
  tweet.preventDefault(); 
  var data = $('form').serialize(); 
  var textAreaLength = $('form textarea').val(); 
  if(textAreaLength.length === 0) {
    alert('Text area cannot be empty')
  } else if (textAreaLength.length > 140) {
    alert('Text can not be more than 140 characters!')
  } else {
    $.ajax('/tweets', {
      method: 'POST', 
      data: data
    }).done(function(res){
      loadTweets(res); 
      $('form textarea').val('')
    })
  }

  $('#nav-bar button').click(function() {
    $('section.new-tweet').slideToggle("slow");
    $('section.new-tweet textarea').focus().select(); 
  
  }); 

})

function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function(tweetdata) {
      renderTweets(tweetdata);}
  })
}

}); 







