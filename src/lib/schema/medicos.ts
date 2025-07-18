import { pgTable, serial, text, boolean, timestamp, integer, varchar } from 'drizzle-orm/pg-core';

export const medicos = pgTable('medicos', {
    id: serial('id').primaryKey(),
    codigo_minsa: text('codigo_minsa').notNull().unique(),
    nombre: text('nombre').notNull(),
    apellido: text('apellido').notNull(),
    categoria: text('categoria').notNull(),
    pasivo: boolean('pasivo').notNull().default(false),
    creado_el: timestamp('creado_el').notNull(),
    modificado_el: timestamp('modificado_el'),
    creado_por: integer('creado_por').notNull(),
    modificado_por: integer('modificado_por'),
    creado_en_ip: varchar('creado_en_ip', { length: 20 }).notNull(),
    modificado_en_ip: varchar('modificado_en_ip', { length: 20 }),
});

