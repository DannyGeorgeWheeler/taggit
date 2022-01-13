import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchReddit = createAsyncThunk('search/searchReddit', async (term, {rejectWithValue}) => {
    try {
        const defaultIcon = 'https://styles.redditmedia.com/t5_6/styles/communityIcon_a8uzjit9bwr21.png?width=256&s=d28ea66f16da5a6c2ccae0d069cc4d42322d69a9';
        const results = [];
        const response = await fetch(`https://www.reddit.com/search/.json?q=${term}&source=recent&type=sr`);
        const json = await response.json();
        json.data.children.forEach(result => {
            results.push({
                id: result.data['display_name'],
                name: result.data['title'],
                description: result.data['public_description'],
                icon: result.data['community_icon'] !== '' ? fixUrl(result.data['community_icon']) : defaultIcon,
            })
        });
        return results;

    } catch (error) {
        return rejectWithValue(error);
    }
});

const fixUrl = url => {
    const newUrl = url.replace(/&amp;/g, '&');
    return newUrl;
};

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