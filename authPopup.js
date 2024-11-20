const myMSALObj = new msal.PublicClientApplication(msalConfig);

let username = "";

// Function to select the current account
function selectAccount() {
    const currentAccounts = myMSALObj.getAllAccounts();
    if (currentAccounts.length === 0) {
        console.warn("No accounts detected. User needs to log in.");
        return;
    } else if (currentAccounts.length > 1) {
        console.warn("Multiple accounts detected. Using the first one.");
    }
    username = currentAccounts[0].username;
    showWelcomeMessage(username);
}

// Handle the response after login
function handleResponse(response) {
    if (response !== null) {
        username = response.account.username;
        localStorage.setItem("authToken", response.idToken); // Store token for session tracking
        showWelcomeMessage(username);
        navigateToHome();
    } else {
        selectAccount();
    }
}

// Sign-in function
async function signIn() {
    try {
        const activeInteraction = myMSALObj.getActiveAccount();
        if (activeInteraction) {
            console.warn("An interaction is already in progress. Please wait for it to complete.");
            return;
        }

        const currentAccounts = myMSALObj.getAllAccounts();
        if (currentAccounts.length > 0) {
            console.log("User is already signed in.");
            localStorage.setItem("authToken", "existingUserToken"); // Simulate token storage
            showWelcomeMessage(currentAccounts[0].username);
            navigateToHome();
            return;
        }

        const loginResponse = await myMSALObj.loginPopup(loginRequest);
        handleResponse(loginResponse);
    } catch (error) {
        if (error instanceof msal.InteractionRequiredAuthError) {
            console.error("Interaction required:", error);
        } else if (
            error instanceof msal.BrowserAuthError &&
            error.errorCode === "interaction_in_progress"
        ) {
            console.error(
                "Interaction is currently in progress. Please wait for the current interaction to complete."
            );
        } else {
            console.error("Error during sign-in:", error);
        }
    }
}

// Sign-out function
function signOut() {
    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
        mainWindowRedirectUri: msalConfig.auth.redirectUri,
    };

    // Clear session storage and redirect
    localStorage.removeItem("authToken");
    myMSALObj.logoutRedirect(logoutRequest);
}

// Show welcome message on the UI
function showWelcomeMessage(username) {
    const welcomeMessage = document.getElementById("welcomeMessage");
    if (welcomeMessage) {
        welcomeMessage.style.display = "block";
        document.getElementById("username").innerText = username;
    }
}

// Navigate to home.html if authenticated
function navigateToHome() {
    window.location.href = "home.html";
}

// Ensure the selectAccount function runs when the script is loaded
selectAccount();

// Restrict unauthorized access
function checkAuthentication() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        // Redirect to login page if user is not authenticated
        console.warn("User not authenticated. Redirecting to login.html.");
        window.location.href = "login.html";
    }
}

// Call checkAuthentication on restricted pages (e.g., home.html, translator.html)
if (window.location.pathname.includes("home.html") || window.location.pathname.includes("translator.html")) {
    checkAuthentication();
}
