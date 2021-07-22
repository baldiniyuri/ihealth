export const BloodPressureReducer = (state = [], action) => {
    switch (action.type) {
      case "@bloodPressureData/GET":
        const { bloodpressure } = action;
        return [bloodpressure];

      default:
        return state;
    }
  };
  

  
export const postBloodPressureReducer = (state = [], action) => {
    switch (action.type) {
      case "@bloodPressureData/POST":
          const { postbloodpressure } = action;
          return [postbloodpressure];

      default:
        return state;
    }
  };
  
