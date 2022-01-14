import { createSlice } from "@reduxjs/toolkit";

const initialCommunities = {
    MrRobot: {
        id: 'MrRobot',
        name: 'Mr. Robot',
        icon: 'https://b.thumbs.redditmedia.com/lxugoiGJpok9j8tLcgwk_BZXiwblC5_L5Vl9rHr0A2A.png',
        description: 'Subreddit for the critically acclaimed USA network TV drama "Mr. Robot".'
    },

    Eldenring: {
        id: 'Eldenring',
        name: 'Elden Ring',
        icon: 'https://b.thumbs.redditmedia.com/fruteeLd_9QxmXc7JN3sMXyG12sq9JeJb-yzYSZ-n3c.png',
        description: 'Elden Ring Game Reddit Community - a FromSoftware + George R. R. Martin collaboration ARPG coming to PS4, PS5, Xbox One, Xbox Series S/X, and PC. Elden Ring is published by Bandai Namco, releasing February 25th, 2022.'
    },

    Witcher3: {
        id: 'Witcher3',
        name: 'The Witcher 3: Wild Hunt',
        icon: 'https://b.thumbs.redditmedia.com/lrQhbkQeAPAq5lOLwSvTb3Mws5iUyL2qcUOhPN2F6zg.png',
        description: 'Welcome to r/Witcher3! A subreddit for discussions, news, memes, media, and other topics pertaining to the third installment in the Witcher franchise. READ THE RULES BEFORE POSTING.'
    },

    webdev: {
        id: 'webdev',
        name: 'webdev: reddit for web developers',
        icon: 'https://b.thumbs.redditmedia.com/vk8EAqzcLRGYh_Yisi68CglMMuheNEFKNaDLZy7h2ZE.png',
        description: 'A community dedicated to all things web development: both front-end and back-end. For more design-related questions, try /r/web_design.'
    },

    ProgrammerHumor: {
        id: 'ProgrammerHumor',
        name: 'Memes and jokes about everything programming and CS',
        icon: 'https://b.thumbs.redditmedia.com/Qj8PVGSQ_B_3JjNCeE-bxz-RVokmZQ23i8cNGRw7Nhc.png',
        description: 'Dedicated to humor and jokes relating to programmers and programming.'
    }

    
}

export const communitiesSlice = createSlice({
    name: 'communities',
    initialState: {
        communities: initialCommunities,
    },
    reducers: {
        addCommunitiy: (state, action) => {
            console.log(action.payload);
            const { id, name, icon, description } = action.payload;
            console.log(id, name);
            state.communities[id] = {
                id: id,
                name: name,
                icon: icon,
                description: description
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