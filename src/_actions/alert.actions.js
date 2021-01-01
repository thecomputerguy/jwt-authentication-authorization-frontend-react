import { alertConstants } from "../_constants";

export const alertActions = {
  success,
  error,
  clear,
};

function success(message) {
  return { type: alertActions.success, message };
}

function error(message) {
  return { type: alertActions.ERROR, message };
}

function clear() {
  return { type: alertConstants.CLEAR };
}
