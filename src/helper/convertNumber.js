function convertNumberString(inputString) {
  // Cek apakah string mengandung "08" pada index 0 atau 1
  if (inputString !== null && inputString !== undefined) {
    if (
        inputString.startsWith("0") ||
        (inputString.length > 1)
      ) {
        // Jika ya, ubah "0" menjadi "62"
        return "62" + inputString.slice(1);
      } else {
        // Jika tidak, tampilkan string asli
        return inputString;
      }
  } else {
    return inputString;
  }
  
}

export default convertNumberString
