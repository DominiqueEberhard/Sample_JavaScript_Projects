function palindrome(str) {
  let filteredString = str
    .replace(/_|\W+/gi, "")
    .toLowerCase();

  // takes a string as an argument;
  function reverseString(str) {
    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
      newString += str[i];
    }
    return newString;
  };

  if (filteredString.length % 2 == 0) {
    let firstHalf = filteredString.slice(0, (filteredString.length / 2));
    let secondHalf = filteredString.slice((filteredString.length / 2));
    if (firstHalf === reverseString(secondHalf)) {
      return true;
    } else {
      return false;
    }
  } else {
    if (filteredString === reverseString(filteredString)) {
      return true;
    } else {
      return false;
    }
  }
}


let answer = palindrome("2A3*3a2");
console.log(answer);


/*

let test = "2A3*3a2";
console.log(test.toLowerCase());
console.log(test.replace(/_|\W+/gi, ''));

*/