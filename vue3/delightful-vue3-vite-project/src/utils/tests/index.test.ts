import { expect, test } from 'vitest'

import { add } from '../index'

test('加法2', () => {
  expect(add(1, 1)).toEqual(2)
})
