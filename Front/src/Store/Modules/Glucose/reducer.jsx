export const glucoseReducer = (state = [], action) => {
    switch (action.type) {
      case "@glucoseData/GET":
        const { glucose } = action;
        return [glucose];

      default:
        return state;
    }
  };
  
  export const postglucoseReducer = (state = [], action) => {
    switch (action.type) {
      case "@glucoseData/POST":
          const { postglucose } = action;
          return [postglucose];

      default:
        return state;
    }
  };
  