import { useState, useEffect } from 'react';
import { listUsersPending, activeUser, deleteRegisterUser } from '../../services/api';

export const usePendingUsers = () => {
  const [state, setState] = useState({
    users: [],
    loading: true,
    error: null,
    refreshCount: 0
  });

  const fetchPendingUsers = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await listUsersPending();
      
      if (response.error) throw new Error(response.message);
      
      setState(prev => ({ 
        ...prev, 
        users: response.users || [], 
        loading: false 
      }));
    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        error: err.message, 
        loading: false 
      }));
      console.error("Error fetching users:", err);
    }
  };

  const executeUserAction = async (action, userId) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await action(userId);
      
      if (response.error) throw new Error(response.message);
      
      // Actualización optimista + recarga
      setState(prev => ({
        ...prev,
        users: prev.users.filter(u => u._id !== userId),
        refreshCount: prev.refreshCount + 1
      }));
      
      return { success: true };
    } catch (err) {
      setState(prev => ({ ...prev, error: err.message }));
      return { success: false, error: err.message };
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, [state.refreshCount]);

  return {
    users: state.users,
    loading: state.loading,
    error: state.error,
    activateUser: (userId) => executeUserAction(activeUser, userId),
    deleteUser: (userId) => executeUserAction(deleteRegisterUser, userId),
    refresh: () => setState(prev => ({ ...prev, refreshCount: prev.refreshCount + 1 }))
  };
};