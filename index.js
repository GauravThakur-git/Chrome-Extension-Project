try{
    let myLeads = []
    let inputEl = document.getElementById("input-el")
    let inputBtn =document.getElementById("input-btn")
    let ulEl =    document.getElementById("ul-el")
    let deleteBtn=document.getElementById("delete-btn")
    let tabBtn =  document.getElementById("tab-btn")
    let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
    
    if ( typeof window!== "undefined") {
    
    if (leadsFromLocalStorage) {
        myLeads = leadsFromLocalStorage
        render(myLeads)
    }
    
    const tabs = []
    
    
    tabBtn.addEventListener("click", function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            myLeads.push(tabs[0].url)
            localStorage.setItem("myleads", JSON.stringify(myLeads)) 
            render(myLeads)
        })
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
        
    })
      function render(leads) {
        let listItems = ""
        for (let i = 0; i < leads.length; i++) {
            listItems += `
                <li>
                    <a target='_blank' href='${leads[i]}'>
                        ${leads[i]}
                    </a>
                </li>
            `
        }
        ulEl.innerHTML = listItems
    }
    
    deleteBtn.addEventListener("dblclick", function() {
        localStorage.clear()
        myLeads = []
        render(myLeads)
    })
    
    inputBtn.addEventListener("click", function() {
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
    
    }}
    catch(e)
    {
        console.log(e)
    }