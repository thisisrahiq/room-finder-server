const admin = require('firebase-admin');

let firebaseAdmin = null;

try {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const isPlaceholder = !privateKey || privateKey.includes('YOUR_PRIVATE_KEY_HERE') || privateKey.includes('PLACEHOLDER');

  if (isPlaceholder) {
    console.warn("⚠️  WARNING: Firebase Private Key contains placeholder values. Authentication features will not function.");
  } else if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId:   process.env.FIREBASE_PROJECT_ID,
        privateKey:  privateKey?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
    firebaseAdmin = admin;
  } else {
    firebaseAdmin = admin;
  }
} catch (error) {
  console.error("❌ Firebase Admin Initialization Failed:", error.message);
  console.warn("⚠️  Running backend without Firebase Authentication. Private routes will return 500 errors.");
}

module.exports = firebaseAdmin;

