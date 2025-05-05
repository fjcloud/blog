window.onload = function() {
    var path = window.location.pathname;
    if (path === '/') {
        path = '/index';
    }
    var githubUrl = 'https://raw.githubusercontent.com/fjcloud/blog/main' + path + '.md';
    fetch(githubUrl)
        .then(response => response.text())
        .then(text => {
            var html = marked.parse(text);
            // Replace .md links with links without .md
            html = html.replace(/href="([^"]+).md"/g, 'href="$1"');
            document.getElementById('content').innerHTML = html;
        });
};
