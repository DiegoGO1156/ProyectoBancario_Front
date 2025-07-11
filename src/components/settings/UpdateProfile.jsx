import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../services";
import { useUpdateUser } from "../../shared/hooks";

export const UpdateProfile = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        address: "",
        phone: "",
        companyName: "",
        income: ""
      });

    const fieldLabels = {
      name: "Nombre",
      username: "Usuario",
      email: "Correo",
      address: "Dirección",
      phone: "Teléfono",
      companyName: "Empresa",
      income: "Ingresos"
    };
    
      const { updateUser, loading, error, success } = useUpdateUser();
      const [localError, setLocalError] = useState("");
    
      useEffect(() => {
        const fetchProfile = async () => {
          const profile = await getUserProfile();
          if (!profile?.error) {
            setForm({
              name: profile.name || "",
              username: profile.username || "",
              email: profile.email || "",
              address: profile.address || "",
              phone: profile.phone || "",
              companyName: profile.companyName || "",
              income: profile.income || ""
            });
          }
        };
        fetchProfile();
      }, []);
    
      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email) {
          setLocalError("Nombre y correo electrónico son obligatorios.");
          return;
        }

        setLocalError(""); 
        await updateUser(form);
      };
    
      return (
        <div>
          <h2>Editar Perfil</h2>
    
    
          <form onSubmit={handleSubmit}>
            {loading && <p>Guardando cambios...</p>}
            {localError && <p style={{ color: "red" }}>{localError}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>Perfil actualizado con éxito</p>}

            {Object.keys(form).map((field) => (
              <div key={field}>
                <label>{fieldLabels[field] || field}:</label>
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            ))}
            <button type="submit" disabled={loading}>Guardar cambios</button>
          </form>
        </div>
      );
    };

export default UpdateProfile;
