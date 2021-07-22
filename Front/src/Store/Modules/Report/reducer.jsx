const ReportDataReducer = (state = [], action) => {
    switch (action.type) {
      case "@reportData/POST":
        const { reportData } = action;
        return [reportData];
  
      default:
        return state;
    }
  };
  
  export default ReportDataReducer;