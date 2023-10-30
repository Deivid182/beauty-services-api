import { z } from 'zod'

export const serviceSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string'
    }),
    price: z.number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number'
    })
  })
})

export const updateSchema = z.object({
  body: z.object({
    name: z.string(),
    price: z.number()
  })
})

export type ServiceType = z.infer<typeof serviceSchema>['body']
export type UpdateServiceType = z.infer<typeof updateSchema>['body']