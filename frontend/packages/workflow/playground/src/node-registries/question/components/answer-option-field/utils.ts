const ASCII_TO_A_INDEX = 65; // The ASCII serial number corresponding to the letter A

export function convertNumberToLetters(n) {
  let result = '';
  while (n >= 0) {
    result = String.fromCharCode((n % 26) + ASCII_TO_A_INDEX) + result;
    n = Math.floor(n / 26) - 1;
  }
  return result;
}

export const generatePortId = (index: number) => `branch_${index}`;
