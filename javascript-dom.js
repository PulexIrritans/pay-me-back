// Global variables

const orderedListMembersElement = document.getElementById("members");
const orderedListPaymentsElement = document.getElementById("payment");
const submitGroupButton = document.getElementById("group-form-btn");
const calculatePaymentsButton = document.getElementById("calculate-payments-btn");
const paymentResultBoxElement = document.querySelector(".payment-result");


let groupSize = 0;
let initialAveragePaid = 0;
let nameArray = [];
let amountArray = [];
let payments = [];
let payback =0;


// DOM Manipulation
// Helper function to set attributes to DOM elements

function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function(name) {
      element.setAttribute(name, attributes[name]);
    })
  }

// Function to dynamically create payment form elements (DOM) based on groupsize  

function createPaymentForms(count) {
    
    for(let i=0; i<count; i++) {
        const newListElement = document.createElement("li");
        orderedListMembersElement.append(newListElement);
        newListElement.classList.add("box");

        const listElementn = document.getElementsByTagName("li")[i];
                
        const newLabelNameElement = document.createElement("label");
        setAttributes(newLabelNameElement, {
            for: "name"
          })
          newLabelNameElement.innerText="Name #"+[i+1];

        const newInputNameElement = document.createElement("input");
        setAttributes(newInputNameElement, {
            type: "text",
            id: "name",
            name: "name"
          })
        
        const newLabelExpenseElement = document.createElement("label");
        setAttributes(newLabelExpenseElement, {
            for: "expense"
          })
          newLabelExpenseElement.innerText="Amount paid";

        const newInputExpenseElement = document.createElement("input");
        setAttributes(newInputExpenseElement, {
            type: "number",
            id: "expense",
            name: "expense"
          })
        listElementn.append(newLabelNameElement);
        listElementn.append(newInputNameElement);
        listElementn.append(newLabelExpenseElement);
        listElementn.append(newInputExpenseElement);   
    };

};

document.getElement

// Function to dynamically create payment result output

function showPaymentResults(array) {
    const groupNameInput = document.getElementById("groupname").value;
    const newHeaderElement = document.createElement("h3");
    newHeaderElement.innerText = groupNameInput+" - Thank you for using this tool.";
    paymentResultBoxElement.append(newHeaderElement);

    const newListPaymentsHeader1 = document.createElement("th");
    newListPaymentsHeader1.innerText = "Giver";
    orderedListPaymentsElement.append(newListPaymentsHeader1);

    const newListPaymentsHeader2 = document.createElement("th");
    newListPaymentsHeader2.innerText = "Amount";
    orderedListPaymentsElement.append(newListPaymentsHeader2);

    const newListPaymentsHeader3 = document.createElement("th");
    orderedListPaymentsElement.append(newListPaymentsHeader3);

    const newListPaymentsHeader4 = document.createElement("th");
    newListPaymentsHeader4.innerText = "Receiver";
    orderedListPaymentsElement.append(newListPaymentsHeader4);


    for (let i=0; i<=array.length-1; i++) {
        
        newListPaymentsElement = document.createElement("tr");
        orderedListPaymentsElement.append(newListPaymentsElement);

        const listElementn = orderedListPaymentsElement.getElementsByTagName("tr")[i];

        const newFirstSpanElement = document.createElement("td");
        newFirstSpanElement.innerText = array[i].giver+": ";
        const newSecondSpanElement = document.createElement("td");
        newSecondSpanElement.innerText = (array[i].payment).toFixed(2)+" ";
        const newThirdSpanElement = document.createElement("td");
        setAttributes(newThirdSpanElement, {
            id: "arrow"
        })
        const newFourthSpanElement = document.createElement("td");
        newFourthSpanElement.innerText = " "+array[i].receiver;

        listElementn.append(newFirstSpanElement);
        listElementn.append(newSecondSpanElement);
        listElementn.append(newThirdSpanElement);
        listElementn.append(newFourthSpanElement);
    };
};


// Event Listeners

submitGroupButton.onclick = function() {
    calculatePaymentsButton.style.display = "block";
    orderedListPaymentsElement.style.display = "none";
    orderedListMembersElement.innerHTML = "";
    orderedListPaymentsElement.innerHTML = "";
    groupSize = document.getElementById("groupsize").value;
    createPaymentForms(groupSize);
}

calculatePaymentsButton.onclick = function() {

    orderedListPaymentsElement.style.display = "block";
    orderedListPaymentsElement.innerHTML = "";
    initialAveragePaid = 0;
    nameArray = [];
    amountArray = [];
    payments = [];
    payback =0;
    getGroupDetails(groupSize);
    const paymentResult = calculatePayments(groupSize);
    showPaymentResults(paymentResult);
};

