const myMSALObj = new msal.PublicClientApplication(msalConfig);
let username = "";
let isSigningIn = false; // Flag to prevent multiple sign-in attempts

// Function to check if the user is logged in
function checkAuthentication() {
    const currentAccounts = myMSALObj.getAllAccounts();
    if (currentAccounts.length === 0) {
        // No user is logged in, redirect to the login page
        window.location.href = "/login.html";
    } else {
        username = currentAccounts[0].username;
        showWelcomeMessage(username);
    }
}

// Ensure the selectAccount function runs when the script is loaded
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

// Function to handle user sign-in
async function signIn() {
    if (isSigningIn) {
        console.warn("Sign-in process is already in progress. Please wait.");
        return;
    }

    try {
        isSigningIn = true; // Set flag to prevent multiple logins

        // Check if an interaction is already in progress
        const activeInteraction = myMSALObj.getActiveAccount();
        if (activeInteraction) {
            console.warn("An interaction is already in progress. Please wait for it to complete.");
            return;
        }

        const currentAccounts = myMSALObj.getAllAccounts();
        if (currentAccounts.length > 0) {
            console.log("User is already signed in");
            showWelcomeMessage(currentAccounts[0].username);
            return;
        }

        // Start login interaction
        await myMSALObj.loginRedirect(loginRequest);
    } catch (error) {
        if (error instanceof msal.InteractionRequiredAuthError) {
            console.error("Interaction required:", error);
        } else if (error instanceof msal.BrowserAuthError && error.errorCode === "interaction_in_progress") {
            console.error("Interaction is currently in progress. Please wait for the current interaction to complete.");
        } else {
            console.error("Error during sign-in:", error);
        }
    } finally {
        isSigningIn = false; // Reset flag when login process is complete
    }
}

// Function to handle user sign-out
function signOut() {
    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
        mainWindowRedirectUri: msalConfig.auth.redirectUri
    };

    myMSALObj.logoutRedirect(logoutRequest);
}

// Function to display a welcome message with the user's username
function showWelcomeMessage(username) {
    document.getElementById('welcomeMessage').style.display = 'block';
    document.getElementById('username').innerText = username;
}

// Run the authentication check when the page is loaded
window.onload = function () {
    checkAuthentication();
};
