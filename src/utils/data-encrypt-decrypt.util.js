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
  let favString = "";
  const deckKey = Object.keys(deckState);
  deckKey.sort();
  for (let item of deckKey) {
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

export const base64ToDeckState = (base64String, deckStateKeys) => {
  if (base64String.length !== 32 && base64String.length !== 64)
    return "Bad link.";
  // convert base64 to binary string
  const ownedBinaryString = base64ToBinaryString(base64String.slice(0, 32));
  let favBinaryString = "";
  if (base64String.length === 64) {
    favBinaryString = base64ToBinaryString(base64String.slice(32, -1));
  }
  // convert binary string to deck state
  let deckState = {};
  for (let [idx, item] of deckStateKeys.entries()) {
    deckState[item] = {
      owned: ownedBinaryString[idx] === "1" ? true : false,
      fav: favBinaryString?.[idx] === "1" ? true : false,
    };
  }
  return deckState;
};
