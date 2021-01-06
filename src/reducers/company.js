const company = (state = {}, action) => {
    switch (action.type) {
      case 'SET_COMPANY':
        return action.company
      case 'CLEAR_COMPANY':
        return {}
      default:
        return state;
    }
  };
  
  export default company;