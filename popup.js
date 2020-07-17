document.getElementById("addSiteBtn").addEventListener("click", addSite);
document.getElementById("closeBtn").addEventListener("click", closeWindow);

var sites = [];

chrome.storage.sync.get(['sites'], function(result) {
    if(result.sites === undefined || result.sites.length < 1 ){
        sites = []
    } else{
        sites = result.sites;
        for(var i=0; i<result.sites.length;i++){
            let siteList = document.getElementById("sitesList");

            const siteElement = document.createElement("li")
            const siteDeleteBtnElement = document.createElement("button");

            siteElement.className = "list-group-item";
            siteElement.id = i;
            siteElement.innerHTML = result.sites[i];

            siteDeleteBtnElement.className = "close";
            siteDeleteBtnElement.id = "delete-"+i;
            siteDeleteBtnElement.innerHTML = "<span aria-hidden=\"true\">&times;</span>";

            siteElement.appendChild(siteDeleteBtnElement);
            siteList.appendChild(siteElement);

            const el = document.getElementById("delete-"+i);
            el.addEventListener("click", deleteSite.bind(el,i));
          }
    }
  });
  console.log(sites);
  

    function addSite(){
        var site = document.getElementById("sitesinput").value;
        document.getElementById("sitesinput").value = "";

        let siteList = document.getElementById("sitesList");

        const siteElement = document.createElement("li")
        const siteDeleteBtnElement = document.createElement("button");

        siteElement.className = "list-group-item";
        siteElement.id = (sites.length+1);
        siteElement.innerHTML = site;

        siteDeleteBtnElement.className = "close";
        siteDeleteBtnElement.id = "delete-"+(sites.length+1);
        siteDeleteBtnElement.innerHTML = "<span aria-hidden=\"true\">&times;</span>";

        siteElement.appendChild(siteDeleteBtnElement);
        siteList.appendChild(siteElement);

        const el = document.getElementById("delete-"+(sites.length+1));
        el.addEventListener("click", deleteSite.bind(el,sites.length+1));
        sites.push(site);

        chrome.storage.sync.set({"sites": sites}, function() {
            console.log("Site added:"+sites);
        });
        
    }

    function deleteSite(x){
        document.getElementById(x).innerHTML = "";
        sites.splice(x,x+1);
        
        chrome.storage.sync.set({"sites": sites}, function() {
            console.log("sites: "+sites);
        });
    }

    function closeWindow(){
        window.close();
    }