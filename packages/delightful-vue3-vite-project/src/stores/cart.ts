/*
 * @Description :
 * @Date        : 2023-01-07 17:18:28 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-07 17:19:30 +0800
 * @LastEditors : JackChou
 */
import { defineStore } from 'pinia'
import useCart from '@/components/HookTest/useCart'

export const useCartStore = defineStore('cart', useCart)
