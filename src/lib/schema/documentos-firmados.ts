import { pgTable, serial, integer, text, timestamp, boolean, varchar } from 'drizzle-orm/pg-core';
import { firmasCertificadas } from './firmas-certificadas';
import { tiposDocumentos } from './tipos-documentos';

export const documentosFirmados = pgTable('documentos_firmados', {
    id: serial('id').primaryKey(),
    firma_id: integer('firma_id').references(() => firmasCertificadas.id).notNull(),
    tipo_documento_id: integer('tipo_documento_id').references(() => tiposDocumentos.id).notNull(),
    fecha_firma: timestamp('fecha_firma').notNull(),
    url_bucket: text('url_bucket').notNull(),
    pasivo: boolean('pasivo').notNull().default(false),
    creado_el: timestamp('creado_el').notNull(),
    modificado_el: timestamp('modificado_el'),
    creado_por: integer('creado_por').notNull(),
    modificado_por: integer('modificado_por'),
    creado_en_ip: varchar('creado_en_ip', { length: 20 }).notNull(),
    modificado_en_ip: varchar('modificado_en_ip', { length: 20 }),
});
