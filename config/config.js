

const config = {
    
    // base_url: process.env.BASE_URL,
    // port: process.env.PORT,
    
    db: {
        db_URI: process.env.MONGODB_URI
    },
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
    firebaseConfig: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
    }
}

console.log(config)

module.exports = config