const initState = {
  user: [
    { id: 1, name: "eric" },
    { id: 2, name: "hoi dan it" },
  ],
  post: [],
};

const rootReducer = (state = initState, action) => {
  console.log(">>check state of redux: ", state);
  switch (action.type) {
    case "DELETE_USER":
      let user = state.user;
      user = user.filter((item) => item.id !== action.payload.id);
      // voi class thi this.setState con func thi
      return {
        ...state,
        user,     //phai giong 
      };
    case "CREATE_USER":
      const id = Math.floor(Math.random() * 10000);
      const users = { id: id, name: `random - ${id}` };
      return {
        ...state,
        user: [...state.user, users],       //khong phai giong
      };
      break;
    default:
      return state;
  }
};
export default rootReducer;
