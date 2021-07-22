const userLoginReducer = (state = [], action) => {
    switch (action.type) {
      case "@userData/POST":
        const { LoginUser } = action;
        return [LoginUser];
  
      default:
        return state;
    }
  };
  
  export default userLoginReducer;
