import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, test, beforeAll, afterEach, afterAll } from "vitest";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Home from "../pages/index";

// Good starting point: https://testing-library.com/docs/react-testing-library/example-intro

// TODO setup your mock api here
export const handler = [
    rest.get("/api/getTodos", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([{"id":1, "title": "preloded todo"}]))
    }),
    rest.post("/api/addTodos", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([{"id":2, "title": "second todo"}]))
    }),
    rest.delete('/api/removeTodo', (req, res, ctx) => {
        return res(ctx.status(200))
      }),
    
   
]

export const server = setupServer(...handler)
  
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
  
describe("Home", () => {
   // TODO Add your react-testing-library tests here
   /* Mock the api using [Mock Service Worker (MSW)](https://github.com/mswjs/msw)
    - Write a test that asserts that loading is displayed when the response is not correct
    - Write a test that asserts that a single item is in the list when the <Home /> component is loaded
    - Write a test that adds a new item to the list
    - Write a test that removes an item from the list*/ 

    test('loading is displayed when the response is not correct', async () => {
        server.use(
          rest.get('/api/getTodos', (req, res, ctx) => {
            return res(ctx.json(null))
          }),
        )
        render(<Home/>)
        expect(await screen.findAllByTestId("loading"));
      })

    test('asserts that a single item is in the list when the <Home /> component is loaded', async () => {
        render(<Home/>)
        expect(await screen.findByTestId("todo-item"));
      })
    
    test('adds a new item to the list', async () => {

        server.use(
            rest.post('/api/addTodo', (req, res, ctx) => {
                return res(ctx.json([]))
            }),
          );

        render(<Home/>)
      
        fireEvent.change(screen.getByTestId("todo-input"), { target: { value: "new item in a list" } });
        fireEvent.submit(screen.getByTestId("todo-input"))
      
        await waitFor(() => screen.getByTestId("todo-item"));

        const newTodoItem = await screen.findAllByTestId("todo-item");
        expect(newTodoItem.length).toBe(1);
      })
      test('removes an item from the list', async () => {

        render(<Home/>)
      
        await waitFor(() => screen.getByTestId("todo-item").click());
        expect(screen.queryByTestId("todo-item")).toBe(null);
      })

      
 
});
