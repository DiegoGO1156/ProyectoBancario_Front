// components/EditProfile.jsx
import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../services";
import { useUpdateUser } from "../../shared/hooks"; // Importa el hook

export const UpdateProfile = () => {
    const [form, setForm] = useState({
        Name: "",
        Username: "",
        Email: "",
        Address: "",
        Phone: "",
        CompanyName: "",
        Income: ""
      });
    
      const { updateUser, loading, error, success } = useUpdateUser();
    
      useEffect(() => {
        const fetchProfile = async () => {
          const profile = await getUserProfile();
          if (!profile?.error) {
            setForm({
              Name: profile.Name || "",
              Username: profile.Username || "",
              Email: profile.Email || "",
              Address: profile.Address || "",
              Phone: profile.Phone || "",
              CompanyName: profile.CompanyName || "",
              Income: profile.Income || ""
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
        await updateUser(form);
      };
    
      return (
        <div>
          <h2>Editar Perfil</h2>
    
          {loading && <p>Guardando cambios...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>Perfil actualizado con éxito</p>}
    
          <form onSubmit={handleSubmit}>
            {Object.keys(form).map((field) => (
              <div key={field}>
                <label>{field}:</label>
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <button type="submit" disabled={loading}>Guardar cambios</button>
          </form>
        </div>
      );
    };

export default UpdateProfile;
