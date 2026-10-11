// Protección de páginas: si no hay token guardado, no se puede entrar.
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/static/index.html";
}

// Función para cerrar sesión (la usaremos en el botón de logout)
function cerrarSesion() {
    localStorage.removeItem("token");
    window.location.href = "/static/index.html";
}

// Función reutilizable para hacer peticiones autenticadas a la API.
// La vamos a usar en TODOS los próximos pasos (fincas, parcelas, cultivos).
async function fetchConToken(url, opciones = {}) {
    const headers = {
        ...opciones.headers,
        "Authorization": `Bearer ${token}`
    };
    const respuesta = await fetch(url, { ...opciones, headers });

    // Si el token venció o es inválido, el backend devuelve 401
    if (respuesta.status === 401) {
        cerrarSesion();
        return null;
    }
    return respuesta;
}