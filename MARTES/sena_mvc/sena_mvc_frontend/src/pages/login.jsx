     import { useState } from "react";
     import { useNavigate } from "react-router-dom";
     
     import { login } from "../api/auth";
     
     export default function Login() {
     
       const navigate =
         useNavigate();
     
       const [email, setEmail] =
         useState("");
     
       const [password, setPassword] =
         useState("");
     
       const [respuesta,
         setRespuesta] =
         useState("");
     
       const iniciarSesion =
         async (e) => {
     
           e.preventDefault();
     
           try {
     
             const data =
               await login(
                 email,
                 password
               );
     
             console.log(data);
     
             localStorage.setItem(
               "token",
               data.access_token
             );
     
             navigate("/dashboard");
     
           } catch {
     
             setRespuesta(
               "Error de autenticación"
             );
           }
         };
     
       return (
     
         <div className="container mt-5">
     
           <h2>
             Login ADSO
           </h2>
     
           <form
             onSubmit={iniciarSesion}
           >
     
             <div className="mb-3">
     
               <input
                 className="form-control"
                 placeholder="Correo"
                 value={email}
                 onChange={(e) =>
                   setEmail(
                     e.target.value
                   )
                 }
               />
     
             </div>
     
             <div className="mb-3">
     
               <input
                 type="password"
                 className="form-control"
                 placeholder="Contraseña"
                 value={password}
                 onChange={(e) =>
                   setPassword(
                     e.target.value
                   )
                 }
               />
     
             </div>
     
             <button
               className="btn btn-primary"
             >
               Ingresar
             </button>
     
           </form>
     
           <div className="mt-3 text-danger">
     
             {respuesta}
     
           </div>
     
         </div>
     
       );
     }
