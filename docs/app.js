document.addEventListener('DOMContentLoaded', function() {
    // Fetch README.md from the repository root
    // Note: This assumes the GitHub Pages site is served from the 'docs' folder
    // and the README is in the parent directory (repository root).
    fetch('../README.md') // Relative path from docs/app.js to root README.md
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(markdown => {
            // Convert Markdown to HTML using marked.js
            const htmlContent = marked.parse(markdown);
            
            // Display the HTML in the 'content' div
            const contentDiv = document.getElementById('content');
            if (contentDiv) {
                contentDiv.innerHTML = htmlContent;
            } else {
                console.error('Content div not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching or parsing README.md:', error);
            const contentDiv = document.getElementById('content');
            if (contentDiv) {
                contentDiv.innerHTML = '<p>Error loading README.md. Please check the console for details.</p>';
            }
        });
}); 