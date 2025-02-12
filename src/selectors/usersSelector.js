import { createSelector } from "reselect"

const getUsers = (state) => {
    return state.users.users
}
export const getUsersSelector = createSelector(getUsers, (users) => {
    return users
}) 