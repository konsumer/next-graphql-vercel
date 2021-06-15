// Integration test for User page

/* global beforeAll afterEach afterAll it expect */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { graphql } from 'msw'
import { setupServer } from 'msw/node'

import MockRouter from './MockRouter'
import users from './users.json'
import PageUser from '../pages/user/[userId]'

// mock graphql for all tests in this file
const handlers = []

handlers.push(graphql.query('GET_USER', (req, res, ctx) => {
  return res(
    ctx.data({
      getUser: users.find(row => row.login.toLowerCase() === req.variables?.userId.toLowerCase())
    })
  )
}))

const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('shows a user', async () => {
  render(
    <MockRouter query={{ userId: users[0].login }}>
      <PageUser />
    </MockRouter>
  )
  expect(await screen.findByText(users[0].id)).toBeVisible()
  expect(await screen.findByText(users[0].login)).toBeVisible()
})
