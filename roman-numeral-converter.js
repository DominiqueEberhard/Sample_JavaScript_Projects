function convertToRoman(num) {

  function reverseArray(arr) {
      let newArray = [];
      for (let i = arr.length - 1; i >= 0; i--) {
        newArray.push(arr[i]);
      }
      return newArray;
  };

    function addStringNTimes(str, n) {
      let counter = n;
      let finalString = "";
      if (n <= 0) {
        return "";
      } else {
        while (counter > 0) {
          finalString += str;
          counter--;
        }
      }
      return finalString;
  };

  function convertElementsToRomanNumerals(arr) {
    let baseArray = ["I", "X", "C", "M"];
    let fivesArray = ["V", "L", "D"]
    for (let q = 0; q < arr.length; q++) {
      if (arr[q] <= 3) {
        arr[q] = addStringNTimes(baseArray[q], arr[q]);
      } else if (arr[q] === 4) {
        arr[q] = baseArray[q] + fivesArray[q];
      } else if (arr[q] === 5) {
        arr[q] = fivesArray[q];
      } else if (arr[q] > 5 && arr[q] <= 8) {
        arr[q] = fivesArray[q] + addStringNTimes(baseArray[q], arr[q] - 5);
      } else if (arr[q] === 9) {
        arr[q] = baseArray[q] + baseArray[q + 1];
      }
    }
    return arr;
};


// here the algorithm actually starts
  if (num > 3999 || num < 1) {
    return "This number cannot be converted into a roman numeral";
  } else {
    let numArray = reverseArray(String(num)
    .split('')
    .map(element => Number(element)));

    let finalNumber = reverseArray(convertElementsToRomanNumerals(numArray)).join("");

    return finalNumber
  }
};

let answer = convertToRoman(2438);
console.log(answer);
