export const binaryStringToBase64 = (binaryString) => {
  // padding the end with 0 to make length multiple of 8
  while (binaryString.length % 8 !== 0) {
    binaryString += "0";
  }

  let byteArray = [];
  // Convert binary string to byte array
  for (let i = 0; i < binaryString.length; i += 8) {
    let byte = binaryString.slice(i, i + 8);
    byteArray.push(parseInt(byte, 2));
  }

  // Convert byte array to string
  let byteString = String.fromCharCode(...byteArray);

  // Encode string to Base64
  let base64String = btoa(byteString);

  // Make Base64 URL-safe
  base64String = base64String
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return base64String;
};

export const base64ToBinaryString = (base64String) => {
  // Restore Base64 padding
  let paddingLength = (4 - (base64String.length % 4)) % 4;
  let base64Padded = base64String + "=".repeat(paddingLength);

  // Restore URL-safe characters to Base64 characters
  base64Padded = base64Padded.replace(/-/g, "+").replace(/_/g, "/");

  // Decode Base64 to byte string
  let byteString = atob(base64Padded);

  // Convert byte string to binary string
  let binaryString = "";
  for (let i = 0; i < byteString.length; i++) {
    let byte = byteString.charCodeAt(i).toString(2);
    // Pad each byte with leading zeros to ensure it's 8 bits
    binaryString += byte.padStart(8, "0");
  }

  return binaryString;
};

export const deckStateToBase64 = (deckState) => {
  // convert deck state to binary string
  let ownedString = "";
  const deckKey = Object.keys(deckState);
  deckKey.sort();
  for (let item of deckKey) {
    ownedString += deckState[item].owned ? "1" : "0";
  }
  // convert binary string to base64
  const base64String = binaryStringToBase64(ownedString);
  return base64String;
};

export const base64ToDeckState = (base64String, deckStateKeys) => {
  // convert base64 to binary string
  const binaryString = base64ToBinaryString(base64String);
  console.log({ binaryString });
  // convert binary string to deck state
  let deckState = {};
  for (let [idx, item] of deckStateKeys.entries()) {
    deckState[item] = { owned: binaryString[idx] === "1" ? true : false };
  }
  return deckState;
};
