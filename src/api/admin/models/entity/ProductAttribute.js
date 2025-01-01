/**
 * 
 */

import { EntitySchema } from "typeorm"

export const ProductAttribute = new EntitySchema({
  name: "ProductAttribute",
  tableName: "product_attributes",
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: "increment"
    },
    attribute: {
      type: "simple-json"
    },
    productId: {
      type: 'uuid'
    },
    createdAt: {
      type: 'datetime',
      createDate: true
    },
    updatedAt: {
      type: 'datetime',
      updateDate: true
    }
  },
  relations: {
    product: {
      type: "many-to-one",
      target: "Product",
      inverseSide: "attributes",
      joinColumn: {
        name: "product_id"
      }
    }
  }
});