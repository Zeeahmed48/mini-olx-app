const initialState = {
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_USER':
      return { ...state, user: action.data };
    case 'REMOVE_USER':
      return { ...state, user: null };
    default:
      return state;
  }
};

export default reducer;
