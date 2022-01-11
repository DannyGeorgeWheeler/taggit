import { createSlice } from "@reduxjs/toolkit";

const testCommunities = {
    giantbomb: {
        id: 'giantbomb',
        name: 'giantbomb'

    },

    witcher: {
        id: 'witcher',
        name: 'witcher'
    },

    
}

export const communitiesSlice = createSlice({
    name: 'communities',
    initialState: {
        communities: {},
    },
    reducers: {
        addCommunitiy: (state, action) => {
            console.log(action.payload);
            const { id, name, icon } = action.payload;
            console.log(id, name);
            state.communities[id] = {
                id: id,
                name: name,
                icon: icon
            }
        },

        removeCommunity: (state, action) => {
            const { id } = action.payload;
            delete state.communities[id];
        }
    }
})

export const {
    addCommunitiy,
    removeCommunity } = communitiesSlice.actions;
export const selectCommunities = state => state.communities.communities;
export default communitiesSlice.reducer;