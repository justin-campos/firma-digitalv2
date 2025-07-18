import { pgTable, serial, text, boolean, timestamp, integer, varchar } from 'drizzle-orm/pg-core';

export const configuracion_bucket = pgTable('configuracion_bucket', {
    id: serial('id').primaryKey(),
    nombre: text('nombre').notNull(),
    url_base: text('url_base').notNull(),
    pasivo: boolean('pasivo').notNull().default(false),
    creado_el: timestamp('creado_el').notNull(),
    modificado_el: timestamp('modificado_el'),
    creado_por: integer('creado_por').notNull(),
    modificado_por: integer('modificado_por'),
    creado_en_ip: varchar('creado_en_ip', { length: 20 }).notNull(),
    modificado_en_ip: varchar('modificado_en_ip', { length: 20 }),
});
