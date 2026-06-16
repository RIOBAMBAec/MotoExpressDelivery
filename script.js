import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCtyU8MpORmsq5zbrbYpCzJ1K5WT3muhhk",
    authDomain: "motoexpressriobamba-6b829.firebaseapp.com",
    projectId: "motoexpressriobamba-6b829",
    storageBucket: "motoexpressriobamba-6b829.firebasestorage.app",
    messagingSenderId: "387045012455",
    appId: "1:387045012455:web:7b8111bf89b5a4b6628342",
    measurementId: "G-B3TPGM5VWW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("pedidoForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const recogida = document.getElementById("recogida").value;
    const entrega = document.getElementById("entrega").value;
    const tipo = document.getElementById("tipo").value;
    const descripcion = document.getElementById("descripcion").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const receptor = document.getElementById("receptor").value;
    const pago = document.getElementById("pago").value;

    try {

        const docRef = await addDoc(collection(db, "pedidos"), {

            nombre,
            telefono,
            recogida,
            entrega,
            tipo,
            descripcion,
            fecha,
            hora,
            receptor,
            pago,

            estado: "Pendiente",

            fechaRegistro: new Date()

        });

        let mensaje = `🚚 *NUEVO PEDIDO* %0A%0A`;

        mensaje += `🆔 Pedido: ${docRef.id}%0A`;
        mensaje += `👤 Nombre: ${nombre}%0A`;
        mensaje += `📱 Teléfono: ${telefono}%0A`;
        mensaje += `📍 Recogida: ${recogida}%0A`;
        mensaje += `🏠 Entrega: ${entrega}%0A`;
        mensaje += `📦 Tipo: ${tipo}%0A`;
        mensaje += `📝 Descripción: ${descripcion}%0A`;
        mensaje += `📅 Fecha: ${fecha || "No especificada"}%0A`;
        mensaje += `⏰ Hora: ${hora || "No especificada"}%0A`;
        mensaje += `🙋 Recibe: ${receptor}%0A`;
        mensaje += `💵 Pago: ${pago}%0A`;

        alert("✅ Pedido guardado correctamente.");

        window.open(
            `https://wa.me/593995494655?text=${mensaje}`,
            "_blank"
        );

        document.getElementById("pedidoForm").reset();

    } catch (error) {

        console.error(error);

        alert("❌ Error al guardar el pedido.");

    }

});