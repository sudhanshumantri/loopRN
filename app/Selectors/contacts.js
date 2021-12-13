import { createSelector } from 'reselect';

const selectContact = state => state.get('contacts');

export const selectIsLoading = () =>
    createSelector(selectContact, contact => contact.toJS()['isLoading']);

export const selectError = () =>
    createSelector(selectContact, contact => contact.toJS()['error']);

export const selectContactList = () =>
    createSelector(selectContact, contact => contact.toJS()['contactList']);
export const selectIsContactLoading = () =>
    createSelector(selectContact, contact => contact.toJS()['isContactUpdate']);



