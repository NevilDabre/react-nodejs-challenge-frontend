import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userConstants"
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../store";

export const login = (email: string, password: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })
    const response = await fetch('http://localhost:8000/session', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json()
    const userData = {name: data['authenticatedUser'].name, email: data['authenticatedUser'].email, token: data['authenticatedUser'].accessToken, id: data['authenticatedUser'].id}

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userData
    })
    localStorage.setItem('userInfo', JSON.stringify(userData));

  } catch (error: unknown) {
    if(error instanceof Error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.message
      })
    }
  } 
}

export const logout =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
  }