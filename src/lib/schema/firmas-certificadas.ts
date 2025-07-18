import { pgTable, serial, integer, text, timestamp, boolean, varchar } from 'drizzle-orm/pg-core';
import { medicos } from './medicos';

export const firmasCertificadas = pgTable('firmas_certificadas', {
    id: serial('id').primaryKey(),
    medico_id: integer('medico_id').references(() => medicos.id).notNull(),
    clave_publica: text('clave_publica').notNull(),
    clave_privada_encriptada: text('clave_privada_encriptada'),
    fecha_emision: timestamp('fecha_emision').notNull(),
    firma_digital: text('firma_digital'),
    pasivo: boolean('pasivo').notNull().default(false),
    creado_el: timestamp('creado_el').notNull(),
    modificado_el: timestamp('modificado_el'),
    creado_por: integer('creado_por').notNull(),
    modificado_por: integer('modificado_por'),
    creado_en_ip: varchar('creado_en_ip', { length: 20 }).notNull(),
    modificado_en_ip: varchar('modificado_en_ip', { length: 20 }),
});
