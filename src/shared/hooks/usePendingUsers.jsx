import { useState, useEffect } from 'react';
import { listUsersPending, activeUser} from '../../services/api'; // Adjust the import path as necessary

export const usePendingUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await listUsersPending();
      if (response.error) {
        throw new Error(response.message);
      }
      setUsers(response.users || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching pending users:", err);
    } finally {
      setLoading(false);
    }
  };

  const activateUserAccount = async (userId) => {
    setLoading(true);
    try {
      const response = await activeUser(userId);
      if (response.error) {
        throw new Error(response.message);
      }
      
      // Actualiza el estado local eliminando el usuario activado
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      
      return { success: true, user: response.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const refresh = () => {
    fetchPendingUsers();
  };

  return {
    users,
    loading,
    error,
    refresh: fetchPendingUsers,
    activateUser: activateUserAccount
  };
};