import { useEffect, useState } from 'react'
import { getUserProfile } from '../../services/api'

export const Profile = () => {
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargarDatos = async () => {
      const resultado = await getUserProfile()

      if (resultado?.error) {
        setError(resultado.message)
      } else {
        setUsuario(resultado)
      }
      setLoading(false)
    }

    cargarDatos()
  }, [])

  if (loading) return <p>Cargando datos del usuario...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>Perfil de {usuario.name}</h2>
      <p>Email: {usuario.email}</p>
      <p>Estado de cuenta: {usuario.statusAccount}</p>
      <PasswordSettings/>
    </div>
    
  )
}

export default PerfilUsuario
