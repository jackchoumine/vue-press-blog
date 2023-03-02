/*
 * @Description :
 * @Date        : 2021-10-29 22:54:00 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-29 23:19:33 +0800
 * @LastEditors : JackChou
 */
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import { post, get, remove, patch, controller } from '../decorators'

@controller('/reviews')
class ReviewController {
  @post()
  async createReview(req: Request, res: Response) {
    const { productId, ...review } = req.body
    console.log(review, productId)
    const result = await prisma.review.create({
      data: {
        ...review,
        product: {
          connect: {
            id: productId,
          },
        },
      },
    })
    res.json({ success: true, data: result })
  }

  @get('/:id?')
  async getReviews(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    console.log('id')
    console.log(id)
    if (id) {
      try {
        //@ts-ignore
        const review = await prisma.review.findOne({
          where: {
            id: id,
          },
        })
        console.log(review)
        res.json(review)
      } catch (error) {
        //  @ts-ignore
        console.log(error.message)
        res.json({ error })
      }
    } else {
      const reviews = await prisma.review.findMany()
      res.json(reviews)
    }
  }

  @remove('/:id')
  async deleteReview(req: Request, res: Response) {
    const result = await prisma.review.delete({
      where: {
        id: req.params.id,
      },
    })
    console.log(result)
    res.json({})
  }

  @patch('/:id')
  async updateReview(req: Request, res: Response) {
    const { body } = req
    const { id } = req.params
    const result = await prisma.review.update({
      where: {
        id,
      },
      data: body,
    })
    res.json({ success: true, data: result })
  }
}

export default ReviewController
