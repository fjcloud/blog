# Hello World

Welcome to my blog!

In this first post, I'd like to share how I was able to generate this website.

## Generating the Website

The website is generated using a combination of GitHub Actions, AWS S3, and a custom domain.

### GitHub Actions

The `.github/workflows/main.yml` file defines a GitHub Actions workflow that is triggered whenever changes are pushed to the `html` directory in the `main` branch. This workflow syncs the `html` directory to an AWS S3 bucket using the `jakejarvis/s3-sync-action` action.

Here's what the workflow file looks like:

```yaml
name: Upload new index

on:
  push:
    paths:
    - html/**
    branches:
    - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - uses: jakejarvis/s3-sync-action@master
      with:
        args: --acl public-read --follow-symlinks --delete
      env:
        AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_S3_ENDPOINT: https://s3.fr-par.scw.cloud
        AWS_REGION: fr-par
        SOURCE_DIR: 'html'
```

### AWS S3

The AWS S3 bucket is configured to serve a static website. Whenever changes are pushed to the `html` directory in the `main` branch, the GitHub Actions workflow syncs these changes to the S3 bucket, effectively updating the website.

### Custom Domain

I've also configured a custom domain for the website. This involved adding a CNAME record to my DNS settings that points to the AWS S3 bucket.

And that's it! With these configurations in place, I can easily update my website by pushing changes to the `html` directory in the `main` branch.

## The JavaScript Code

The `html/script.js` file contains a simple JavaScript code that loads the content of the markdown files and displays it on the website. Here's what the code looks like:

```javascript
window.onload = function() {
    var path = window.location.pathname;
    if (path === '/') {
        path = '/index';
    }
    var githubUrl = 'https://raw.githubusercontent.com/fjcloud/ai-blog/main' + path + '.md';
    fetch(githubUrl)
        .then(response => response.text())
        .then(text => {
            var html = marked.parse(text);
            // Replace .md links with links without .md
            html = html.replace(/href="([^"]+).md"/g, 'href="$1"');
            document.getElementById('content').innerHTML = html;
        });
};
```

This code runs when the page loads. It fetches the markdown file corresponding to the current path, converts it to HTML using the `marked` library, and inserts it into the `content` div.

## Advantages of This Setup

This setup has several advantages:

- **Simplicity**: The website is just a collection of static files, which makes it easy to understand and maintain.
- **Flexibility**: You can easily add new pages by adding new markdown files.
- **Scalability**: Because the website is hosted on AWS S3, it can handle a large amount of traffic.
- **Cost-effectiveness**: Hosting a static website on AWS S3 is very cheap compared to traditional hosting services.
- **Version control**: Because the website is stored in a Git repository, you can easily track changes, revert to previous versions, and collaborate with others.
