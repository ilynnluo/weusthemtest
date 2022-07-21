import { configureStore } from "@reduxjs/toolkit";
import { contactDetailSlice } from "./contactDetail/slice";
import { contactsSearchSlice } from "./contactsList/slice";

const store = configureStore({
  reducer: {
    contact: contactDetailSlice.reducer,
    search: contactsSearchSlice.reducer
  }
});

export default store