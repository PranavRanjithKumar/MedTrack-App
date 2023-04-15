import axiosClient from './axiosClient';

export const getAssetDetails = async ({ orgId, assetId }) => {
  try {
    const response = await axiosClient.get(
      `/organizations/${orgId}/assets/${assetId}`
    );
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const getOutSourcedAssets = async (id) => {
  try {
    const response = await axiosClient.get(
      `/organizations/${id}/assets/out-sourced`
    );
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const getInHouseAssets = async (id) => {
  try {
    const response = await axiosClient.get(
      `/organizations/${id}/assets/in-house`
    );
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const getInHouseAssetsForCatalogueId = async (id, catalogueId) => {
  try {
    const response = await axiosClient.get(
      `/organizations/${id}/assets/in-house?catalogueId=${catalogueId}`
    );
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const storeSupplierAsset = async ({
  id,
  code,
  manufacturingDate,
  expiryDate,
  latitude,
  longitude,
  quantity,
}) => {
  try {
    const response = await axiosClient.post(
      `/organizations/${id}/assets/`,
      JSON.stringify({
        code,
        manufacturingDate,
        expiryDate,
        latitude,
        longitude,
        quantity,
      })
    );
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const storeManufcturerAsset = async ({
  id,
  code,
  manufacturingDate,
  expiryDate,
  latitude,
  longitude,
  quantity,
  constitution,
}) => {
  try {
    const response = await axiosClient.post(
      `/organizations/${id}/assets/`,
      JSON.stringify({
        code,
        manufacturingDate,
        expiryDate,
        latitude,
        longitude,
        quantity,
        constitution,
      })
    );
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

// export const fetchAssetDetails

export const fetchAssetProvenance = async ({ orgId, assetId }) => {
  try {
    const response = await axiosClient.post(
      `/organizations/${orgId}/assets/provenance`,
      JSON.stringify({ id: assetId })
    );
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};
