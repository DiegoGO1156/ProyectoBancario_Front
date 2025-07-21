import React, { useState, useEffect } from 'react';
import { updateUser } from '../../services';
import { SidebarAdmin } from '../Navbar/SidebarAdmin';
import  Footer  from "../Homepage/Footer";

export const UpdateProfile = ({ userData }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    address: '',
    phone: '',
    companyName: '',
    income: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        username: userData.username || '',
        email: userData.email || '',
        address: userData.address || '',
        phone: userData.phone || '',
        companyName: userData.companyName || '',
        income: userData.income || ''
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateUser(formData);

    if (result.error) {
      setMessage(result.message);
    } else {
      setMessage("Perfil actualizado correctamente");
    }
  };

  return (
    <div className='flex h-screen'>
      <SidebarAdmin />
      <div className=" bg-blue-50 w-full min-h-screen">
        <div className="">
          <div className="">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-6 flex flex flex-col items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                  Editar Perfil
            </h2>
              {message && <p>{message}</p>}
              <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
              <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className='block text-sm font-medium text-blue-700 mb-1'>Nombre:</label>
                        <input name="name" value={formData.name} onChange={handleChange} 
                          className='bg-blue-50 rounded-lg p-3 text-blue-900'/>
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-blue-700 mb-1'>Username:</label>
                        <input name="username" value={formData.username} onChange={handleChange} 
                          className='bg-blue-50 rounded-lg p-3 text-blue-900'/>
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-blue-700 mb-1'>Email:</label>
                        <input name="email" value={formData.email} onChange={handleChange} 
                          className='bg-blue-50 rounded-lg p-3 text-blue-900'/>
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-blue-700 mb-1'>Dirección:</label>
                        <input name="address" value={formData.address} onChange={handleChange}
                        className='bg-blue-50 rounded-lg p-3 text-blue-900' />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-blue-700 mb-1'>Teléfono:</label>
                        <input name="phone" value={formData.phone} onChange={handleChange} 
                          className='bg-blue-50 rounded-lg p-3 text-blue-900'/>
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-blue-700 mb-1'>companyName:</label>
                        <input name="companyName" value={formData.companyName} onChange={handleChange} 
                          className='bg-blue-50 rounded-lg p-3 text-blue-900'/>
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-blue-700 mb-1'>income:</label>
                        <input name="income" value={formData.income} onChange={handleChange} 
                          className='bg-blue-50 rounded-lg p-3 text-blue-900'/>
                      </div>
                    </div>
                <button type="submit" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded">Guardar Cambios</button>
              </form>
        </div>
              <div className="mt-30">
                <Footer />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
