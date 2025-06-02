import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: tsx scripts/base64-encoder.ts <path_to_file>');
  process.exit(1);
}

const credentialsPath = path.join(args[0]);

try {
  const credentials = fs.readFileSync(credentialsPath, 'utf8');
  const encoded = Buffer.from(credentials).toString('base64');
  console.log('Credentials encoded in Base64:');
  console.log(encoded);
  console.log(
    '\nNow you can copy this string and put it in your environment variable, for example:'
  );
  console.log('NODEMAILER_CREDS_BASE64="your_base64_string_here"');
} catch (error) {
  console.error('Error reading or encoding credentials:', error);
}
