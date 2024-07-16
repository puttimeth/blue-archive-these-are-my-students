import { studentDefaultOrderSortData } from "data";

// Base64 character set
const base64Chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

export const binaryStringToBase64 = (binaryString) => {
  // Ensure binary string is padded to a multiple of 6 bits
  while (binaryString.length % 6 !== 0) {
    binaryString += "0";
  }

  // Convert binary string to Base64
  let base64 = "";
  for (let i = 0; i < binaryString.length; i += 6) {
    let chunk = binaryString.slice(i, i + 6); // Take 6-bit chunk
    let decimalValue = parseInt(chunk, 2); // Convert binary to decimal
    base64 += base64Chars[decimalValue]; // Map decimal value to Base64 character
  }

  return base64;
};

export const base64ToBinaryString = (base64String) => {
  let binaryString = "";

  // Iterate over each character in the Base64 string
  for (let base64Char of base64String.split("")) {
    // Find the index of the Base64 character in the character set
    let base64Index = base64Chars.indexOf(base64Char);

    // Convert the index to a 6-bit binary string
    let binaryChunk = ("000000" + base64Index.toString(2)).slice(-6);

    // Append the 6-bit binary string to the result
    binaryString += binaryChunk;
  }

  return binaryString;
};

/**
 * Each student's state represents by two bit, one for isOwned, another for isFavorite.
 *
 * Student's state bit is concat together to create binary string. There are two binary string for isOwned and isFavorite.
 *
 * Binary string then divided into group 0f 6 bit. Each group encode into base64. Note that this base64 replace
 * some character with valid characters for URL.
 *
 * If isFavorite binary string is all zero, it won't return to reduce total length.
 */
export const deckStateToBase64 = (deckState) => {
  // convert deck state to binary string
  let ownedString = "";
  let favString = "";
  for (let item of studentDefaultOrderSortData) {
    ownedString += deckState[item].owned ? "1" : "0";
    favString += deckState[item].fav ? "1" : "0";
  }
  // convert binary string to base64
  const ownedBase64String = binaryStringToBase64(ownedString);
  const favBase64String = binaryStringToBase64(favString);
  return (
    ownedBase64String +
    (favString.split("").some((e) => e === "1") ? favBase64String : "")
  );
};

/**
 * Before convert base64 data back to binary string, the data need to be validated.
 *
 * Base64 have two possibilities, one is it contain both isOwned and isFavorite, another is it only contain isOwned.
 *
 * In the future, if studentData is growing, old base64 data can still be used and automatically recognize
 * those new students as not owned and not favorite.
 */
export const base64ToDeckState = (base64String) => {
  const deckStateKeys = studentDefaultOrderSortData;
  // check base64 input
  const maxSizePerPart = Math.ceil(deckStateKeys.length / 6); // number of students divided by bits of base64
  // check input length; there are two parts with equal length, then total length must be even
  if (base64String.length > maxSizePerPart && base64String.length % 2 === 1)
    return "Bad link.";
  // check length per part; the number of students can only increased, length per part must be less than or equal current size
  const sizePerPart = base64String.length / 2;
  if (sizePerPart > maxSizePerPart) return "Bad link.";
  // check content is base64 encoding
  if (base64String.split("").some((e) => !base64Chars.includes(e)))
    return "Bad link.";

  // convert base64 to binary string
  let ownedBinaryString = "";
  let favBinaryString = "";
  if (base64String.length <= maxSizePerPart) {
    ownedBinaryString = base64ToBinaryString(base64String);
  } else {
    ownedBinaryString = base64ToBinaryString(
      base64String.slice(0, sizePerPart),
    );
    favBinaryString = base64ToBinaryString(base64String.slice(sizePerPart, -1));
  }

  // convert binary string to deck state
  let deckState = {};
  for (let [idx, item] of deckStateKeys.entries()) {
    deckState[item] = {
      owned: ownedBinaryString?.[idx] === "1" ? true : false,
      fav: favBinaryString?.[idx] === "1" ? true : false,
    };
  }
  return deckState;
};
