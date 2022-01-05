import { createSlice } from "@reduxjs/toolkit";

const testCommunities = {
    giantbomb: {
        id: 'giantbomb',
        name: 'giantbomb'
    },

    babiesId: {
        id: 'babiesId',
        name: 'babies'
    }
}

export const communitiesSlice = createSlice({
    name: 'communities',
    initialState: {
        communities: testCommunities,
    },
    reducers: {
        addCommunitiy: (state, action) => {
            const { id, name } = action.payload;
            state.communities[id] = {
                id: id,
                name: name
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