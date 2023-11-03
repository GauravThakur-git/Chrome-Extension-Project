try {
    let myLeads = [];
    let inputEl = document.getElementById("input-el");
    let inputBtn = document.getElementById("input-btn");
    let ulEl = document.getElementById("ul-el");
    let deleteBtn = document.getElementById("delete-btn");
    let tabBtn = document.getElementById("tab-btn");
  
    chrome.storage.local.get({ myLeads: [] }, (result) => {
      myLeads = result.myLeads;
      render(myLeads);
    });
  
    tabBtn.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        chrome.storage.local.set({ myLeads: myLeads });
        render(myLeads);
      });
    });
  
    function render(leads) {
      let listItems = "";
      for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
      }
      ulEl.innerHTML = listItems;
    }
  
    deleteBtn.addEventListener("dblclick", function () {
      chrome.storage.local.remove("myLeads", function () {
        myLeads = [];
        render(myLeads);
      });
    });
  
    inputBtn.addEventListener("click", function () {
      myLeads.push(inputEl.value);
      inputEl.value = "";
      chrome.storage.local.set({ myLeads: myLeads });
      render(myLeads);
    });
  } catch (e) {
    console.log(e);
  }
  