export const getAddToPhonebookData = (data) => ({
  type: "ADD_TO_PHONE_BOOK",
  payload: {
    firstName: data.firstName,
    lastName: data.lastName || "",
    phoneNumber: data.phoneNumber,
  },
});
