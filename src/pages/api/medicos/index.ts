import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { medicos, firmasCertificadas } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ mensaje: 'Método no permitido' });
    }

    try {
        console.log("Cuerpo recibido:", req.body);
        const {
            codigoMinsa,
            nombre,
            apellido,
            categoria,
            creadoPor,
            creadoEnIp,
        } = req.body;

        if (!codigoMinsa || !nombre || !apellido || !categoria) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        const medicoExistente = await db
            .select()
            .from(medicos)
            .where(eq(medicos.codigo_minsa, codigoMinsa));

        if (medicoExistente.length > 0) {
            return res.status(400).json({ mensaje: 'Este médico ya fue registrado' });
        }

        await db.transaction(async (tx) => {
            // 1. Insertar médico
            const [nuevoMedico] = await tx
                .insert(medicos)
                .values({
                    codigo_minsa: codigoMinsa,
                    nombre,
                    apellido,
                    categoria,
                    creado_el: new Date(),
                    creado_por: creadoPor,
                    creado_en_ip: creadoEnIp,
                    pasivo: false,
                })
                .returning({ id: medicos.id });

            // 2. Generar clave pública y privada
            const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 2048,
                publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
                privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
            });

            // 3. (Opcional) Encriptar clave privada antes de guardarla
            const clavePrivadaEncriptada = Buffer.from(privateKey).toString('base64');

            // 4. Firmar un mensaje base (puede ser el nombre del médico)
            const mensaje = `${nombre} ${apellido}`;
            const sign = crypto.createSign('SHA256');
            sign.update(mensaje);
            sign.end();
            const firmaDigital = sign.sign(privateKey, 'base64');

            // 5. Insertar firma certificada
            await tx.insert(firmasCertificadas).values({
                medico_id: nuevoMedico.id,
                clave_publica: publicKey,
                clave_privada_encriptada: clavePrivadaEncriptada,
                firma_digital: firmaDigital,
                fecha_emision: new Date(),
                creado_el: new Date(),
                creado_por: creadoPor,
                creado_en_ip: creadoEnIp,
                pasivo: false,
            });
        });

        return res.status(200).json({ mensaje: 'Médico y firma guardados correctamente' });

    } catch (error) {
        console.error('Error al guardar médico y firma:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}
