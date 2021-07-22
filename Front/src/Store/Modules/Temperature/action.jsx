export const getUserTemperature = (temperature) => ({
    type: "@temperatureData/GET",
    temperature,
  });
  
export const postUserTemperature = (posttemperature) => ({
    type: "@temperatureData/POST",
    posttemperature,
  });