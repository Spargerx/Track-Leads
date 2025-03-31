
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputbtn = document.getElementById("input-btn")
const alertBtn = document.getElementById("alertbtn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("del-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab_btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click",function() {
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
    })
})


function render(leads){
    let listItems = ""
    for (let i=0; i< leads.length; i++) {
       listItems += `
       <li>
           <a target='_blank' href='${myLeads[i]}'>
               ${leads[i]}
            </a>
        </li>
     `
    }
    ulEl.innerHTML= listItems
}

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads= []
    render(myLeads)
})

inputbtn.addEventListener("click", function() {
    alertBtn.textContent = ""
    const inputValue = inputEl.value
    const netInput = inputValue.split(" ").join("")
    if (netInput==="") {
        alertBtn.textContent = "Please Input Your Link!"
        inputEl.value=""
    }else {
        myLeads.push(netInput)
        inputEl.value=""
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        
        render(myLeads)  
        console.log(localStorage.getItem("myLeads"))

        }
})


