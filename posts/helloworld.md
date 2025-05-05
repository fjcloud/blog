# Hello World

Welcome to my blog!

In this first post, I'd like to share how I was able to generate this website.

## Generating the Website

The website is generated using [GitHub Pages](https://pages.github.com/), serving content directly from the `docs` directory of the repository. It uses a simple HTML file (`docs/index.html`) and a bit of JavaScript (`docs/app.js`) to fetch and display content.

### GitHub Pages Setup

GitHub Pages is configured to serve the website from the `docs` folder on the `main` branch. A `.nojekyll` file in the `docs` directory ensures GitHub Pages serves the files directly without attempting to use Jekyll.

The main page is `docs/index.html`, which includes:
-   A basic HTML structure.
-   [Water.css](https://cdn.jsdelivr.net/npm/water.css@2/out/dark.min.css) for a clean, dark theme.
-   A `div` with the ID `content` where the main content is loaded.
-   The [Marked.js](https://cdn.jsdelivr.net/npm/marked/marked.min.js) library to convert Markdown into HTML.
-   A reference to the custom script `docs/app.js`.

### Custom Domain

A custom domain is configured for the website through the GitHub Pages settings, pointing to the GitHub Pages service.

With this setup, the website automatically updates whenever changes are pushed to the `docs` directory in the `main` branch.

## The JavaScript Code

The `docs/app.js` file contains the JavaScript code that loads the content of the main `README.md` file from the repository root and displays it on the website. Here's what the code looks like:

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Fetch README.md from the repository root
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
```

This code runs when the page's HTML is fully loaded. It fetches the `README.md` file located one level up from the `docs` directory, converts its Markdown content to HTML using the `marked.parse()` function, and then inserts that HTML into the `<div id="content">` element within `index.html`.

## Advantages of This Setup

This setup has several advantages:

-   **Simplicity**: The website uses standard HTML, CSS, and JavaScript, making it easy to understand and maintain.
-   **Zero Cost**: Hosting on GitHub Pages is free for public repositories.
-   **Direct Markdown Rendering**: Content can be maintained in Markdown (`README.md` in this case) and rendered dynamically.
-   **Version control**: Because the website source is stored in a Git repository, you can easily track changes, revert to previous versions, and collaborate with others.
-   **Automatic Deployment**: GitHub Pages automatically rebuilds and deploys the site upon pushes to the configured branch/folder.
