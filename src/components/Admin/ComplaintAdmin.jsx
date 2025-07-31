import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, Info, Mail, Shield } from 'lucide-react';

export const ComplaintAdmin = ({ 
  complaint, 
  onApprove, 
  onReject,
  loading 
}) => {
  const [localFeedback, setLocalFeedback] = useState("");
  const [showActions, setShowActions] = useState(false);
  const [actionStatus, setActionStatus] = useState(null);

  const handleAction = async (action) => {
    setActionStatus({ loading: true });
    const response = await (action === 'approve' 
      ? onApprove(complaint._id, localFeedback)
      : onReject(complaint._id, localFeedback));
    
    setActionStatus({
      loading: false,
      success: !response.error,
      message: response.error ? response.e.message : `Denuncia ${action === 'approve' ? 'aprobada' : 'rechazada'} correctamente`
    });

    if (!response.error) {
      setLocalFeedback("");
      setShowActions(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow bg-white"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="text-[#217074]" size={18} />
            <h3 className="font-medium text-lg text-[#217074]">{complaint.type}</h3>
          </div>
          
          <p className="text-gray-600 text-sm">{complaint.description}</p>
          
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1">
              <Info size={12} /> {complaint.anonymous ? "Anónima" : "Identificada"}
            </span>
            {complaint.email && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full flex items-center gap-1">
                <Mail size={12} /> {complaint.email}
              </span>
            )}
            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
              {complaint.address}
            </span>
          </div>
        </div>
        
        <button 
          onClick={() => setShowActions(!showActions)}
          className="text-sm text-[#217074] hover:underline"
        >
          {showActions ? "Ocultar" : "Acciones"}
        </button>
      </div>

      {actionStatus && (
        <div className={`mt-3 p-2 rounded text-sm ${
          actionStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {actionStatus.message}
        </div>
      )}

      {showActions && (
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comentarios (opcional)
            </label>
            <textarea
              value={localFeedback}
              onChange={(e) => setLocalFeedback(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#217074] focus:border-[#217074] text-sm"
              placeholder="Feedback para el usuario..."
              rows={2}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleAction('approve')}
              disabled={loading || actionStatus?.loading}
              className="flex-1 flex items-center justify-center gap-2 bg-[#8B9D77] hover:bg-[#7a8d66] text-white
                py-2 rounded-md transition-colors disabled:opacity-50 text-sm"
            >
              <CheckCircle2 size={16} />
              Aprobar
            </button>

            <button
              onClick={() => handleAction('reject')}
              disabled={loading || actionStatus?.loading}
              className="flex-1 flex items-center justify-center gap-2 bg-[#d35d6e] hover:bg-[#c04d5e] text-white
                py-2 rounded-md transition-colors disabled:opacity-50 text-sm"
            >
              <XCircle size={16} />
              Rechazar
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};