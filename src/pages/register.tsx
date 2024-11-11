import Spinner from "@/components/shared/spiner";
import { GET_USER_AUTH, REGISTER } from "@/resolvers/auth"
import { ApolloError, useMutation } from "@apollo/client"
import { FormEvent, useState } from "react";

export default function Register() {
  const [register, { loading }] = useMutation(REGISTER, { refetchQueries: [{ query: GET_USER_AUTH}]});
  const [emailExist, setEmailExist] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    cedula: '',
    gender: 'M',
    email: '',
    password: '',
    phone_number: ''
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if(emailExist && name == "email") setEmailExist(false);
    setFormData(previous => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register({ variables: { userInput: formData } });
    }
    catch (e) {
      const error = e as ApolloError;
      if (error.message == 'EMAIL_EXISTS') return setEmailExist(true)
    }
    window.location.href = '/'
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105 duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Registro</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={formData.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700 block mb-2">
                Apellido
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="cedula" className="text-sm font-medium text-gray-700 block mb-2">
              Cédula
            </label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              onChange={handleChange}
              value={formData.cedula}
              placeholder="675-002302-1000P"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="text-sm font-medium text-gray-700 block mb-2">
              Género
            </label>
            <select
              id="gender"
              value={formData.gender}
              name="gender"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">
              Telefono
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              onChange={handleChange}
              value={formData.phone_number}
              placeholder="84371184"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="miemail@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {
              emailExist && (<span className=" text-sm text-red-600">Este email ya existe</span>)
            }
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              value={formData.password}
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            {
              loading ? <Spinner /> :
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-md hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition-all duration-300 hover:scale-105"
                >
                  Registrarse
                </button>
            }
          </div>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <a href="/" className="text-blue-500 hover:text-blue-600 font-semibold">
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}