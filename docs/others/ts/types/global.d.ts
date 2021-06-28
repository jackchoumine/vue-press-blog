declare type Nullable<T> = T | null

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type Recordable<T extends any = any> = Record<string, T>

declare type Indexable<T extends any = any> = {
  [key: string]: T
}

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}
