import React, { useState, useCallback } from 'react';
import { uploadImage, sendUserData } from '../services/aws-services';
import { UserData } from '../types';
import { useRecords } from '../hooks/useRecords';
export default function UserForm() {
  const [file, setFile] = useState<File | null>(null);
  const [userData, setUserData] = useState<UserData>({
    nombre: '',
    apellido: '',
    cedula: '',
  })
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refreshRecords } = useRecords();


  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.values(userData).includes('') || !file) {
      setError('Por favor, completa todos los campos y selecciona una imagen')
      return
    }
    setIsLoading(true);
    setError(null);
    try {
    const url = await uploadImage(file);
    await sendUserData({
      TableName: 'DataUsuario',
      Item: {
        ...userData,
      imageUrl: url
      }
    });
    await refreshRecords();
    setUserData({
      nombre: '',
      apellido: '',
      cedula: '',
    })
    setFile(null);
  } catch (err) {
    setError('Ocurrió un error. Por favor, intenta de nuevo.');
  } finally {
    setIsLoading(false);
  }
  }


  return (
    <form className="max-w-5xl mx-auto p-4 mt-5" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        name='nombre'
        defaultValue={userData.nombre}
        onChange={handleChange}
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="text"
        placeholder="Apellido"
        name='apellido'
        defaultValue={userData.apellido}
        onChange={handleChange}
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="text"
        placeholder="Cédula"
        name='cedula'
        defaultValue={userData.cedula}
        onChange={handleChange}
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        accept="image/png, image/jpeg, image/jpg"
      />
      <button
        type='submit'
        className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600 disabled:bg-gray-400"
        disabled={isLoading || !file || Object.values(userData).includes('')}
      >
        {isLoading ? 'Procesando...' : 'Subir imagen y enviar datos'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  )
}
