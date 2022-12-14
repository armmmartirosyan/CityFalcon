export const GET_STORIES_REQUEST = "GET_STORIES_REQUEST";
export const GET_STORIES_SUCCESS = "GET_STORIES_SUCCESS";
export const GET_STORIES_FAIL = "GET_STORIES_FAIL";

export function getStoriesRequest(search) {
    return {
        type: GET_STORIES_REQUEST,
        payload: {status: 'request', search}
    }
}