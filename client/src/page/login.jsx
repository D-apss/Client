import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Komponen bernama LoginPage dengan PascalCase
export default function LoginPage() {
   const navigate = useNavigate();
   const [loginInput, setLoginInput] = useState({
      email: "",
      password: "",
   });

   
   function handleInputLoginForm(event) {
      const { name, value } = event.target;
      setLoginInput({
         ...loginInput,
         [name]: value,
      });
   }

   async function handleSubmitLogin(event) {
      event.preventDefault();
      try {
         const response = await axios({
            method: "POST",
            url: "http://localhost:3000/login",
            data: loginInput,
         });
         console.log(response);
         localStorage.setItem("access_token", response.data.access_token);
         navigate("/home");
      } catch (error) {
         console.error("Error updating job:", error);
         if (error.response && error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message;
            Swal.fire({
               icon: "error",
               title: "Oops...",
               text: errorMessage,
            });
         } else {
            Swal.fire({
               icon: "error",
               title: "Oops...",
               text: "Failed to Login!",
            });
         }
      }
   }
   return (
      <>
         <div className="container h-screen mx-auto">
            <div className="grid grid-cols-10 h-screen place-items-center">
               <div className="col-start-2 col-span-8 sm:col-start-2 sm:col-span-8 place-items-center">
                  <h2 className="text-4xl tracking-widest text-white text-opacity-70 text-center uppercase mb-14">
                     <p>
                        <span className="text-white text-opacity-100 text-6xl font-bold">Hacktiv Legends</span>
                     </p>
                  </h2>
                  <div className="grid grid-cols-10">
                     <div className="col-start-2 col-span-8">
                        <h2 className="text-white text-opacity-80 text-2xl text-center mb-7">Login Now</h2>
                        <div className="card px-10 py-5 sm:px-20 sm:py-10 rounded-md">
                           <form className="mt-6 mb-6 space-y-6" onSubmit={handleSubmitLogin}>
                              <div className="mb-5">
                                 <label htmlFor="email-address" className="sr-only">
                                    Email address
                                 </label>
                                 <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    onChange={handleInputLoginForm}
                                    autoComplete="off"
                                    required
                                    className="block w-full px-3 py-2 border rounded-sm text-purple-900 focus:outline-none focus:ring focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-lg tracking-wider"
                                    placeholder="Email address"
                                 />
                              </div>
                              <div>
                                 <label htmlFor="password" className="sr-only">
                                    Password
                                 </label>
                                 <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={handleInputLoginForm}
                                    autoComplete="off"
                                    required
                                    className="block w-full px-3 py-2 border rounded-sm text-purple-900 focus:outline-none focus:ring focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-lg tracking-wider"
                                    placeholder="Password"
                                 />
                              </div>
                              <div>
                                 <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm rounded-sm text-purple-900 bg-white bg-opacity-90 hover:bg-white hover:bg-opacity-80 focus:outline-none focus:ring focus:border-purple-500 focus:ring-purple-500 text-lg tracking-wider flex font-bold">
                                    Log In
                                 </button>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
