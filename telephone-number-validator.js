// This algorithm is pretty gross, but because there is a specific style for
// each variation of writing a phone number, a lot of cases were required.
// The algorithm first tests for special characters outside of the acceptable
// characters array then categorizes the input by number of characters.
// Finally, it looks at the style of the input (because there are a very
// limited number of combinations that it can go through for each number of
// characters [see the 14 characters case for the most intense test of style]). 

// For US phone numbers only

function telephoneCheck(str) {

  let acceptableCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " ", "(", ")", "-"];

  for (let i = 0; i < str.length; i++) {
    if (!(acceptableCharacters.includes(str[i]))) {
      return false;
    } else {
      if (str.length > 16 || str.length < 10 || str.length === 15 || str.length === 11) {
        return false;
    } else {
        switch (str.length) {
          case 16:
            if (str[0] !== "1" || str[2] !== "(" || str[6] !== ")") {
              return false;
            }
            break;
          case 14:
            let noNumbers = str.replace(/[0-9]+/g, "");
            if (isNaN(str[0])) {
              if (noNumbers !== "() -") {
                return false;
              }
            } else if (!(isNaN(str[0])) && Number(str[0]) !== 1) {
              return false;
            } else if (!(isNaN(str[0])) && Number(str[0]) === 1) {
              if (noNumbers !== " --" && noNumbers !== "()-" && noNumbers !== "   ") {
              return false;
              }
            }
            break;
          case 13:
            if (str[8] !== "-" || str[0] !== "(" || str[4] !== ")") {
              return false;
            }
            break;
          case 12:
            if (str[3] !== "-" && str[7] !== "-") {
              return false;
            }
            break;
        }
      }
    }
  return true;
  }
}

let answer = telephoneCheck("1 555-555-5555");
console.log(answer);



/*

let variationsArray = ["1 555-555-5555", "1(555)555-5555", "1 555 555 5555", "1 456 789 4444", "(555) 555-5555", "1 555)555-5555", "2(757)622-7382"];

let lengthsArray = [];

for (let q = 0; q < variationsArray.length; q++) {
  lengthsArray.push(variationsArray[q].length);
}

console.log(lengthsArray);

*/
