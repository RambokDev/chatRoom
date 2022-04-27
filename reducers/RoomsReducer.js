import {SET_ROOMS} from "../actions/RoomsActions";

const initialState = {
    rooms : []
}

const RoomReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_ROOMS:
            return{
                ...state,
                rooms : action.rooms,
            }
        default:
            return state
    }
}
export default RoomReducer;