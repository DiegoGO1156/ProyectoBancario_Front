import { useState, useEffect } from 'react';
import { listUsersPending, activeUser, deleteRegisterUser } from '../../services/api';

export const usePendingUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const fetchPendingUsers = async () => {
    setLoading(true);
    try {
      const response = await listUsersPending();
      if (response.error) throw new Error(response.message);
      
      setUsers(response.users || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const activateUser = async (userId) => {
    try {
      setLoading(true);
      const response = await activeUser(userId);
      if (response.error) throw new Error(response.message);
      
      // Actualización optimista + recarga completa
      setUsers(prev => prev.filter(u => u._id !== userId));
      setRefreshFlag(prev => !prev); // Dispara nueva carga
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      setLoading(true);
      const response = await deleteRegisterUser(userId);
      if (response.error) throw new Error(response.message);
      
      // Actualización optimista + recarga completa
      setUsers(prev => prev.filter(u => u._id !== userId));
      setRefreshFlag(prev => !prev);
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchPendingUsers();
  }, [refreshFlag]);

  return { users, loading, error, activateUser, deleteUser };
};