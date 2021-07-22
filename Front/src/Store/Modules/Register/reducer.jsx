const userDataReducer = (state = [], action) => {
    switch (action.type) {
      case "@userData/POST":
        const { postUser } = action;
        return [postUser];
  
      default:
        return state;
    }
  };
  
  export default userDataReducer;