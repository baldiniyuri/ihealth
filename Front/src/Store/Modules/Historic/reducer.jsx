export const HistoricReducer = (state = [], action) => {
    switch (action.type) {
      case "@historicData/GET":
        const { historic } = action;
        return [historic];

      default:
        return state;
    }
  };
  

  
export const postHistoricReducer = (state = [], action) => {
    switch (action.type) {
      case "@historicData/POST":
          const { postHistoric } = action;
          return [postHistoric];

      default:
        return state;
    }
  };