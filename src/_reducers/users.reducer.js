import { userActions } from "../_constants";

export function users(state = {}, action) {
  switch (action.type) {
    case userActions.GETALL_REQUEST:
      return {
        loading: true,
      };
    case userActions.GETALL_SUCCESS:
      return {
        items: action.users,
      };
    case userActions.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case userActions.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map((user) =>
          user.id === action.id ? { ...user, deleting: true } : user
        ),
      };
    case userActions.DELETE_SUCCESS:
      return {
        items: state.items.filter((user) => user.id !== action.id),
      };
    case userActions.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map((user) => {
          if (user.id === action.id) {
            let { deleting, ...userCopy } = user;
            return { ...userCopy, deleteError: action.error };
          }
          return user;
        }),
      };
    default:
      return state;
  }
}
