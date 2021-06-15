// Integration test for Index page

/* global jest beforeAll afterEach afterAll it expect */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
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

it('shows user-list', async () => {
  render(<PageIndex />)
  expect(await screen.findByText(users[0].login)).toBeVisible()
})

it('allows user to click on a user-item, and go to user-page', async () => {
  // mock push, so we can check link called with correct path
  const push = jest.fn().mockResolvedValue(true)

  render(
    <MockRouter push={push}>
      <PageIndex />
    </MockRouter>
  )

  // click the link, and check that it called push() correctly
  fireEvent.click(await screen.findByText(users[0].login))
  expect(push).toHaveBeenCalledTimes(1)
  // similar to toHaveBeenCalledWith(), but I don't care about other params
  expect(push.mock.calls[0][0]).toBe(`/user/${users[0].login}`)
})
