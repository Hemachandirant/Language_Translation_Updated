// Secret key for encryption and decryption
const secretKey = 'eCDA78ae32f';

function encrypt(text) {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
}

function decrypt(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

function navigateTo(page) {
    const encryptedPage = encrypt(page);
    window.location.href = `${page}#${encryptedPage}`;
}

function handleNavigation() {
    if (window.location.hash) {
        const encryptedPage = window.location.hash.substring(1);
        try {
            const decryptedPage = decrypt(encryptedPage);
            const currentPage = window.location.pathname.split('/').pop();

            // Re-encrypt the current page if the decrypted page does not match the current page
            if (decryptedPage && decryptedPage !== currentPage) {
                navigateTo(decryptedPage);
            }
        } catch (error) {
            console.error('Decryption failed:', error);
        }
    }
}

// Add click event listeners to all navigation links
function addNavigationListeners() {
    const navLinks = document.querySelectorAll('a[data-page]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const page = this.getAttribute('data-page');
            navigateTo(page);
        });
    });
}

// Initialize everything when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    addNavigationListeners();
    handleNavigation();
});

// Also handle navigation when the hash changes
window.addEventListener('hashchange', handleNavigation);

// Reapply encryption on every page load
window.addEventListener('load', function() {
    handleNavigation();
});


    
