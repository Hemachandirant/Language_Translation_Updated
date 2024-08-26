// Function to toggle star state
function toggleStar(element, docName) {
    const isStarred = element.src.includes("starred.png");

    if (isStarred) {
        element.src = "unstarred.png";
        removeStarredDocument(docName);
    } else {
        element.src = "starred.png";
        addStarredDocument(docName);
    }
}

// Function to add a document to starred list
function addStarredDocument(docName) {
    let starredDocs = JSON.parse(localStorage.getItem('starredDocs')) || [];
    if (!starredDocs.includes(docName)) {
        starredDocs.push(docName);
        localStorage.setItem('starredDocs', JSON.stringify(starredDocs));
    }
    updateFavoritesPage();
}

// Function to remove a document from starred list
function removeStarredDocument(docName) {
    let starredDocs = JSON.parse(localStorage.getItem('starredDocs')) || [];
    starredDocs = starredDocs.filter(doc => doc !== docName);
    localStorage.setItem('starredDocs', JSON.stringify(starredDocs));
    updateFavoritesPage();
}

// Initialize starred documents on page load
document.addEventListener("DOMContentLoaded", function () {
    let starredDocs = JSON.parse(localStorage.getItem('starredDocs')) || [];
    document.querySelectorAll('.history-table .star-icon').forEach(img => {
        let docName = img.getAttribute('onclick').split("'")[1];
        if (starredDocs.includes(docName)) {
            img.src = "starred.png";
        }
    });

    updateFavoritesPage();
});

// Function to dynamically update the favorites page
function updateFavoritesPage() {
    const favoritesTableBody = document.getElementById('favoritesTableBody');
    if (favoritesTableBody) {
        favoritesTableBody.innerHTML = '';
        let starredDocs = JSON.parse(localStorage.getItem('starredDocs')) || [];
        starredDocs.forEach(docName => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="path/to/${docName}" target="_blank">${docName}</a></td>
                <td>Starred</td>
            `;
            favoritesTableBody.appendChild(row);
        });
    }
}
