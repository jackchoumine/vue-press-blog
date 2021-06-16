/*
 * @Description:
 * @Hash: 不是路由组件
 * @Date: 2021-06-04 21:49:39 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-04 22:05:16 +0800
 * @LastEditors: JackChou
 */
// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Welcome to Your Vue.js App')
  })
})
