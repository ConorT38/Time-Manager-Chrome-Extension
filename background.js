chrome.storage.sync.set({"userTimeConsumed": 0}, function() {
  });

  chrome.storage.sync.get(['userTimeConsumed'], function(result) {
    console.log('Value currently is ' + result.userTimeConsumed);
  });

var dailyTimeLimit = 10;

var sites = [];

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    chrome.storage.sync.get(['sites'], function(result) {
        console.log('All sites ' + result.sites);
        sites = result.sites;
      });
  });


for(var i = 0; i<sites.length; i++){
    var ctxUrl = "*://"+sites[i]+"/*";

    chrome.webNavigation.onCompleted.addListener(function() {
        var userTimeConsumed = 0;
        var timer = setInterval(function() {
    
            chrome.storage.sync.get(['userTimeConsumed'], function(result) {
                chrome.storage.sync.set({"userTimeConsumed": result.userTimeConsumed+1}, function() {
                    userTimeConsumed = result.userTimeConsumed+1;
                    console.log(result.userTimeConsumed)
                  });
              });
            
            if(userTimeConsumed >= dailyTimeLimit){
                chrome.tabs.query({url: ctxUrl},function(tab) {
                    for(var i=0; i<tab.length; i++){
                    chrome.tabs.remove(tab[i].id, function() { });
                    }
                 });
                  clearInterval(timer)
              }
          }, 1000);            
      }, {url: [{urlMatches : ctxUrl}]});
}

