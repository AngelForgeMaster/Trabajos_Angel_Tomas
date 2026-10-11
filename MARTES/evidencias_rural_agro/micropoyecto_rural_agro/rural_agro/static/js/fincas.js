const listaFincas = document.getElementById("listaFincas");
const mensajeCarga = document.getElementById("mensajeCarga");

// --- Cargar y mostrar las fincas ---
async function cargarFincas() {
    try {
        const respuesta = await fetch(`${API_URL}/fincas/`);

        if (!respuesta.ok) {
            mensajeCarga.textContent = "No se pudieron cargar las fincas.";
            return;
        }

        const fincas = await respuesta.json();
        mensajeCarga.classList.add("oculto");

        if (fincas.length === 0) {
            listaFincas.innerHTML = "<p>Todavía no hay fincas registradas.</p>";
            return;
        }

        // Construimos el HTML de cada finca y lo insertamos todo junto
        listaFincas.innerHTML = fincas.map(finca => `
            <div class="tarjeta-finca">
                <h3>${finca.nombre_fincas}</h3>
                <p>📍 ${finca.ubicacion_fincas}</p>
                <a href="/static/parcelas.html?finca_id=${finca.id_fincas}">Ver parcelas →</a>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error al cargar fincas:", error);
        mensajeCarga.textContent = "Error de conexión con el servidor.";
    }
}

// Llamamos la función apenas carga la página
cargarFincas();

// --- Mostrar / ocultar el formulario ---
const btnMostrarForm = document.getElementById("btnMostrarForm");
const formFinca = document.getElementById("formFinca");

btnMostrarForm.addEventListener("click", () => {
    formFinca.classList.toggle("oculto");
});