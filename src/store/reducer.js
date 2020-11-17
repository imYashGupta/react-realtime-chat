import * as actionTypes from './actions' 

const initialState = {
    token:"",
    user:"",
    activeChats:[]
};

const reducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.INIT:
            return {...state,user:action.name};
        case actionTypes.LOGIN:
            return {...state,token:action.data.token,user:action.data.user}
        case actionTypes.AUTH:
            return {...state,user:action.data.user,token:action.token,activeChats:action.data.activeChats}
        case actionTypes.LOGOUT:
            return {...state,user:{},token:""}
        case actionTypes.ADD_MESSAGE :
            const message = action.data;
            const index=state.activeChats.findIndex(chats => chats.id===message.user._id);
            if(index < 0) {
                const newConversation = {
                    id:message.user._id,
                    updatedAt: Date.now(),
                    messages:[message],
                    user:message.user,
                    _id:state.user._id+" and "+message.user._id
                }
                return {...state,activeChats:[newConversation,...state.activeChats]};
            }else{
                let activeChats = [...state.activeChats];
                activeChats[index].messages.push(message);
                return {...state,activeChats:activeChats}
            }
        case actionTypes.UPDATE_USER : 
            return {...state,user:action.data}
        case actionTypes.ADD_MEDIA : 
            const i=state.activeChats.findIndex(chats => chats.id===action.userId);
            let activeChats = [...state.activeChats];
            activeChats[i].media = action.files;
            return {...state,activeChats:activeChats};
        default: 
            return state;
    }
}

export default reducer;