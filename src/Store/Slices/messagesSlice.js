import { createSlice } from '@reduxjs/toolkit';
import { groupMessagesByDate } from '../../Utils/dateformat';

const messagesSlice = createSlice({
    name: 'message',
    initialState: [],
    reducers: {
        addMessages(state, action) {
            const filteredMessages = action.payload;
            return state = [...groupMessagesByDate(filteredMessages)];
        },
        resetMessages(state, action) {
            return [];
        },
        addPreviousMessages(state, action) {
            const filteredMessages = action.payload;
            return [...groupMessagesByDate(filteredMessages)];
        },

        // updateMessages(state, action) {
        //     const { updatedMessage, clMsgId } = action.payload;

        //     let messageFound = false;

        //     const updatedState = state.map((dateObj) => {
        //         const updatedMessages = dateObj.messages.map((message) => {
        //             if (message._id?.$oid === clMsgId && message.message === updatedMessage.message) {
        //                 messageFound = true;
        //                 return updatedMessage;
        //             } else {
        //                 return message;
        //             }
        //         });

        //         return { ...dateObj, messages: updatedMessages };
        //     });

        //     if (!messageFound) {
        //         // If the specified message is not found, add the updatedMessage to the state
        //         updatedState.push({
        //             messages: [updatedMessage],
        //         });
        //     }

        //     return updatedState;
        // }

        updateMessages(state, action) {
            const { updatedMessage, clMsgId } = action.payload;
            const updatedState = state.map((dateObj) => {
                const updatedMessages = dateObj.messages.map((message) => {
                    if (message._id?.$oid == clMsgId && message.message === updatedMessage.message) {
                        return updatedMessage;
                    } else {
                        return message;
                    }
                });
                return { ...dateObj, messages: updatedMessages };
            });
            return updatedState;
        },
    }
})

export default messagesSlice.reducer;
export const { addMessages, resetMessages, addPreviousMessages, updateMessages } = messagesSlice.actions;