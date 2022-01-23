

function getGroupDetails(groupSize) {
  for (let i = 0; i < groupSize; i++) {
    amountArray[i] = parseFloat(document.getElementsByName("expense")[i].value);
    nameArray[i] = document.getElementsByName("name")[i].value;
  }
}


// This function creates the group from the above arrays plus the difference each member paid compared to total average

function createGroup(count, initialAveragePaid) {
  let group = [];
  for (let i = 0; i < count; i++) {
    group.push({
      name: nameArray[i],
      amount: amountArray[i],
      difference: amountArray[i] - initialAveragePaid,
    });
  }
  return group;
}

// This function calculates the remaining differences for each member of the group that still needs to be balanced

const calculateRemainingDifferences = function (array) {
  return array.reduce((sum, currentItem) => {
    return sum + currentItem.difference;
  }, 0);
};

// This function calculates the initial total amount paid that is used to calculate the initial differences for each group member

function calculateInitialAmountPaid(amountArray) {
  return amountArray.reduce((sum, currentItem) => {
    return sum + currentItem;
  }, 0);
};

// Core function

function calculatePayments(groupSize) {
    console.log(calculateInitialAmountPaid(amountArray)/groupSize)
  const groupMembers = createGroup(
    groupSize,
    parseFloat(calculateInitialAmountPaid(amountArray)/groupSize).toFixed(2));

  // Splits total group into two sub arrays - givers and receivers.

  const givers = groupMembers.filter((person) => person.difference < 0);
  const receivers = groupMembers.filter((person) => person.difference > 0);

  // Here the givers originally negative difference is turned into a positive value

  givers.forEach((giver) => (giver.difference = Math.abs(giver.difference)));


  // Core logic to solve the problem. As long as there is still one receiver that needs to get paid the algo will
  // sort givers and receivers array each round and balance the differences for the first elements (which have the biggest difference amounts)
  // push name of giver and receiver plus amount to the payements array

  while (calculateRemainingDifferences(receivers) != 0) {
    const orderedGivers = givers.sort((a, b) =>
      a.difference < b.difference ? 1 : -1
    );
    const orderedReceivers = receivers.sort((a, b) =>
      a.difference < b.difference ? 1 : -1
    );

    payback = orderedReceivers[0].difference - orderedGivers[0].difference;
    if (orderedReceivers[0].difference > orderedGivers[0].difference) {
      payments.push({
        receiver: orderedReceivers[0].name,
        giver: orderedGivers[0].name,
        payment: orderedGivers[0].difference,
      });
      orderedReceivers[0].difference = payback;
      orderedGivers[0].difference = 0;
    } else if (orderedReceivers[0].difference < orderedGivers[0].difference) {
      payments.push({
        receiver: orderedReceivers[0].name,
        giver: orderedGivers[0].name,
        payment: orderedReceivers[0].difference,
      });
      orderedGivers[0].difference = Math.abs(payback);
      orderedReceivers[0].difference = 0;
    } else {
      payments.push({
        receiver: orderedReceivers[0].name,
        giver: orderedGivers[0].name,
        payment: orderedReceivers[0].difference,
      });
      orderedReceivers[0].difference = 0;
      orderedGivers[0].difference = 0;
    }
  }
  return payments;
}
