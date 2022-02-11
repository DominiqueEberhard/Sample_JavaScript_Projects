// There idea here is to split the alphabet according to the amount of shifting you want to do (in this case it is 13 letters). Then you make two substrings and assign each letter in the input string the letter in its complementary array (e.g. if the loop hits an A, it will find that letter's index in the first alphabet string [alpha1], and replace it with the letter who has that same index in the array containing the second half of the alphabet, N). This only works so easily because the English alphabet is even-numbered;

function rot13(str) {

  // I did not feel like using arrays here, so it's simply done with strings;
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // The first half of the alphabet;
  let alpha1 = alphabet.substring(0, alphabet.length / 2);
  // The second half of the alphabet;
  let alpha2 = alphabet.substring(alphabet.length / 2);
  let convertedString = ""

  for (let i = 0; i < str.length; i++) {
    if (alpha1.includes(str[i])) {
      convertedString += alpha2[alpha1.indexOf(str[i])];
    } else if (alpha2.includes(str[i])) {
      convertedString += alpha1[alpha2.indexOf(str[i])];
    } else if (!alpha1.includes(str[i]) && !alpha2.includes(str[i])) {
      convertedString += str[i];
    }
  }

  return convertedString;
}

let answer = rot13("SERR PBQR PNZC");
console.log(answer);

// Proof that this algorithm is its own inverse;
console.log(rot13(answer));
