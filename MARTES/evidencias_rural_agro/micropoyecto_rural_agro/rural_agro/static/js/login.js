// Esperamos a que el formulario exista en la página
const formLogin = document.getElementById("formLogin");
const mensajeError = document.getElementById("mensajeError");

formLogin.addEventListener("submit", async (evento) => {
    // Evita que el formulario recargue la página (comportamiento por defecto del navegador)
    evento.preventDefault();

    // Limpiamos el mensaje de error anterior
    mensajeError.textContent = "";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // OJO: tu backend usa OAuth2PasswordRequestForm, que espera datos
    // tipo formulario (no JSON), con los campos "username" y "password".
    const datosFormulario = new URLSearchParams();
    datosFormulario.append("username", email); // tu backend usa form_data.username como el email
    datosFormulario.append("password", password);

    try {
        const respuesta = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: datosFormulario
        });

        if (!respuesta.ok) {
            // El backend responde 400 con detail: "Correo o contraseña incorrectos"
            const error = await respuesta.json();
            mensajeError.textContent = error.detail || "Error al iniciar sesión";
            return;
        }

        const datos = await respuesta.json();
        // datos = { access_token: "...", token_type: "bearer" }

        // Guardamos el token en localStorage para usarlo en las próximas peticiones
        localStorage.setItem("token", datos.access_token);
        
        // Redirigimos al dashboard
        window.location.href = "/static/dashboard.html";

    } catch (error) {
        console.error("Error de conexión:", error);
        mensajeError.textContent = "No se pudo conectar con el servidor.";
    }   
});