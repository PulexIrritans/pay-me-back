// Global variables

const orderedListElement = document.querySelector("ol");
const submitGroupButton = document.getElementById("group-form-btn");
const calculatePaymentsButton = document.getElementById("calculate-payments-btn");
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
        orderedListElement.append(newListElement);
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

// Event Listeners

submitGroupButton.onclick = function() {
    orderedListElement.innerHTML = "";
    groupSize = document.getElementById("groupsize").value;
    createPaymentForms(groupSize);
}

calculatePaymentsButton.onclick = function() {
    getGroupDetails(groupSize);
    console.log(calculatePayments(groupSize));
};




