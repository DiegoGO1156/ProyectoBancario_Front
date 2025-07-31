import { apiClient } from "./api"

export const GraphService = {
  async getGraphics(limite = 10, desde = 0) {
    try {
      const response = await apiClient.get('graphic/allGraphics', {
        params: { limite, desde }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching graphics:', error);
      throw error;
    }
  },

  async updateGraphics() {
    try {
      const response = await apiClient.put('/graphic/updateGraphsData');
      return response.data;
    } catch (error) {
      console.error('Error updating graphics:', error);
      throw error;
    }
  }
};