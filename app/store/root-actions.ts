import * as regionActions from "./regions/regions.actions";
import * as authActions from "./auth/auth.actions";

export const rootActions = {
  ...regionActions,
  ...authActions,
};
