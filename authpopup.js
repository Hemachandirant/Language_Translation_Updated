 
const myMSALObj = new msal.PublicClientApplication(msalConfig);
 
let username = "";
 
function selectAccount() {
    const currentAccounts = myMSALObj.getAllAccounts();
    if (currentAccounts.length === 0) {
        return;
    } else if (currentAccounts.length > 1) {
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
        showWelcomeMessage(username);
    }
}
 
function handleResponse(response) {
    if (response !== null) {
        username = response.account.username;
        showWelcomeMessage(username);
    } else {
        selectAccount();
    }
}
 
async function signIn() {
    try {
        // Check if interaction is in progress
        const activeInteraction = myMSALObj.getActiveAccount();
        if (activeInteraction) {
            console.warn("An interaction is already in progress.Please wait for it to complete.");
            return;
        }
 
        const currentAccounts = myMSALObj.getAllAccounts();
        if (currentAccounts.length > 0) {
            console.log("User is already signed in");
            showWelcomeMessage(currentAccounts[0].username);
            return;
        }
 
        await myMSALObj.loginRedirect(loginRequest);
    } catch (error) {
        if (error instanceof msal.InteractionRequiredAuthError) {
            // Handle interaction required error
            console.error("Interaction required:", error);
        } else if (error instanceof msal.BrowserAuthError &&
error.errorCode === "interaction_in_progress") {
            // Handle interaction in progress error
            console.error("Interaction is currently in progress.Please wait for the current interaction to complete.");
        } else {
            // Handle other errors
            console.error("Error during sign-in:", error);
        }
    }
}
 
function signOut() {
    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
        mainWindowRedirectUri: msalConfig.auth.redirectUri
    };
 
    myMSALObj.logoutRedirect(logoutRequest);
}
 
function showWelcomeMessage(username) {
    document.getElementById('welcomeMessage').style.display = 'block';
    document.getElementById('username').innerText = username;
}
 
// Ensure the selectAccount function runs when the script is loaded
selectAccount();