import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false
}
export const AuthContext = createContext(INITIAL_STATE);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer);
  return (
    <AuthProvider value={{ user: state.user, isFetching: state.isFetching, error: state.error, dispatch }}>
      {children}
    </AuthProvider>
  )
}