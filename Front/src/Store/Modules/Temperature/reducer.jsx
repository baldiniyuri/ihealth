export const temperatureReducer = (state = [], action) => {
  switch (action.type) {
    case "@temperatureData/GET":
      const { temperature } = action;
      return [temperature];

    default:
      return state;
  }
};

export const postTemperatureReducer = (state = [], action) => {
  switch (action.type) {
    case "@temperatureData/POST":
      const { posttemperature } = action;
      return [posttemperature];

    default:
      return state;
  }
};


