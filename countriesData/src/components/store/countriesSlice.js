import {createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_BASE_URL = "https://restcountries.com/v3.1/all";

export const fetchcountriesData = createAsyncThunk(
    'countries/fetchcountriesData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}`) ;
            return response.data;
        } catch (error) {
            console.error('Error fetching countries data:', error.message);
            return rejectWithValue(error.response?.data?.error || error.message);
        }
    }
);

const countriesSlice = createSlice({
    name : 'countries',
    initialState: {
        selectedCountry: '',
        countriesData: [],
        loading: false,
        error: null,
    },
    reducers:{
        setselectedCountry(state, action){
            state.selectedCountry = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchcountriesData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchcountriesData.fulfilled, (state, action) => {
            state.countriesData = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(fetchcountriesData.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload || 'Failed to fetch countries data'; 
        });
    },
});

export const {setselectedCountry} = countriesSlice.actions;
export default countriesSlice.reducer;