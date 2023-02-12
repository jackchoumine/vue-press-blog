/*
 * @Description :
 * @Date        : 2023-01-07 17:57:46 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-07 18:31:31 +0800
 * @LastEditors : JackChou
 */
import { defineStore } from 'pinia'
import { useForm } from 'vee-validate'
import * as Yup from 'yup'

// https://logaretm.com/blog/build-pinia-stores-from-composition-api#pinia--veevalidate

const schema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
})

export const useSignupStore = defineStore('signup', () => {
  const { errors, useFieldModel, handleSubmit } = useForm({
    validationSchema: schema,
  })

  const [name, email, password] = useFieldModel(['name', 'email', 'password'])

  const signup = handleSubmit(values => {
    console.log('values')
    console.log(values)
    // send values to API
    console.log('Submit', JSON.stringify(values, null, 2))
  })

  return {
    errors,
    name,
    email,
    password,
    signup,
  }
})
