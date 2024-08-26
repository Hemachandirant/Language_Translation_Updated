// Predefined username and
const validUsername = "DemoUser";
const validPassword= "demo@123";
 
function validateLogin(event) {
    // Prevent the default form submission
    event.preventDefault();
 
    // Get the values from the input fields
    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;
 
    
    if (enteredUsername === validUsername && enteredPassword === validPassword) {
        
        // Redirect to another page
        window.location.href = "home.html"; // Replace with the target page URL
    } else {
        // Show an error message
        document.getElementById("errorMessage").style.display = "block";
    }
}