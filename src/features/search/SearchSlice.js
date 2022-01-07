import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const searchReddit = createAsyncThunk('search/searchReddit', async (term, {rejectWithValue}) => {
    try {
        const results = [];
        const response = await fetch(`https://www.reddit.com/search/.json?q=${term}&source=recent&type=sr`);
        const json = await response.json();
        json.data.children.forEach(result => {
            results.push({
                id: result.data['display_name'],
                name: result.data['title'],
                description: result.data['public_description'],
            })
        });
        return results;

    } catch (error) {
        return rejectWithValue(error);
    }
})

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        results: [],
        status: 'idle',
    },
    reducers: {

    },
    extraReducers: {
        [searchReddit.pending]: (state) => {
            state.status = 'loading';
        },
        [searchReddit.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.results = action.payload;
        },
        [searchReddit.rejected]: (state, action) => {
            console.log('rejected', action.payload);
        }
    }
})

export const selectResults = state => state.search.results;
export default searchSlice.reducer;