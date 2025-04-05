export const firebaseClientConfig = {
    apiKey: process.env.FIREBASE_API_KEY!,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.FIREBASE_PROJECT_ID!,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.FIREBASE_SENDER_ID!,
    appId: process.env.FIREBASE_APP_ID!,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID!,
  };
  
  export const vapidKey = process.env.FIREBASE_VAPID_KEY!;