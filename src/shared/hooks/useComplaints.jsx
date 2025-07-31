import { useState, useEffect } from 'react';
import { getComplaints, approveComplaint, rejectComplaint  } from '../../services/apiAdmin';


export const useComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState("");

  const fetchComplaints = async () => {
    setLoading(true);
    const response = await getComplaints();
    
    if (response.error) {
      setError(response.e);
      setComplaints([]);
    } else {
      // Filtramos solo las denuncias pendientes
      const pendingComplaints = response.data?.complaints?.filter(
        c => c.statusComplaint === "Pending"
      ) || [];
      setComplaints(pendingComplaints);
      setError(null);
    }
    setLoading(false);
  };

  const handleApprove = async (id) => {
    const response = await approveComplaint(id, feedback);
    if (!response.error) {
      await fetchComplaints();
    }
    return response;
  };

  const handleReject = async (id) => {
    const response = await rejectComplaint(id, feedback);
    if (!response.error) {
      await fetchComplaints();
    }
    return response;
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return {
    complaints,
    loading,
    error,
    feedback,
    setFeedback,
    handleApprove,
    handleReject,
    refresh: fetchComplaints
  };
};