import { authHeader } from "./auth-header";
import { configureBackend } from "./fake-backend";
import { history } from "./history";
import { store } from "./store";

const helpers = { store, authHeader, configureBackend, history };
export default helpers;
