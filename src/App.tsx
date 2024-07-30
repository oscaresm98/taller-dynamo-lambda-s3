import UserForm from "./components/UserForm"
import UserRecordsTable from "./components/UserRecordsTable"
import { RecordsProvider } from "./context/RecordContext"


function App() {
  

  return (
    <RecordsProvider>
      <h1 className="text-5xl text-blue-500 font-bold text-center">Registro de Usuarios</h1>
      <UserForm />
      <UserRecordsTable />
    </RecordsProvider>
  )
}

export default App
