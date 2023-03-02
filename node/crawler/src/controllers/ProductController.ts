/*
 * @Description :
 * @Date        : 2021-10-29 21:08:03 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-29 23:32:48 +0800
 * @LastEditors : JackChou
 */
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import { post, get, remove, patch, controller } from '../decorators'

@controller('/products')
class ProductController {
  @post()
  async createProduct(req: Request, res: Response) {
    const { body } = req
    const product = await prisma.product.create({
      data: body,
    })
    res.json(product)
  }

  @get('/:id?')
  async getProducts(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    console.log('id')
    console.log(id)
    if (id) {
      try {
        //@ts-ignore
        const product = await prisma.product.findOne({
          where: {
            id: id,
          },
        })
        console.log(product)
        res.json(product)
      } catch (error) {
        //  @ts-ignore
        console.log(error.message)
        res.json({ error })
      }
    } else {
      const products = await prisma.product.findMany({
        // select: {
        //   name: true,
        // include: {
        // reviews: true,// 包含reviews
        // reviews: {
        //   select: {
        //     content: true,
        //     rate: true,
        //   },
        // },
        // },
        // where: {
        // }
        // reviews: true,
        // name: { equals: 'Shoe' },
        // name: { contains: 'mac' },
        // price: {
        //   gt: 100,
        //   lt: 1400,
        // },
        // },
      })
      res.json(products)
    }
  }

  @remove('/:id')
  async deleteProduct(req: Request, res: Response) {
    const result = await prisma.product.delete({
      where: {
        id: req.params.id,
      },
    })
    console.log(result)
    res.json({})
  }

  @patch('/:id')
  async updateProduct(req: Request, res: Response) {
    const { body } = req
    const { id } = req.params
    const result = await prisma.product.update({
      where: {
        id,
      },
      data: body,
    })
    res.json({ success: true, data: result })
  }
}

export default ProductController
