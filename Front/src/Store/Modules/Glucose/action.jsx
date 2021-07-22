export const getUserGlucose = (glucose) => ({
  type: "@glucoseData/GET",
  glucose,
});

export const postUserGlucose = (postglucose) => ({
  type: "@glucoseData/POST",
  postglucose,
});
