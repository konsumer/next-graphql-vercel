/* global jest beforeAll afterEach afterAll it expect */

import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql } from 'msw'
import { setupServer } from 'msw/node'

import MockRouter from './MockRouter'
import users from './users.json'
import PageIndex from '../pages/index'

// mock graphql for all tests in this file
const handlers = []

handlers.push(graphql.query('GET_USERS', (req, res, ctx) => {
  return res(
    ctx.data({
      getUsers: users
    })
  )
}))

const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('shows getUsers', async () => {
  render(<PageIndex />)
  expect(await screen.findByText(users[0].login)).toBeVisible()
})

it('allows user to click on a user-item, and go to user-page', async () => {
  const push = jest.fn().mockResolvedValue(true)

  render(
    <MockRouter push={push}>
      <PageIndex />
    </MockRouter>
  )

  // click the link, and check that it called push() correctly
  userEvent.click(await screen.findByText(users[0].login))
  expect(push.mock.calls.length).toBe(1)
  expect(push.mock.calls[0][0]).toBe(`/user/${users[0].login}`)
})
