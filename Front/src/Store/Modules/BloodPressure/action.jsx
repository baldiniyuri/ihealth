export const getUserBloodPressure = (bloodpressure) => ({
  type: "@bloodPressureData/GET",
  bloodpressure,
});

export const postUserPressure = (postbloodpressure) => ({
  type: "@bloodPressureData/POST",
  postbloodpressure,
});
