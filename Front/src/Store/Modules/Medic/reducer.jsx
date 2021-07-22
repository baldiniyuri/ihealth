const MedicReducer = (state = [], action) => {
    switch (action.type) {
      case "@medicData/POST":
        const { postMedic } = action;
        return [postMedic];
  
      default:
        return state;
    }
  };
  
  export default MedicReducer;