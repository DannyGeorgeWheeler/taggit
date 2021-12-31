import { createSlice } from "@reduxjs/toolkit";

const testTags = {
    id1: {
        id: 'id1',
        name: 'humour',
        communityIds: ['giantbombId', 'programmingHumourId'],
        active: true
    },

    id2: {
        id: 'id2',
        name: 'learning',
        communityIds: ['babiesId'],
        active: false
    },

    id3: {
        id: 'id3',
        name: 'gaming',
        communityIds: ['giantbombId'],
        active: false
    }
}

export const tagsSlice = createSlice({
    name: 'tags',
    initialState: {
        tags: testTags,
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

        removeTag: (state, action) => {
            const { id } = action.payload;
            delete state.tags[id];
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
    toggleActive } = tagsSlice.actions;
export const selectTags = state => state.tags.tags;
export const selectActiveTags = state => Object.values(state.tags.tags).filter(tag => tag.active === true);
export default tagsSlice.reducer;


