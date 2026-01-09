const fs = require('fs');
const path = require('path');

const envFilePath = path.join(__dirname, 'src', 'environments', 'environment.prod.ts');
const apiUrl = process.env.API_URL || 'https://pdftofacturae.onrender.com/api/v1/facturae/convert-pdf';

if (fs.existsSync(envFilePath)) {
    let content = fs.readFileSync(envFilePath, 'utf8');
    content = content.replace('API_URL_PLACEHOLDER', apiUrl);
    fs.writeFileSync(envFilePath, content);
    console.log(`Successfully injected API_URL: ${apiUrl}`);
} else {
    console.error('environment.prod.ts not found');
    process.exit(1);
}
