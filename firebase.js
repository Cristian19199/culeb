// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDJ5JWLu6P7ls1gZP-7GnNCWs4AHz5uFrI",
    authDomain: "juego-b6217.firebaseapp.com",
    projectId: "juego-b6217",
    storageBucket: "juego-b6217.firebasestorage.app",
    messagingSenderId: "450201070695",
    appId: "1:450201070695:web:b9e9f39a0f0b6608a438c2"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Función para guardar puntuación en Firestore
function saveScore(score) {
    db.collection("scores").add({
        score: score,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log("Puntuación guardada");
    })
    .catch((error) => {
        console.error("Error al guardar puntuación: ", error);
    });
}
