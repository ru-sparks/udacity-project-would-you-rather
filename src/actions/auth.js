export const AUTHORIZE_USER = "AUTHORIZE_USER";
export const REMOVE_AUTHORIZATION = "REMOVE_AUTHORIZATION";

export const authorizeUser = (userId) => {
    let rc = {
        type: AUTHORIZE_USER,
        authorizedUser: userId,
    }
    return rc;
}


