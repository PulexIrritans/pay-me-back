// Function to dynamically create payment forms

const orderedListElement = document.querySelector("ol");
const submitGroupButton = document.getElementById("group-form-btn");


submitGroupButton.onclick = function() {
    createPaymentForms(document.getElementById("groupsize").value) 
}

function createPaymentForms(count) {
    
    for(let i=0; i<count; i++) {
        const newListElement = document.createElement("li");
        orderedListElement.append(newListElement);

        const listElementn = document.getElementsByTagName("li")[i];
                
        const newLabelNameElement = document.createElement("label");
        const newInputNameElement = document.createElement("input");
        const newLabelExpenseElement = document.createElement("label");
        const newInputExpenseElement = document.createElement("input");
        listElementn.append(newLabelNameElement);
        listElementn.append(newInputNameElement);
        listElementn.append(newLabelExpenseElement);
        listElementn.append(newInputExpenseElement);

    // Continue working here with some loop that will add all the attributes and styling to the elements.    
    
    };
    // orderedListElement.setAttribute("style", "grid-template-columns: repeat("+axisLength+", 1fr); grid-template-rows: repeat("+axisLength+", 1fr)");
};