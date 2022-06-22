import {
  ADD_TO_PHONE_BOOK,
  REMOVE_FROM_PHONE_BOOK,
} from '../actions/actionTypes';
const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_PHONE_BOOK:
      return [
        ...state,
        {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          phoneNumber: action.payload.phoneNumber,
        },
      ];

    case REMOVE_FROM_PHONE_BOOK:
      const filteredState = state.filter(
        (c) => c.phoneNumber !== action.payload.phoneNumber
      );
      return filteredState;

    default:
      return initialState;
  }
}
