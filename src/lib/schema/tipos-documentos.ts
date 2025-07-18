import { pgTable, serial, text, integer, boolean, timestamp, varchar } from 'drizzle-orm/pg-core';
import { configuracion_bucket } from '@/lib/schema';

export const tiposDocumentos = pgTable('tipos_documentos', {
    id: serial('id').primaryKey(),
    nombre: text('nombre').notNull(),
    descripcion: text('descripcion'),
    bucket_id: integer('bucket_id').references(() => configuracion_bucket.id).notNull(),
    pasivo: boolean('pasivo').notNull().default(false),
    creado_el: timestamp('creado_el').notNull(),
    modificado_el: timestamp('modificado_el'),
    creado_por: integer('creado_por').notNull(),
    modificado_por: integer('modificado_por'),
    creado_en_ip: varchar('creado_en_ip', { length: 20 }).notNull(),
    modificado_en_ip: varchar('modificado_en_ip', { length: 20 }),
});
