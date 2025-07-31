import { useState } from "react"
import { getComplaints as fetchComplaints } from "../../services/api"

export const useGetComplaintsAuthorites = () => {
  const [complaints, setComplaints] = useState(null)

  const getComplaints = async () => {
    const response = await fetchComplaints()
    
    const data = response.data.complaints

    setComplaints(data)

    return data
  }

  return {
    complaints,
    getComplaints
  }
}
