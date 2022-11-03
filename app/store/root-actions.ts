import * as regionActions from "./regions/regions.actions";
import * as authActions from "./auth/auth.actions";
import * as userActions from "./user/user.actions";

export const rootActions = {
  ...regionActions,
  ...authActions,
  ...userActions,
};
