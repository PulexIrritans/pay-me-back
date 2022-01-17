// function createGroup(name, count) {
//     for (let i=1; i<=count; i++) {
//         name.i
//     }
// }

// data["PropertyD"] to data[function_to_get_property_name()]


// This part needs to be changed to a dynamically created user interface later on
// The two arrays should then be created from the user input provided via UI.
const groupSize = prompt("Please enter your group size");
let nameArray = [];
let amountArray = [];
for (let i=0; i<groupSize; i++) {
    nameArray[i] = prompt("Please enter name #"+i);
    // solve this problem via UI via formatting user input as number possible?
    amountArray[i] = parseFloat(prompt("Please enter amount from "+nameArray[i]));

};

function createGroup(count) {
    let group = [];
    for (let i=0; i<count; i++) {
        group.push({name: nameArray[i], amount: amountArray[i]});    
    }
    return group;
};

const calculateAverageAmountPaid = function(array) {
    return array.reduce((sum, currentItem) => {
        return sum + currentItem;  
},0);
    
};

createGroup(groupSize);

const averagePaid = (calculateAverageAmountPaid(amountArray));


// const sortedGroup = group.sort(function(a,b) {
//     const last.Guy
// })

