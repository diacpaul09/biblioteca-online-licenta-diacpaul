import { createSelector } from "reselect";
const slectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [slectUser],
  (user) => user.currentUser
);
