export const isValidJson = (json, indulgent = false) => {
  if (!json) return indulgent;
  try {
    JSON.parse(json);
    return true;
  } catch (error) {
    return false;
  }
};
