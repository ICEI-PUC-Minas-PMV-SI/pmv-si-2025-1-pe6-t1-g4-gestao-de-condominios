importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyD5K08gmFxDeQAG28UvcZVt4DHdaexRcFM",
    authDomain: "gestao-de-condominios-s.firebaseapp.com",
    projectId: "gestao-de-condominios-s",
    storageBucket: "gestao-de-condominios-s.appspot.com",
    messagingSenderId: "712087871747",
    appId: "1:712087871747:web:bc8d7fc38aee3f7c5b4936",
    measurementId: "G-R723611MD9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("📩 Mensagem recebida em segundo plano:", payload);
    
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/firebase-logo.png",
    });
});

console.log("✅ Service Worker configurado com sucesso!");