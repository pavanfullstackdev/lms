// utils.js

export const ExtractErrorMessage = (error) => {
    return error?.response?.data
      ?.match(/<pre>(.*?)<\/pre>/s)?.[1]
      .replace(/^Error: /, "")   // Remove "Error: " at the start
      .replace(/<br>/g, "")      // Remove <br> tags
      .replace(/&nbsp;/g, " ")   // Replace &nbsp; with spaces
      .split(" at")[0];          // Keep only the part before " at"
  };
  