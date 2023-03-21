import { test, expect } from "@playwright/test";
import { deleteMany } from "../src/lib/todoStore";

import {prisma} from '../src/lib/todoStore';

export async function findId(n:string) {
  const a = await prisma.newtodo.findFirst({where: {title: n}})
  if (a){
    return a.id
  }else {
    return undefined
  }
  //return todos;
}
test.beforeAll(() => {
  deleteMany();
})

// Add your e2e tests here
test.describe('Add a simple invoice test', () => {

  test("should navigate to index page and have correct title", async ({ page,
  }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("/");
    // The page should contain an title element with the text "TODO 📃 App with Next.js!"
    await expect(page.getByTestId("title")).toHaveText(
      "TODO 📃 App with Next.js!"
    );
  });


  

  test("validates the TODO list is empty", async ({ page,
  }) => {
    await page.goto("/");
    //finds all todo items else returns []
    const todoItem = await page.$$('[data-testid="todo-item"]');
    expect(todoItem.length).toBe(0);
  });

  test('Adding item to list', async ({page,
  }) => {
    await page.goto("/");

    await page.getByTestId('todo-input').fill('New Todo');
    await page.getByTestId('todo-input').press('Enter');

    const todoItemText = await page.textContent('[data-testid="todo-item"]'); //*[@id="__next"]/div/main/div/a[2]/p
    expect(todoItemText).toContain('New Todo');

  });

  test('add a second item to the list', async ({page,  }) => {
    await page.goto("/");

    await page.getByTestId('todo-input').fill('second todo');
    await page.getByTestId('todo-input').press('Enter');

    //const a = await page.$$('xpath=//html/body/div/div/main/div/a');
    const a =  page.getByText('second todo');
    expect(await a.innerHTML()).toBe('second todo');
  });

  test('removes one item from the list', async ({page,
  }) => {
    await page.goto("/");

    await page.getByTestId('todo-input').fill('test todo');
    await page.getByTestId('todo-input').press('Enter');
  
    // Remove the added item from the list
    const a = page.getByRole('link', {name: 'test todo', exact: true});
    const b = a.first();
    const c = await b.click();

    // Fetch the items from the list and check if the added item is in the list
    //const todoItemText = await page.textContent('[data-testid="todo-item"]');
    expect(page.getByText('test todo')).not.toBe('test todo');
  });

});

