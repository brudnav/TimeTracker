export const setMissingValue = (value) => {
  if (!value || value?.trim() === "") {
    return "-";
  } else {
    return value;
  }
};
