function checkCashRegister(price, cash, cid) {

  let howManyOfEach = {
    "PENNY": Math.round(cid[0][1] / 0.01),
    "NICKEL": Math.round(cid[1][1] / 0.05),
    "DIME": Math.round(cid[2][1] / 0.1),
    "QUARTER": Math.round(cid[3][1] / 0.25),
    "ONE": Math.round(cid[4][1] / 1),
    "FIVE": Math.round(cid[5][1] / 5),
    "TEN": Math.round(cid[6][1] / 10),
    "TWENTY": Math.round(cid[7][1] / 20),
    "ONE HUNDRED": Math.round(cid[8][1] / 100)
  };

  let valueOf = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };

  var moneyInRegister = 0;
  for (let j = 0; j < cid.length; j++) {
    moneyInRegister += cid[j][1];
  }
  let moneyInDaBank = Number(moneyInRegister.toFixed(2));
  var changeOwed = cash - price;
  let changeToBePaid = changeOwed;
  // Given the change to be returned to the customer, this
  // acceptableDenominations array will contain the subarray of cid containing
  // the denominations of currency that can be used to pay the change.
  let acceptableDenominations = [];

  for (let i = 0; i < cid.length; i++) {
    if (changeOwed > valueOf[cid[i][0]]) {
      acceptableDenominations.unshift(cid[i][0]);
    }
  }

  // This array is altered when the changeCanBePaidExactly function is called;
  let finalChangeArray = makeSubarrays(acceptableDenominations, 1);

  // This function is for the case where the change has to be returned in terms
  // of amounts that correspond to each denomination of currency. This function
  // is used in the changeCanBePaidExactly function below;
  function makeSubarrays(arr, size) {
    if (arr.length <= size) {
      return [arr];
    }
    return [arr.slice(0, size), ...makeSubarrays(arr.slice(size), size)];
  }

  // This is to be used for cases where available currency returns change
  // exactly. Note that this function alters the howManyOfEach object;
  function changeCanBePaidExactly(changeDue) {
    let changeToBePaid = changeDue;
    while (changeToBePaid !== 0) {
      for (let q = 0; q < acceptableDenominations.length; q++) {
        while (changeToBePaid - valueOf[acceptableDenominations[q]] >= 0 && howManyOfEach[acceptableDenominations[q]] > 0) {
          changeToBePaid -= valueOf[acceptableDenominations[q]];
          howManyOfEach[acceptableDenominations[q]] -= 1;
          if (finalChangeArray[q].length === 1) {
            finalChangeArray[q].push(1);
          } else {
            finalChangeArray[q][1] += 1;
          }
          // Because of annoying rounding errors, you have to round the
          //remaining change after each loop to the 10e-2 place;
          changeToBePaid = Number(changeToBePaid.toFixed(2));
          if (changeToBePaid <= 0) {
            break;
          }
        }
      }
      if (changeToBePaid !== 0) {
        return false;
      } else {
        return true;
      }
    }
  };

  function isEveryValueZero(obj) {
    let valuesArray = Object.values(obj);
    if (!(valuesArray.some( element => element !== 0 ))) {
      return true;
    } else {
      return false;
    }
  };

  if (moneyInDaBank === changeToBePaid) {
    return {
      status: "CLOSED",
      change: cid
    };
  } else if (changeCanBePaidExactly(changeToBePaid) === true && isEveryValueZero(howManyOfEach) === false) {

    for (let y = 0; y < finalChangeArray.length; y++) {
      finalChangeArray[y][1] *= Number(valueOf[finalChangeArray[y][0]].toFixed(2));
    };

    for (let u = 0; u < finalChangeArray.length; u++) {
      if (isNaN(finalChangeArray[u][1])) {
        finalChangeArray.splice(u, 1);
      }
    };

    // This is just to remedy the bug caused by the above. Somehow, it's
    // exactly the same thing as above;
    for (let w = 0; w < finalChangeArray.length; w++) {
        if (isNaN(finalChangeArray[w][1])) {
            finalChangeArray.splice(w, 1);
        }
    }

    return {
      status: "OPEN",
      change: finalChangeArray
    };
  } else if (moneyInDaBank < changeToBePaid || changeCanBePaidExactly(changeToBePaid) === false) {
    console.log(howManyOfEach);
    return {
      status: "INSUFFICIENT_FUNDS",
      change: []
    };
  };
};


let answer = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

console.log(answer);

let answer2 = checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

console.log(answer2);

let answer3 = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

console.log(answer3);
