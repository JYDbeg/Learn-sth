var windowsActived = {
    active: true,
    windowId: chrome.windows.WINDOW_ID_CURRENT 
};
const contents = document.getElementById("tabs");
const deleteTabs = document.getElementById("deleteTabs");
document.addEventListener("DOMContentLoaded", function(){
  const btn = document.getElementById("btn");
  btn.addEventListener("click", function(){
      chrome.windows.getAll({populate:true},function(windowsArray){
        while(contents.firstChild){
          contents.removeChild(contents.firstChild);
        };
        btn.innerHTML="タブ情報を更新する";
        for(let windowsId=0;windowsId<windowsArray.length;windowsId++){
          chrome.tabs.query({windowId: windowsArray[windowsId]["id"]},function(tabs){
            let windowDiv = document.createElement("div");
            windowDiv.classList.add("getWindow");
            let windowTitle = document.createElement("h2");
            windowTitle.innerHTML = "Window:"+windowsId;
            windowDiv.appendChild(windowTitle);
            contents.appendChild(windowDiv);
            for(let index=0; index<tabs.length; index++){
              let url = tabs[index].url; 
              let title = tabs[index].title;  
              let favIconUrl = tabs[index].favIconUrl; 
              let id = tabs[index].id;
              let li = document.createElement("li");
              let img = document.createElement("img");
              img.src = favIconUrl;
              img.classList.add("icon");
              let a = document.createElement("a");
              a.href = url;
              a.innerHTML = title;
              let button = document.createElement("button");
              button.value = `${id},${windowsArray[windowsId]["id"]}`;
              button.classList.add("button");
              button.innerHTML ="削除";
              button.addEventListener("click",function(){
                let deleted = this.parentNode.cloneNode(true);
                deleted.querySelector(".changeWindowButton").addEventListener("click",function(){
                    let target = parseInt(this.parentNode.querySelector("select").value);
                    let deletedUrl = deleted.querySelector("a").href;
                    chrome.tabs.create({active: false,url:deletedUrl,windowId:target},function(){
                      deleted.remove();
                    });
                    chrome.tabs.remove(parseInt(this.parentNode.querySelector(".button").value.split(",")[0]),function(){
                      console.log("remove tab");
                    });
                    let isId = (element) => element.id == target;
                    let tabswindow = document.getElementsByClassName("getWindow")[windowsArray.findIndex(isId)];
                    tabswindow.appendChild(deleted);
                });
                let deletedBtn = deleted.querySelector(".button");
                let deletedUrl = deleted.querySelector("a").href;
                //deletedBtn.removeEventListener("click",arguments.callee);
                deletedBtn.addEventListener("click",function(){
                  chrome.tabs.create({active: false,url:deletedUrl,windowId:parseInt(this.value.split(",")[1])},function(){
                deletedBtn.parentNode.remove();})
                });
                deletedBtn.innerHTML="復元";
                deleteTabs.appendChild(deleted);
                chrome.tabs.remove(parseInt(this.value.split(",")[0]),function(){
                  console.log("delete url");

                });
                button.parentNode.remove();
              });
              let select = document.createElement("select");
              select.name = "windowId";
              for(let i=0;i<windowsArray.length; i++){
                let option = document.createElement("option");
                option.value = windowsArray[i]["id"];
                option.innerHTML =i;
                select.appendChild(option);
              }
              let changeWindowButton = document.createElement("button");
              changeWindowButton.classList.add("changeWindowButton");
              changeWindowButton.innerHTML = "移動";
              changeWindowButton.addEventListener("click",function(){
                let target = parseInt(this.parentNode.querySelector("select").value);
                let deleted  = this.parentNode.cloneNode(true);
                let deletedUrl = this.parentNode.querySelector("a").href;
                chrome.tabs.create({active: false,url:deletedUrl,windowId:target},function(){
                  changeWindowButton.parentNode.remove();
                });
                chrome.tabs.remove(parseInt(this.parentNode.querySelector(".button").value.split(",")[0]),function(){
                  console.log("remove tab");
                });
                let isId = (element) => element.id == target;
                let tabswindow = document.getElementsByClassName("getWindow")[windowsArray.findIndex(isId)];
                tabswindow.appendChild(deleted);

              });
              li.appendChild(img);
              li.appendChild(a);
              li.appendChild(button);
              li.appendChild(select);
              li.appendChild(changeWindowButton);
              windowDiv.appendChild(li);

            };
           
           });
        };
      });
    
      
  });
});



  

  chrome.tabs.onCreated.addListener(function(){
    setTimeout(function(){chrome.windows.getAll({populate:true},function(windowsArray){
      while(contents.firstChild){
        contents.removeChild(contents.firstChild);
      };
      btn.innerHTML="タブ情報を更新する";
      for(let windowsId=0;windowsId<windowsArray.length;windowsId++){
        chrome.tabs.query({windowId: windowsArray[windowsId]["id"]},function(tabs){
          let windowDiv = document.createElement("div");
          windowDiv.classList.add("getWindow");
          let windowTitle = document.createElement("h2");
          windowTitle.innerHTML = "Window:"+windowsId;
          windowDiv.appendChild(windowTitle);
          contents.appendChild(windowDiv);
          for(let index=0; index<tabs.length; index++){
            let url = tabs[index].url; 
            let title = tabs[index].title;  
            let favIconUrl = tabs[index].favIconUrl; 
            let id = tabs[index].id;
            let li = document.createElement("li");
            let img = document.createElement("img");
            img.src = favIconUrl;
            img.classList.add("icon");
            let a = document.createElement("a");
            a.href = url;
            a.innerHTML = title;
            let button = document.createElement("button");
            button.value = `${id},${windowsArray[windowsId]["id"]}`;
            button.classList.add("button");
            button.innerHTML ="削除";
            button.addEventListener("click",function(){
              let deleted = this.parentNode.cloneNode(true);
              deleted.querySelector(".changeWindowButton").addEventListener("click",function(){
                let target = parseInt(this.parentNode.querySelector("select").value);
                let deletedUrl = deleted.querySelector("a").href;
                chrome.tabs.create({active: false,url:deletedUrl,windowId:target},function(){
                  deleted.remove();
                });
                chrome.tabs.remove(parseInt(this.parentNode.querySelector(".button").value.split(",")[0]),function(){
                  console.log("remove tab");
                });
                let isId = (element) => element.id == target;
                let tabswindow = document.getElementsByClassName("getWindow")[windowsArray.findIndex(isId)];
                tabswindow.appendChild(deleted);
            });
              let deletedBtn = deleted.querySelector(".button");
              let deletedUrl = deleted.querySelector("a").href;
              //deletedBtn.removeEventListener("click",arguments.callee);
              deletedBtn.addEventListener("click",function(){
                chrome.tabs.create({active: false,url:deletedUrl,windowId:parseInt(this.value.split(",")[1])},function(){
              deletedBtn.parentNode.remove();})
              });
              deletedBtn.innerHTML="復元";
              deleteTabs.appendChild(deleted);
              chrome.tabs.remove(parseInt(this.value.split(",")[0]),function(){
                console.log("delete url");

              });
              button.parentNode.remove();
            });
            let select = document.createElement("select");
            select.name = "windowId";
            for(let i=0;i<windowsArray.length; i++){
              let option = document.createElement("option");
              option.value = windowsArray[i]["id"];
              option.innerHTML =i;
              select.appendChild(option);
            }
            let changeWindowButton = document.createElement("button");
            changeWindowButton.classList.add("changeWindowButton");
            changeWindowButton.innerHTML = "移動";
            changeWindowButton.addEventListener("click",function(){
              let target = parseInt(this.parentNode.querySelector("select").value);
              let deleted  = this.parentNode.cloneNode(true);
              let deletedUrl=this.parentNode.querySelector("a").href;
              chrome.tabs.create({active: false,url:deletedUrl,windowId:target},function(){
                changeWindowButton.parentNode.remove();
              });
              chrome.tabs.remove(parseInt(this.parentNode.querySelector(".button").value.split(",")[0]),function(){
                console.log("remove tab");
              });
              let isId = (element) => element.id == target;
              let tabswindow = document.getElementsByClassName("getWindow")[windowsArray.findIndex(isId)];
              tabswindow.appendChild(deleted);

            });
            li.appendChild(img);
            li.appendChild(a);
            li.appendChild(button);
            li.appendChild(select);
            li.appendChild(changeWindowButton);
            windowDiv.appendChild(li);

        
  
    

            
          };

         });
      };
    });
  },500);}
      
      
  );


