// function dataUriToFile(dataUri, filename) {
//   // Membaca tipe media dari data URI
//   const typeMatch = dataUri.match(/^data:(.*?);/);
//   const mediaType = (typeMatch && typeMatch[1]) || "application/octet-stream";

//   // Membaca data base64 dari data URI
//   const base64Data = dataUri.split(",")[1];

//   // Membuat objek Blob dari data base64
//   const blob = new Blob([atob(base64Data)], { type: mediaType });

//   // Membuat objek File dari objek Blob
//   return new File([blob], filename, { type: mediaType });
// }

function dataUriToFile(dataUri, filename) {
    // Check if the data URI includes the base64 flag
    const dataUriPattern = /^data:([A-Za-z-+/]+);base64,(.+)$/;
    const matches = dataUri.match(dataUriPattern);
  
    if (!matches || matches.length !== 3) {
      throw new Error("Invalid data URI");
    }
  
    const [, mediaType, base64Data] = matches;
  
    // Convert base64 data to a Blob
    const binaryData = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
  
    const blob = new Blob([uint8Array], { type: mediaType });
  
    // Create a File object with the Blob
    return new File([blob], filename, { type: mediaType });
  }

export default dataUriToFile;
