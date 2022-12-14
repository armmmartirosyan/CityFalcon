import {GET_STORIES_REQUEST, GET_STORIES_SUCCESS, GET_STORIES_FAIL} from "../actions/story";

let initialState = {
    status: '',
    stories: [],
    message: '',
    nextPageToken: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_STORIES_REQUEST: {
            return {
                ...state,
                status: action.payload.status
            }
        }
        case GET_STORIES_SUCCESS: {
            return {
                ...state,
                status: action.payload.status,
                stories: [...state.stories, ...action.payload.data.stories],
                nextPageToken: action.payload.data.next_page_token,
            }
        }
        case GET_STORIES_FAIL: {
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}