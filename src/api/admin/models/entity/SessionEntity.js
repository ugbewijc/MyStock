// import { v4 as uuidv4 } from 'uuid'
import { EntitySchema } from 'typeorm';

export const Session = new EntitySchema({
  name: 'Session',
  tableName: 'session', // Optional: Specify the table name
  columns: {
// export const Session = {
//   name: 'Session',
//   columns: {
    id: {
      primary: true,
      type: 'varchar',
      generated: 'uuid',
      // default: () => uuidv4()
    },
    user: {
      type: 'varchar',
      unique: true,
    //   nullable: false
    },
    // data: {
    //   type: 'simple-json',
    //   nullable: true
    // },
    createdAt: {
      type: 'datetime',
      createDate: true
    },
    expiresAt: {
      type: 'datetime',
    //   nullable: true
    }
  },
  indices: [
    {
      name: 'IDX_SESSION_USER',
      columns: ['user']
    }
  ]
});