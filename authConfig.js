const msalConfig = {
    auth: {
       // 'Application (client) ID' of app registration in Azureportal - this value is a GUID
       clientId: "a424b060-6395-472d-a270-e7e7c79bc2bf",
       // Full directory URL, in the form ofhttps://login.microsoftonline.com/<tenant-id>
       authority:
 "https://login.microsoftonline.com/f5791d91-daca-4d28-8700-680f7a2f8b6a",
       // Full redirect URL, in form of http://localhost:3000
       redirectUri: "https://documenttranslation12.azurewebsites.net/home.html",
    // redirectUri:"http://127.0.0.1:5500/home.html",
   },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case msal.LogLevel.Error:
                        console.error(message);
                        return;
                    case msal.LogLevel.Info:
                        console.info(message);
                        return;
                    case msal.LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case msal.LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
 };
  
 const loginRequest = {
    scopes: ["User.Read"]
 };
  
 const tokenRequest = {
    scopes: ["User.Read", "Mail.Read"],
    forceRefresh: false
 };
