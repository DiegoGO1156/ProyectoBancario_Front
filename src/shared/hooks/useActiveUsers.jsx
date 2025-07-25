import { useState, useEffect } from 'react';
import { listUsersActive, editUserBalance, editUserStatus } from '../../services/api';

export const useActiveUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const fetchActiveUsers = async () => {
    setLoading(true);
    try {
      const response = await listUsersActive();
      if (response.error) throw new Error(response.message);
      setUsers(response.users || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching active users:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserIncome = async (userId, newIncome) => {
    try {
      const response = await editUserBalance(userId, { income: newIncome });
      if (response.error) throw new Error(response.message);
      
      // Actualización optimista
      setUsers(prevUsers => prevUsers.map(user => 
        user._id === userId ? { ...user, income: newIncome } : user
      ));
      
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

   const changeUserStatus = async (userId) => {
    try {
      setLoading(true);
      const response = await editUserStatus(userId);
      if (response.error) throw new Error(response.message);
      
      // Actualización optimista
      setUsers(prevUsers => prevUsers.map(user => 
        user._id === userId ? { 
          ...user, 
          statusAccount: 'Pending',
          verification: false 
        } : user
      ));
      
      return { success: true, message: response.msg };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchActiveUsers();
  }, [refreshFlag]);

  const refresh = () => setRefreshFlag(prev => !prev);

  return { users, loading, error, refresh, updateUserIncome, changeUserStatus };
};