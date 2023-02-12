import type { InjectionKey } from 'vue'

export type User = { id: number; name: string }
export const USER_KEY: InjectionKey<User> = Symbol('User')
export const CART_KEY = Symbol('Cart')
