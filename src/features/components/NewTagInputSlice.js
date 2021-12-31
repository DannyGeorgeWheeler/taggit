import { createSlice } from "@reduxjs/toolkit";

export const newTagInputSlice = createSlice({
    name: 'newTagInput',
    initialState: {
        buttonText: '+',
        inputText: '',
        hidden: true,
    },
    reducers: {
        setButtonText: (state, action) => {
            const { text } = action.payload;
            buttonText = text;
        },
        setInputText: (state, action) => {
            const { text } = action.payload;
            inputText = text;
        },
        submitTag: (state, action) => {
            const { tagId, communityId } = action.payload;

        }
    }
})