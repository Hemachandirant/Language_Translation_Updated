//logout

function toggleDropdown() {
    const dropdown = document.getElementById("profileDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  }
  
  // Optional: Close the dropdown if clicked outside
  window.onclick = function(event) {
    const dropdown = document.getElementById("profileDropdown");
    if (!event.target.matches('#profileLink') && dropdown.style.display === "block") {
        dropdown.style.display = "none";
    }
  };
  
  
  
  function logout() {
    // Your logout logic here
    alert("Logging out...");
    window.location.href = "login.html"; // Replace with your actual logout URL
  }