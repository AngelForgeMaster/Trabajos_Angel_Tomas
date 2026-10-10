import api from "./client";

export const login = async (
  username,
  password
) => {
  
  const formData =
      new URLSearchParams();

    formData.append(
      "username",
      username
    );
    
   formData.append(
         "password",
         password
       );
     
       const response =
         await api.post(
           "/login",
           formData
         );
     
       return response.data;
     };

     
 