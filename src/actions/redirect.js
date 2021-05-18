export const REDIRECTED_PATH = "REDIRECTED_PATH";

export const setRedirectedPath = (redirectedPath) => {
    let rc = {
        type: REDIRECTED_PATH,
        redirectedPath: redirectedPath,
    }
    return rc;
}
