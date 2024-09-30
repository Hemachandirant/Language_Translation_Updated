const msalConfig = {
    auth: {
        // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        clientId: "a424b060-6395-472d-a270-e7e7c79bc2bf",
        // Full directory URL, in the form of https://login.microsoftonline.com/<tenant-id>
        authority: "https://login.microsoftonline.com/f5791d91-daca-4d28-8700-680f7a2f8b6a",
        // Full redirect URL, in form of https://documenttranslation12.azurewebsites.net/home.html
        redirectUri: "https://documenttranslation12.azurewebsites.net/home.html",
    },
    cache: {
        cacheLocation: "sessionStorage", // You can change this to "localStorage" if preferred
        storeAuthStateInCookie: false,   // Set to true for IE11/Edge support
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) return;
                switch (level) {
                    case msal.LogLevel.Error: console.error(message); break;
                    case msal.LogLevel.Info: console.info(message); break;
                    case msal.LogLevel.Verbose: console.debug(message); break;
                    case msal.LogLevel.Warning: console.warn(message); break;
                }
            }
        }
    }
};

// Define the login request
const loginRequest = {
    scopes: ["User.Read"]
};

// Define token request for further permissions
const tokenRequest = {
    scopes: ["User.Read", "Mail.Read"],
    forceRefresh: false
};

// Initialize MSAL client
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

        const currentAccounts = myMSALObj.getAllAccounts();
        if (currentAccounts.length > 0) {
            console.log("User is already signed in");
            showWelcomeMessage(currentAccounts[0].username);
            return;
        }

        // Start login interaction
        console.log("Starting login redirect...");
        await myMSALObj.loginRedirect(loginRequest);
    } catch (error) {
        if (error instanceof msal.InteractionRequiredAuthError) {
            console.error("Interaction required:", error);
        } else if (error instanceof msal.BrowserAuthError && error.errorCode === "interaction_in_progress") {
            console.error("Interaction is currently in progress. Please wait.");
        } else {
            console.error("Error during sign-in:", error);
        }
    } finally {
        isSigningIn = false; // Reset flag when login process is complete
    }
}

// Handle the redirect response when returning from Azure AD
myMSALObj.handleRedirectPromise()
    .then(response => {
        if (response) {
            console.log("Login successful!", response);
            handleResponse(response);
        } else {
            console.log("No response received from loginRedirect.");
        }
    })
    .catch(error => {
        console.error("Error handling redirect promise:", error);
    });

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
