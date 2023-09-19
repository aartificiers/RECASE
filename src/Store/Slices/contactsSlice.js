import { createSlice } from '@reduxjs/toolkit';
import { filterContacts } from '../../Utils/contactsUtils';


const contactsSlice = createSlice({
    name: 'contact',
    initialState: [],
    reducers: {
        addContacts(state, action) {
            return filterContacts(action.payload);
        },
        resetContacts(state, action) {
            return [];
        },
        updateContactList(state, action) {
            const { contactId, message, time } = action.payload;
            const updatedState = state.map((contact) => {
                if (contact.member_uid.toString() === contactId) {
                    return { ...contact, message, time };
                }
                return contact;
            });
            return filterContacts(updatedState);
        }

    }
})

export default contactsSlice.reducer;
export const { addContacts, resetContacts, updateContactList } = contactsSlice.actions;