import { ComplaintAdmin } from '../components/Admin/ComplaintAdmin';
import { useComplaints } from '../shared/hooks/useComplaints';
import { Shield, RefreshCw, AlertCircle } from 'lucide-react';

export const AdminComplaintsPage = () => {
  const {
    complaints,
    loading,
    error,
    feedback,
    setFeedback,
    handleApprove,
    handleReject,
    refresh
  } = useComplaints();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Shield className="text-[#217074]" size={28} />
          <h1 className="text-2xl font-bold text-[#217074]">Administrar Denuncias</h1>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="flex items-center gap-2 bg-[#217074] hover:bg-[#1a5c5c] text-white px-4 py-2 rounded-md text-sm"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Actualizar
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 flex items-center gap-2">
          <AlertCircle size={18} />
          <p>{error.message || "Error al cargar denuncias"}</p>
        </div>
      )}

      <div className="space-y-4">
        {loading && complaints.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#217074]"></div>
          </div>
        ) : complaints.length === 0 ? (
          <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
            No hay denuncias pendientes por revisar
          </div>
        ) : (
          complaints.map(complaint => (
            <ComplaintAdmin
              key={complaint._id}
              complaint={complaint}
              onApprove={handleApprove}
              onReject={handleReject}
              loading={loading}
            />
          ))
        )}
      </div>
    </div>
  );
};