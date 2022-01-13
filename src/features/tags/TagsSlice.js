import { createSlice } from "@reduxjs/toolkit";

const initialTags = {
    tv: {
        id: 'tv',
        name: 'tv',
        communityIds: ['MrRobot'],
        active: false
    },

    games: {
        id: 'games',
        name: 'games',
        communityIds: ['Eldenring', 'Witcher3'],
        active: true
    },

    id3: {
        id: 'id3',
        name: 'dev',
        communityIds: ['webdev', 'ProgrammerHumor'],
        active: false
    }
}
 
export const tagsSlice = createSlice({
    name: 'tags',
    initialState: {
        tags: initialTags
    },
    reducers: {
        createTag: (state, action) => {
            const { id, name, communityIds = [] } = action.payload;
            state.tags[id] = {
                id: id,
                name: name,
                communityIds: communityIds,
                active: false,
            }
        },

        deleteTag: (state, action) => {
            const tagId = action.payload;
            delete state.tags[tagId];
        },

        addCommunityTag: (state, action) => {
            const { tagId, communityId } = action.payload;
            state.tags[tagId].communityIds.push(communityId);
        },

        removeCommunityTag: (state, action) => {
            const {tagId, communityId } = action.payload;
            const index = state.tags[tagId].communityIds.indexOf(communityId)
            state.tags[tagId].communityIds.splice(index, 1);
        },

        toggleActive: (state, action) => {
            const tagId = action.payload;
            state.tags[tagId].active = !state.tags[tagId].active;
        },
    }
});


export const { 
    createTag,
    deleteTag, 
    addTagId, 
    addCommunityTag, 
    removeCommunityTag, 
    toggleActive, } = tagsSlice.actions;
export const selectTags = state => state.tags.tags;
export const selectActiveTags = state => Object.values(state.tags.tags).filter(tag => tag.active === true);

export default tagsSlice.reducer;


