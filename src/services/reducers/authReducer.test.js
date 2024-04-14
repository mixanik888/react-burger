
import * as actions from "../actions/actions";
import { initialState, reducer } from "./authReducer";

import { user } from "../../utils/test-constants";

describe("Redux store auth", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return the initial state auth", () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  test("should handle GET_signOut.rejected", () => {
    let errorText = "Error text";

    expect(
      reducer(undefined, {
        type: actions.signOut.rejected.type,
        error: errorText,
      })
    ).toEqual({
      ...initialState,
      loading: false,
      error: errorText,
    });
  });

  test("should handle GET_commitProfile.fulfilled", () => {
  
    expect(
      reducer(undefined, {
        type: actions.commitProfile.fulfilled.type,
        payload: {user},
      })
    ).toEqual({
      ...initialState,
      name : user.name,
      email : user.email,
      user : user,
    });
  });

  test("should handle setName", () => {
    let Text = "text";
    expect(
      reducer(undefined, {
        type: actions.setName.type,
        payload: Text,
      })
    ).toEqual({
      ...initialState,
      name: Text,
    });
  });

  test("should handle setPassword", () => {
    let Text = "text";
    expect(
      reducer(undefined, {
        type: actions.setPassword.type,
        payload: Text,
      })
    ).toEqual({
      ...initialState,
      password: Text,
    });
  });

  test("should handle setEmail", () => {
    let Text = "text";
    expect(
      reducer(undefined, {
        type: actions.setEmail.type,
        payload: Text,
      })
    ).toEqual({
      ...initialState,
      email: Text,
    });
  });

  test("should handle setToken", () => {
    let Text = "text";
    expect(
      reducer(undefined, {
        type: actions.setToken.type,
        payload: Text,
      })
    ).toEqual({
      ...initialState,
      token: Text,
    });
  });
 

});

describe("Redux store auth signOut", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should handle GET_FAILED", () => {
    let errorText = "Error text";

    expect(
      reducer(undefined, {
        type: actions.signOut.rejected.type,
        error: errorText,
      })
    ).toEqual({
      ...initialState,
      error: errorText,
    });
  });

  test("should handle GET_fulfilled", () => {
       expect(
      reducer(undefined, {
        type: actions.signOut.fulfilled.type,
      })
    ).toEqual(
      initialState);
  });

  test("should handle GET_pending", () => {
    expect(
      reducer(undefined, {
        type: actions.signOut.pending.type,
      })
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });
});

describe("Redux store auth singIn", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should handle GET_FAILED", () => {
    let errorText = "Error text";

    expect(
      reducer(undefined, {
        type: actions.singIn.rejected.type,
        error: errorText,
      })
    ).toEqual({
      ...initialState,
      error: errorText,
      isSetUser: false
    });
  });

  test("should handle GET_fulfilled", () => {
       expect(
      reducer(undefined, {
        type: actions.singIn.fulfilled.type, payload: {user}
      })
    ).toEqual({
      ...initialState,
      loading : false,
      name : user.name,
      password : "",
      email : user.email,
      user : user,
      isSetUser : true,

    });
  });

  test("should handle GET_pending", () => {
    expect(
      reducer(undefined, {
        type: actions.singIn.pending.type,
      })
    ).toEqual({
      ...initialState,
      loading: true,
      isSetUser: false
    });
  });
});

describe("Redux store auth userRegister", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should handle GET_FAILED", () => {
    let errorText = "Error text";

    expect(
      reducer(undefined, {
        type: actions.userRegister.rejected.type,
        error: errorText,
      })
    ).toEqual({
      ...initialState,
      error: errorText,
      isSetUser: false
    });
  });

  test("should handle GET_fulfilled", () => {
       expect(
      reducer(undefined, {
        type: actions.userRegister.fulfilled.type, payload: {user}
      })
    ).toEqual({
      ...initialState,
      loading : false,
      name : user.name,
      password : "",
      email : user.email,
      user : user,
      isSetUser : true,

    });
  });

  test("should handle GET_pending", () => {
    expect(
      reducer(undefined, {
        type: actions.userRegister.pending.type,
      })
    ).toEqual({
      ...initialState,
      loading: true,
      isSetUser: false
    });
  });
});

describe("Redux store auth callEmailToForget", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should handle GET_FAILED", () => {
    let errorText = "Error text";

    expect(
      reducer(undefined, {
        type: actions.callEmailToForget.rejected.type,
        error: errorText,
      })
    ).toEqual({
      ...initialState,
      error: errorText,
      callEmailForgot: false
    });
  });

  test("should handle GET_fulfilled", () => {
       expect(
      reducer(undefined, {
        type: actions.callEmailToForget.fulfilled.type, payload: {user}
      })
    ).toEqual({
      ...initialState,
      callEmailForgot: true,

    });
  });

  test("should handle GET_pending", () => {
    expect(
      reducer(undefined, {
        type: actions.callEmailToForget.pending.type,
      })
    ).toEqual({
      ...initialState,
      loading: true,
      callEmailForgot: false
    });
  });
});

describe("Redux store auth callResetPassword", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should handle GET_FAILED", () => {
    let errorText = "Error text";

    expect(
      reducer(undefined, {
        type: actions.callResetPassword.rejected.type,
        error: errorText,
      })
    ).toEqual({
      ...initialState,
      error: errorText,
    });
  });

  test("should handle GET_fulfilled", () => {
       expect(
      reducer(undefined, {
        type: actions.callResetPassword.fulfilled.type, payload: {user}
      })
    ).toEqual({
      ...initialState,
      callEmailForgot: false,
      password : "",
    });
  });

  test("should handle GET_pending", () => {
    expect(
      reducer(undefined, {
        type: actions.callResetPassword.pending.type,
      })
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });
});

describe("Redux store auth setUser", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should handle GET_FAILED", () => {
    let errorText = "Error text";

    expect(
      reducer(undefined, {
        type: actions.setUser.rejected.type,
        error: errorText,
      })
    ).toEqual({
      ...initialState,
      error: errorText,
      isSetUser: false
    });
  });

  test("should handle GET_fulfilled", () => {
       expect(
      reducer(undefined, {
        type: actions.setUser.fulfilled.type, payload: {user}
      })
    ).toEqual({
      ...initialState,
      loading : false,
      name : user.name,
      password : "",
      email : user.email,
      user : user,
      isSetUser : true,

    });
  });

  test("should handle GET_pending", () => {
    expect(
      reducer(undefined, {
        type: actions.setUser.pending.type,
      })
    ).toEqual({
      ...initialState,
      loading: true,
      isSetUser: false
    });
  });
});
