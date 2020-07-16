chrome.storage.sync.set({"userTimeConsumed": 0}, function() {
  });

  chrome.storage.sync.get(['userTimeConsumed'], function(result) {
    console.log('Value currently is ' + result.key);
  });

var dailyTimeLimit = 10;
var userTimeConsumed = 0;
var ctxUrl = "https://www.youtube.com/*";

chrome.webNavigation.onCompleted.addListener(function() {
    var timer = setInterval(function() {

        chrome.storage.sync.get(['userTimeConsumed'], function(result) {
            chrome.storage.sync.set({"userTimeConsumed": result.userTimeConsume+1}, function() {
                console.log('Value is set to ' + result.userTimeConsume+1);
              });
          });
        
        userTimeConsumed += 1;
        if(userTimeConsumed >= dailyTimeLimit){
            chrome.tabs.query({url: ctxUrl},function(tab) {
                for(var i=0; i<tab.length; i++){
                chrome.tabs.remove(tab[i].id, function() { });
                }
             });
             alert("You have exceeded your daily limit on: "+ctxUrl);
              clearInterval(timer)
          }
      }, 1000);            
  }, {url: [{urlMatches : ctxUrl}]});
