import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getContactDetail = createAsyncThunk(
  "contactDetail/getContactDetail",
  async (id) => {
    const { data } = await axios.get(`http://127.0.0.1:4000/contacts/${id}`);
    return data;
  }
);

// put by async method
// export const editContact = createAsyncThunk(
//   "contactDetail/editContact",
//   async (id, fn, ln, email, number, avatar) => {
//     const { data } = await axios.put(`http://127.0.0.1:4000/contacts/${id}`, {
//       fn: fn,
//       ln: ln,
//       email: email,
//       number: number,
//       avatar: avatar
//     })
//     return data;
//   }
// )

export const editContact = createAsyncThunk(
  "contactDetail/editContact",
  ({id, fn, ln, email, number, avatar}) => {
    axios.put(`http://127.0.0.1:4000/contacts/${id}`, {
      fn: fn,
      ln: ln,
      email: email,
      number: number,
      avatar: avatar
    }).then((res) => {
      const data = res.data;
      return data;
    })
  }
)

export const deleteContact = createAsyncThunk(
  "contactDetail/deleteContact",
  async (id) => {
    return await axios.delete(`http://127.0.0.1:4000/contacts/${id}`);
  }
)

export const contactDetailSlice = createSlice({
  name: "contactDetail",
  initialState: {
    loading: true,
    contact: null,
  },
  reducers: {},
  extraReducers: {
    [getContactDetail.pending.type]: (state) => {
      state.loading = true;
    },
    [getContactDetail.fulfilled.type]: (state, action) => {
      state.contact = action.payload;
      state.loading = false;
    },
    [getContactDetail.rejected.type]: (state) => {
      state.loading = false;
    },
    [editContact.pending.type]: (state) => {
      state.loading = true;
    },
    [editContact.fulfilled.type]: (state, action) => {
      state.contact = action.payload;
      state.loading = false;
    },
    [editContact.rejected.type]: (state) => {
      state.loading = false;
    },
    [deleteContact.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteContact.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteContact.rejected.type]: (state) => {
      state.loading = false;
    }
  }
})

export const selectLoading = state => state.contact.loading;
export const selectContact = state => state.contact.contact;
