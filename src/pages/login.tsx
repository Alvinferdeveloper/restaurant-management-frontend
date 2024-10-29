import { gql, useMutation } from "@apollo/client";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
const LOGIN = gql`
 mutation LOGIN($email: String!, $password: String!) {
 login(email: $email, password: $password) {
  name
 }
}

`;
export default function Login() {
    const [login ] = useMutation(LOGIN);
    const [ email, setEmail ] = useState('');
    const [ badCredentials, setBadCredentials ] = useState(false);
    const [ password, setPassword ] = useState('');
  
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-96 transform transition-all hover:scale-105 duration-300">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Iniciar Sesión</h2>
                <form className="space-y-6" onSubmit={async (e)=> {
                    e.preventDefault();
                    const res = await login({ variables: { email, password}});
                    if(res.data.login)navigate('/Admin/Dashboard');
                    setBadCredentials(true)
                }}>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            placeholder="tu@ejemplo.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="********"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transform transition-all duration-300 hover:scale-105"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                    { badCredentials && (
                        <p className=" text-red-600">Credenciales Invalidas</p>
                    )}
                    
                </form>
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        ¿No tienes una cuenta?{' '}
                        <a href="/register" className="text-purple-500 hover:text-purple-600 font-semibold">
                            Regístrate aquí
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}