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
    for (let i=0; i<count; i++) {
        group.push({name: nameArray[i], amount: amountArray[i], difference: amountArray[i]-averagePaid}); 
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

// rewrite the following in order to get rid of the direct reference to the original group

const givers = group.filter(person => person.difference<0);
const receivers = group.filter(person => person.difference>0);

const orderedGivers = givers.sort((a,b) => a.difference > b.difference ? 1 : -1);
const orderedReceivers = receivers.sort((a,b) => a.difference < b.difference ? 1 : -1);

orderedGivers.forEach(giver => giver.difference = Math.abs(giver.difference));

console.log("Total Group", group)
console.log("Ordered Givers", orderedGivers);
console.log("Ordered Receivers", orderedReceivers);
console.log("Average", averagePaid);


let payments = [];
let payback;
orderedReceivers.forEach(oreceiver => {
    orderedGivers.forEach(ogiver => {
        payback = oreceiver.difference - ogiver.difference;
        console.log(payback);
        if (payback > 0 && ogiver.difference !=0) {
            payments.push({receiver: oreceiver.name, giver: ogiver.name, payment: ogiver.difference});
            oreceiver.difference = oreceiver.difference - ogiver.difference;
            ogiver.difference = 0;

        } else if (payback < 0 && Math.abs(payback) != ogiver.difference && oreceiver.difference !=0) {
            payments.push({receiver: oreceiver.name, giver: ogiver.name, payment: oreceiver.difference});
            ogiver.difference -= oreceiver.difference;
            oreceiver.difference = 0;
        } else if (oreceiver.difference !=0) {
            payments.push({receiver: oreceiver.name, giver: ogiver.name, payment: oreceiver.difference})
            ogiver.difference = 0;
            oreceiver.difference = 0;
        };
    });
    });

console.log(payments);
