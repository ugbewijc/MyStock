import { boolean } from 'astro:schema';
import  {EntitySchema} from 'typeorm';

export const Brand = new EntitySchema({
    name: 'Brand',
    tableName: 'brand', // Optional: Specify the table name
    columns: {
      id: {
        primary: true,
        type: 'int',
        generated: true,
      },
      name: {
        type: 'varchar',
        unique: true
      },
      status: {
        type: 'int',
        default: 1
      },
      createdAt: {
        type: 'datetime',
        createDate: true
      },
      updatedAt: {
        type: 'datetime',
        updateDate: true
      },    
    }
  });