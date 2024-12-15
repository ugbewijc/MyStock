import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

 export const server = {
  // action declarations
  getGreeting: defineAction({
    input: z.object({
      name: z.string(),
    }),
    handler: async (input) => {
      return `Hello, ${input.name}!`
    }
  })
}
// export const server = {
//     getProduct: defineAction({
//         // input: z.object({}),
//         handler: async (_input, context) => {
//             console.log('Product');
//             return { data: 'Product' };
            
//         }
//     }),
//     login: defineAction({
//         accept: 'form',
//         input: z.object({
//             username: z.string().email().min(1),
//             password: z.string().min(1)
//         }),
//         handler: async (input) => {
//             const {username} = input;
//             return {data: username};
//         }
//      })
// }