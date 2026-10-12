// --- Leer el finca_id que viene en la URL (?finca_id=3) ---
const parametros = new URLSearchParams(window.location.search);
const fincaId = parametros.get("finca_id");

// Si alguien entra a esta página sin finca_id, lo mandamos de vuelta
if (!fincaId) {
    window.location.href = "/static/fincas.html";
}

document.getElementById("tituloFinca").textContent = `🌿 Parcelas de la finca #${fincaId}`;

const listaParcelas = document.getElementById("listaParcelas");
const mensajeCarga = document.getElementById("mensajeCarga");
const formParcela = document.getElementById("formParcela");
const mensajeErrorParcela = document.getElementById("mensajeErrorParcela");
let parcelaEditandoId = null;

// --- Cargar y mostrar las parcelas de esta finca ---
async function cargarParcelas() {
    try {
        const respuesta = await fetchConToken(`${API_URL}/parcelas/finca/${fincaId}`);

        if (!respuesta) return; // token inválido, ya redirigió

        if (!respuesta.ok) {
            mensajeCarga.textContent = "No se pudieron cargar las parcelas.";
            return;
        }

        const parcelas = await respuesta.json();
        mensajeCarga.classList.add("oculto");

        if (parcelas.length === 0) {
            listaParcelas.innerHTML = "<p>Todavía no hay parcelas registradas en esta finca.</p>";
            return;
        }

        window.parcelasCargadas = parcelas;

            listaParcelas.innerHTML = parcelas.map(parcela => `
                <div class="tarjeta-finca">
                    <h3>${parcela.nombre_parcelas}</h3>
                    <p>📐 ${parcela.area_parcelas} hectáreas</p>
                    <a href="/static/cultivos.html?parcela_id=${parcela.id_parcelas}">Ver cultivos →</a>
                    <div class="acciones-tarjeta">
                        <button onclick="editarParcela(${parcela.id_parcelas})" class="btn-accion btn-editar">✏️ Editar</button>
                        <button onclick="eliminarParcela(${parcela.id_parcelas})" class="btn-accion btn-eliminar">🗑️ Eliminar</button>
                    </div>
                </div>
            `).join("");

    } catch (error) {
        console.error("Error al cargar parcelas:", error);
        mensajeCarga.textContent = "Error de conexión con el servidor.";
    }
}

cargarParcelas();

// --- Entrar en modo edición ---
function editarParcela(id) {
    const parcela = window.parcelasCargadas.find(p => p.id_parcelas === id);
    if (!parcela) return;

    parcelaEditandoId = id;

    document.getElementById("nombreParcela").value = parcela.nombre_parcelas;
    document.getElementById("areaParcela").value = parcela.area_parcelas;

    document.querySelector("#formParcela button[type=submit]").textContent = "Guardar cambios";
    formParcela.classList.remove("oculto");
    formParcela.scrollIntoView({ behavior: "smooth" });
}

// --- Eliminar parcela ---
async function eliminarParcela(id) {
    const confirmar = confirm("¿Seguro que quieres eliminar esta parcela? Esto también borrará sus cultivos asociados.");
    if (!confirmar) return;

    try {
        const respuesta = await fetchConToken(`${API_URL}/parcelas/${id}`, { method: "DELETE" });
        if (!respuesta) return;

        if (!respuesta.ok) {
            const error = await respuesta.json();
            alert(error.detail || "No se pudo eliminar la parcela.");
            return;
        }

        cargarParcelas();

    } catch (error) {
        console.error("Error al eliminar parcela:", error);
        alert("Error de conexión con el servidor.");
    }
}

// --- Mostrar / ocultar formulario ---
const btnMostrarForm = document.getElementById("btnMostrarForm");
btnMostrarForm.addEventListener("click", () => {
    parcelaEditandoId = null;
    formParcela.reset();
    document.querySelector("#formParcela button[type=submit]").textContent = "Guardar parcela";
    formParcela.classList.toggle("oculto");
});

// --- Registrar nueva parcela ---
formParcela.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    mensajeErrorParcela.textContent = "";

    const esEdicion = parcelaEditandoId !== null;

    const datosParcela = esEdicion
        ? {
            nombre_parcelas: document.getElementById("nombreParcela").value,
            area_parcelas: parseFloat(document.getElementById("areaParcela").value)
          }
        : {
            nombre_parcelas: document.getElementById("nombreParcela").value,
            area_parcelas: parseFloat(document.getElementById("areaParcela").value),
            coordenadas_parcelas: {},
            fincas_id: parseInt(fincaId)
          };

    const url = esEdicion ? `${API_URL}/parcelas/${parcelaEditandoId}` : `${API_URL}/parcelas/`;
    const metodo = esEdicion ? "PUT" : "POST";

    try {
        const respuesta = await fetchConToken(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosParcela)
        });

        if (!respuesta) return;

        if (!respuesta.ok) {
            const error = await respuesta.json();
            mensajeErrorParcela.textContent = error.detail || "No se pudo guardar la parcela.";
            return;
        }

        formParcela.reset();
        formParcela.classList.add("oculto");
        parcelaEditandoId = null;
        cargarParcelas();

    } catch (error) {
        console.error("Error al guardar parcela:", error);
        mensajeErrorParcela.textContent = "Error de conexión con el servidor.";
    }
});

