/**
 * 
 */
import { EntitySchema } from "typeorm"

export const Product = new EntitySchema({
  name: "Product",
  tableName: "products",
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      generated: "uuid"
    },
    name: {
      type: 'varchar',
      unique: true
    },
    description: {
      type: 'varchar',
      nullable: true
    },
    image1: {
      type: 'varchar',
      nullable: true
    },
    image2: {
      type: 'varchar',
      nullable: true
    },
    image3: {
      type: 'varchar',
      nullable: true
    },
    brandId: {
      type: 'int'
    },
    categoryId: {
      type: 'int'
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
    brand: {
      type: "many-to-one",
      target: "Brand",
      inverseSide: "products",
      joinColumn: {
        name: "brand_id"
      }
    },
    category: {
      type: "many-to-one",
      target: "Category",
      inverseSide: "products",
      joinColumn: {
        name: "category_id"
      }
    },
    attributes: {
      type: "one-to-many",
      target: "ProductAttribute",
      inverseSide: "product_id"
    }
  }
});

// export const CategoryEntity = new EntitySchema<Category>({
//     name: "Category",
//     tableName: "categories",
//     columns: {
//       id: {
//         type: Number,
//         primary: true,
//         generated: "increment"
//       },
//       name: {
//         type: String,
//         nullable: false
//       }
//     },
//     relations: {
//       products: {
//         type: "one-to-many",
//         target: "Product",
//         inverseSide: "category"
//       }
//     }
//   })