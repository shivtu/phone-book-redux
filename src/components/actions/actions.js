import { ADD_TO_PHONE_BOOK, REMOVE_FROM_PHONE_BOOK } from './actionTypes';

export const addToPhoneBook = (data) => {
  return {
    type: ADD_TO_PHONE_BOOK,
    payload: data,
  };
};

export const deleteFromPhoneBook = (data) => {
  return {
    type: REMOVE_FROM_PHONE_BOOK,
    payload: data,
  };
};
