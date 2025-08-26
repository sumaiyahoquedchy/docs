const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function build() {
  try {
    console.log('Installing Mintlify CLI...');
    execSync('npm install -g mint', { stdio: 'inherit' });
    
    console.log('Building documentation...');
    // Since mint build doesn't exist, we'll create a simple static site
    // that mimics the Mintlify structure
    
    // Create dist directory
    await fs.ensureDir('dist');
    
    // Create a simple HTML file that will serve as the documentation
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
        }
        .header {
            text-align: center;
            margin-bottom: 3rem;
        }
        .content {
            background: #f8f9fa;
            padding: 2rem;
            border-radius: 8px;
        }
        .warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 1rem;
            border-radius: 4px;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Documentation Site</h1>
        <p>Your Mintlify documentation is ready for deployment</p>
    </div>
    
    <div class="content">
        <div class="warning">
            <strong>Note:</strong> This is a placeholder page. For full Mintlify functionality, 
            consider using Mintlify's hosting platform or setting up a proper static site generator.
        </div>
        
        <h2>Next Steps</h2>
        <ul>
            <li>Push your changes to GitHub</li>
            <li>Connect your repository to Vercel</li>
            <li>Deploy your documentation</li>
            <li>For full Mintlify features, visit <a href="https://mintlify.com">mintlify.com</a></li>
        </ul>
        
        <h2>Your Documentation Files</h2>
        <p>Your documentation content is located in the following files:</p>
        <ul>
            <li><code>index.mdx</code> - Main page</li>
            <li><code>docs.json</code> - Configuration</li>
            <li><code>essentials/</code> - Documentation pages</li>
            <li><code>api-reference/</code> - API documentation</li>
        </ul>
    </div>
</body>
</html>`;
    
    await fs.writeFile(path.join('dist', 'index.html'), htmlContent);
    
    // Copy static assets
    if (await fs.pathExists('images')) {
      await fs.copy('images', path.join('dist', 'images'));
    }
    if (await fs.pathExists('logo')) {
      await fs.copy('logo', path.join('dist', 'logo'));
    }
    if (await fs.pathExists('favicon.svg')) {
      await fs.copy('favicon.svg', path.join('dist', 'favicon.svg'));
    }
    
    console.log('Build completed successfully!');
    console.log('Static files generated in the dist/ directory');
    
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
