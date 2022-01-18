// This part needs to be changed to a dynamically created user interface later on
// The two arrays should then be created from the user input provided via UI.
// So that's also why there is no validation for the prompt statements.

const groupSize = prompt("Please enter your group size");
let nameArray = [];
let amountArray = [];
for (let i=0; i<groupSize; i++) {
    nameArray[i] = prompt("Please enter name #"+(i+1));
    amountArray[i] = parseFloat((prompt("Please enter amount from "+nameArray[i])));

};

function createGroup(count) {
    let group = [];
    let diff = 0;
    for (let i=0; i<count; i++) {
        (averagePaid>amountArray[i]) ? diff = averagePaid-amountArray[i] : diff = amountArray[i]-averagePaid;
        group.push({name: nameArray[i], amount: amountArray[i], difference: diff}); 
    }
    return group;
};

const calculateTotalAmountPaid = function(array) {
    return array.reduce((sum, currentItem) => {
        return sum + currentItem;  
},0);
};


const averagePaid = (calculateTotalAmountPaid(amountArray)/groupSize);
const group = createGroup(groupSize);

const givers = group.filter(person => person.difference<averagePaid);
const receivers = group.filter(person => person.difference>averagePaid);

const orderedGivers = givers.sort((a,b) => a.difference> b.difference ? 1 : -1);
const orderedReceivers = receivers.sort((a,b) => a.difference>b.difference ? 1 : -1);

console.log(group)
console.log(orderedGivers);
console.log(orderedReceivers);
console.log(averagePaid);



// This would need to be reworked as both receivers and givers now only have positive values for their differences. 

let payments = [];
for (let i=0; i<=orderedReceivers.length-1; i++) {
    for (let j=0; j<=orderedGivers.length-1; j++) {
        let payback = orderedReceivers[i].difference + orderedGivers[j].difference;
        if (payback>0 && payback===!orderedGivers[j].difference) {
            payments.push({receiver: orderedReceivers[i].name, giver: orderedGivers[j].name, amount: orderedReceivers[i].difference*-1});
            orderedReceivers[i].difference = 0;
            orderedGivers[j].difference = payback;
        } else if(payback>0 && payback===orderedGivers[j].difference) {
            continue;
        } else {
            payments.push({receiver: orderedReceivers[i].name, giver: orderedGivers[j].name, amount: orderedGivers[j].difference});
            orderedReceivers[i].difference -=orderedGivers[j].difference;
        };
    };
};

console.log(payments);

