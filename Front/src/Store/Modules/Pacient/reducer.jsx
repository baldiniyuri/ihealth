const PacientReducer = (state = [], action) => {
    switch (action.type) {
      case "@pacientData/POST":
        const { postPacient } = action;
        return [postPacient];
  
      default:
        return state;
    }
  };
  
  export default PacientReducer;