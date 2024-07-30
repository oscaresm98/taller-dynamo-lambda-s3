import { useEffect } from 'react';
import { useRecords } from '../hooks/useRecords';



const UserRecordsTable = () => {
  const { records, isLoadingRecords, errorRecords, refreshRecords } = useRecords();

  useEffect(() => {
    refreshRecords();
  }, [refreshRecords]);

  if (isLoadingRecords) return <p>Cargando registros...</p>;
  if (errorRecords) return <p className="text-red-500">{errorRecords}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 mt-8">
      <h2 className="text-xl font-bold mb-4">Registros de Usuarios</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Apellido</th>
            <th className="py-2 px-4 border-b">Cédula</th>
            <th className="py-2 px-4 border-b">Imagen</th>
          </tr>
        </thead>
        <tbody>
          {records?.map((record, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="py-2 px-4 border-b">{record.nombre}</td>
              <td className="py-2 px-4 border-b">{record.apellido}</td>
              <td className="py-2 px-4 border-b">{record.cedula}</td>
              <td className="py-2 px-4 border-b">
                <img src={record.imageUrl} alt="User" className="w-16 h-16 object-cover" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRecordsTable;