export default function getShortAddress(fullAddress: any) {
  function removePlusCode(address: string) {
    // Regular expression to match Plus Codes like "MPR8+QCJ"
    const plusCodePattern = /\b[A-Z0-9]{4}\+[A-Z0-9]{2,3},?\s*/g;
    // const plusCodePattern = /\b[A-Z0-9]{4}\+[A-Z0-9]{2,3}\b/g;


    // Replace the Plus Code with an empty string
    const cleanedAddress = address.replace(plusCodePattern, "").trim();

    return cleanedAddress;
  }

  // Example logic to split the address
  const parts = fullAddress.split(", ");
  console.log("parts : ", parts);
  if (parts.length > 2) {
    const primary = parts.slice(0, 3).join(", ");
    const secondary = parts[parts.length - 3];
    return {
      primary: removePlusCode(primary),
      secondary: removePlusCode(secondary),
    };
  }
  return {
    primary: fullAddress,
    secondary: "",
  };
}
