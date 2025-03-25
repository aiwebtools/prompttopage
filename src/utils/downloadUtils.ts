
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const downloadPageAsZip = async (pageElement: HTMLElement | null, title: string, apiKey?: string, instructions?: string) => {
  if (!pageElement) return;

  try {
    const htmlContent = pageElement.outerHTML;
    const css = getEmbeddedCSS();
    
    // Create a ZIP file
    const zip = new JSZip();
    
    // Add HTML file with embedded API key and instructions
    zip.file("index.html", createFullHtmlDocument(htmlContent, title, css, apiKey, instructions));
    
    // Add assets folder with basic files
    const assetsFolder = zip.folder("assets");
    if (assetsFolder) {
      assetsFolder.file("styles.css", css);
      // You could add more assets here if needed
    }
    
    // Generate the ZIP file
    const content = await zip.generateAsync({ type: "blob" });
    
    // Save the ZIP file
    saveAs(content, `${title.toLowerCase().replace(/\s+/g, "-")}-landing-page.zip`);
    
    return true;
  } catch (error) {
    console.error("Failed to create zip file:", error);
    return false;
  }
};

// Get all the CSS from the current page
const getEmbeddedCSS = (): string => {
  let css = '';
  const styleSheets = document.styleSheets;
  
  for (let i = 0; i < styleSheets.length; i++) {
    try {
      const sheet = styleSheets[i];
      const rules = sheet.cssRules || sheet.rules;
      
      if (rules) {
        for (let j = 0; j < rules.length; j++) {
          css += rules[j].cssText + '\n';
        }
      }
    } catch (e) {
      // Some stylesheets may be from different origins and can't be accessed due to CORS
      console.warn('Could not access stylesheet:', e);
    }
  }
  
  return css;
};

// Create a complete HTML document with head and necessary meta tags
const createFullHtmlDocument = (bodyContent: string, title: string, css: string, apiKey?: string, instructions?: string): string => {
  // Add script to store API key and instructions in localStorage when the page loads
  const apiKeyScript = apiKey ? 
    `
    // Store API key and instructions in localStorage
    localStorage.setItem('openai_api_key', '${apiKey}');
    ${instructions ? `localStorage.setItem('ai_instructions', '${instructions.replace(/'/g, "\\'")}');` : ''}
    ` : '';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Landing Page</title>
  <style>
    ${css}
  </style>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      ${apiKeyScript}
    });
  </script>
</head>
<body>
  ${bodyContent}
</body>
</html>`;
};
