import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  loading: true,
  list: []
}

export const searchContacts = createAsyncThunk(
  "contactsList/searchContacts",
  async ({keywords, sort}) => {
    let url=`http://127.0.0.1:4000/contacts`;
    if(keywords) {
      url += `?keywords=${keywords}`
    }
    if(sort){
      url += `?sort=${sort}`
    }
    console.log(url);
    const {data} = await axios.get(url);
    return data
  }
)

export const contactsSearchSlice = createSlice({
  name: "contactsSearch",
  initialState,
  reducers: {},
  extraReducers: {
    [searchContacts.pending.type]: (state) => {
      state.loading = true;
    },
    [searchContacts.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    [searchContacts.rejected.type]: (state) => {
      state.loading = false;
    }
  }
})

export const selectSearchLoading = state => state.search.loading;
export const selectSearchList = state => state.search.list;