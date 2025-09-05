import { api } from './Client';

export const login = (username, password) =>
  api.post('/users/login', { username, password });

export const getProductByName = async (productName) => {
  try {
    if (!productName || !productName.trim()) {
      throw new Error('Product name is required');
    }
    
    const response = await api.post('/users/get-product-byname', { 
      product: productName.trim() 
    });
    
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('API Error in getProductByName:', error);
    throw error;
  }
};
export const getPriceByProductCode = async (productCode) => {
  if (!productCode?.trim()) return { priceData: [], warehouseData: [] };

  try {
    const response = await api.get(`/users/price-check/${productCode}`);
    return {
      priceData: response.data.dataPrice || [],
      warehouseData: response.data.dataWarehouse || [],
    };
  } catch (error) {
    console.error('API Error in getPriceByProductCode:', error);
    throw error;
  }
};

