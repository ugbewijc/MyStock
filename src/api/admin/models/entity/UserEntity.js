/**
 * 
 */

import { EntitySchema } from 'typeorm';

export const User = new EntitySchema({
  name: 'User',
  tableName: 'users', // Optional: Specify the table name
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    username: {
      type: 'varchar',
      unique: true
    },
    password: {
      type: 'varchar',
    },
  },
});
