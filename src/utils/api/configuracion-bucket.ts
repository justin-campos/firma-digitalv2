import axiosInstance from '../axios';

export const obtenerConfiguracionBucket = () => {
    return axiosInstance.get('/api/configuracion_bucket');
};

export const crearConfiguracionBucket = (data: any) => {
    return axiosInstance.post('/api/configuracion_bucket', data);
};

export const actualizarConfiguracionBucket = (id: string, data: any) => {
    return axiosInstance.put(`/api/configuracion_bucket/${id}`, data);
};

export const eliminarConfiguracionBucket = (id: string) => {
    return axiosInstance.delete(`/api/configuracion_bucket/${id}`);
};
