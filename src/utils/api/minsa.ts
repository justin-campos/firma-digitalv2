export interface MinsaResponse {
    cedula: string;
    primerNombre: string;
    segundoNombre?: string;
    primerApellido: string;
    segundoApellido?: string;
    fechaNacimiento?: number;
    sexo?: string;
    activo: boolean;
    direccion?: string;
    municipio?: string;
    departamento?: string;
    domicilio?: string;
    titulos?: Array<{
        descripcion: string;
        fechaInscripcion: number;
        fechaOtorga: number;
        universidad: {
            descripcion: string;
            pais: string;
        }
    }>;
}

export async function obtenerMedicoPorCodigoMinsa(codigo: string): Promise<MinsaResponse | null> {
    try {
        const apiBase = process.env.NEXT_PUBLIC_MINSA_API_BASE;
        const url = `${apiBase}/${codigo}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.error) {
            return null;
        }

        return data;
    } catch (error) {
        console.warn("⚠️ Error CORS o red. Usando JSON quemado para pruebas.");

        if (codigo === "72725") {
            return {
                cedula: "0011710910038R",
                primerNombre: "CARMEN",
                segundoNombre: "VIRGINIA",
                primerApellido: "HERNANDEZ",
                segundoApellido: "CENTENO",
                fechaNacimiento: 687679200000,
                sexo: "F",
                activo: true,
                direccion: "RESD. EL DORADO FARMACIA SALAZAR 2 1/2C. E CA. N° 446",
                municipio: "MANAGUA",
                departamento: "MANAGUA",
                domicilio: "RESD. EL DORADO FARMACIA SALAZAR 2 1/2C. E CA. N° 446",
                titulos: [
                    {
                        descripcion: "DOCTORA EN MEDICINA",
                        fechaInscripcion: 1589436000000,
                        fechaOtorga: 1508306400000,
                        universidad: {
                            descripcion: "ESCUELA LATINOAMERICANA DE MEDICINA LA HABANA CUBA",
                            pais: "CUBA"
                        }
                    }
                ]
            };
        }
        return null;
    }
}

