const invoiceTb = document.getElementById('invoice-record')
const washBtn = document.getElementById('btn-wash')
const mowBtn = document.getElementById('btn-mow')
const weedBtn = document.getElementById('btn-weed')
const bottomDiv = document.getElementById('total-container')
const dispMsg = document.getElementById('display-msg')
const totalAmt = document.getElementById('amount')
const sendInvoice = document.getElementById('send-invoice')

let service = ""
let servAndPrice = []
let totAmt = 0


washBtn.addEventListener("click",function(){
    service = washBtn.textContent
    servAndPrice = service.split(":")
    addService(servAndPrice)
    washBtn.disabled = true
})

mowBtn.addEventListener("click",function(){
    service = mowBtn.textContent
    servAndPrice = service.split(":")
    addService(servAndPrice)
    mowBtn.disabled = true
})

weedBtn.addEventListener("click",function(){
    service = weedBtn.textContent
    servAndPrice = service.split(":")
    addService(servAndPrice)
    weedBtn.disabled = true
})

sendInvoice.addEventListener("click", function(){
    
    while(invoiceTb.rows.length){
        // console.log(invoiceTb.rows.length)
        invoiceTb.deleteRow(0)
    }
    
    totalAmt.textContent = "$0"
    dispMsg.style.visibility = "hidden"
    
    bottomDiv.style.top = "387px"
    
    sendInvoice.innerHTML = `<span class = "btn-text">Sent!</span>`
    sendInvoice.style.background = "#10B981"
    
    setTimeout(function(){
        sendInvoice.innerHTML = `<i class="fa-solid fa-envelope" style="color:white"></i><span class = "btn-text">Send Invoice</span>`
        sendInvoice.style.background = "#3770ED"
    }, 2000)
    
    washBtn.disabled = false
    mowBtn.disabled = false
    weedBtn.disabled = false    
})

function addService(newServ){
    
    invoiceTb.innerHTML += `<tr>
    <td id="servInfo" class="servInfo" align="left">${newServ[0]}<span class="remove" onclick="removeRow(this)"> Remove</span></td>
                    <td id="servCost" class="servCost" align="right" >${newServ[1].trim()}</td></tr>`     

    totAmt += parseInt(newServ[1].split("$")[1])
    totalAmt.textContent = `$${totAmt}`
    setTimeout(function() {
        let topDiv = parseInt(window.getComputedStyle(bottomDiv).top)
        topDiv += 42
        bottomDiv.style.top = topDiv+'px' 
    }, 1)
    
   dispMsg.style.visibility = "visible"             
                    
}

sendInvoice.addEventListener("click", function(){
    
})

function removeRow(spanEl){
    let rowNum = spanEl.parentElement.parentElement.rowIndex
    let recordTbl = invoiceTb.getElementsByTagName("tr")[rowNum]
    let serv = recordTbl.getElementsByTagName("td")[0].textContent
    let cost = recordTbl.getElementsByTagName("td")[1]
    
    invoiceTb.deleteRow(rowNum)
     
    serv = serv.replace(" Remove","")
    enableService(serv)
    
    
    totAmt -= parseInt(cost.textContent.split("$")[1])
    totalAmt.textContent = `$${totAmt}`
    // console.log(invoiceTb.rows.length)
    if(invoiceTb.rows.length === 0){
        dispMsg.style.visibility = "hidden"
    }
    
    setTimeout(function() {
        let topDiv = parseInt(window.getComputedStyle(bottomDiv).top)
        topDiv -= 42
        bottomDiv.style.top = topDiv+'px' 
    }, 1)
    
}


function enableService(serviceDet){
    
    if (serviceDet === "Wash Car"){
        washBtn.disabled = false
    }
    
    else if (serviceDet === "Mow Lawn"){
        mowBtn.disabled = false
    }
    
    else
    {
        weedBtn.disabled = false
    }
}