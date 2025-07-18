import { useEffect, useState } from 'react';
import { obtenerConfiguracionBucket } from '@/utils/api/configuracion-bucket';

interface ConfiguracionBucket {
    id: number;
    nombre: string;
    urlBase: string;
    pasivo: boolean;
    creadoEl: string;
    modificadoEl: string | null;
    creadoPor: number;
    modificadoPor: number | null;
    creadoEnIp: string;
    modificadoEnIp: string | null;
}

export default function PruebaConfiguracionPage() {
    const [data, setData] = useState<ConfiguracionBucket[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        obtenerConfiguracionBucket()
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Error al cargar los datos');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Configuración Bucket - Datos</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
