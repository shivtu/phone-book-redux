import { ADD_TO_PHONE_BOOK } from "../actions/actionTypes";
const initialState = [];

export default function reducer(state = initialState, action) {
  if (action.type === ADD_TO_PHONE_BOOK) {
    return [
      ...state,
      {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        phoneNumber: action.payload.phoneNumber,
      },
    ];
  }
  return initialState;
}
