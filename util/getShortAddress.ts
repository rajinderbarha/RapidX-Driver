export default function getShortAddress(fullAddress : any){
    // Example logic to split the address
    const parts = fullAddress.split(", ");
    console.log('parts : ', parts)
    if (parts.length > 2) {
      return {
        primary: parts.slice(0, 3).join(", "),
        secondary: parts[parts.length - 3]
      };
    }
    return {
      primary: fullAddress,
      secondary: ""
    };
  };