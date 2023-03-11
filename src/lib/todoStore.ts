import { uuid } from "uuidv4";

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


//Assumed i should keep the interface because addTodo depends on it
// So the db table is wery similar to interface
// and the addTodo creates the key in the table not the database.
export interface Todo {
  id: string;
  title: string;
}

//const todos: Todo[] = [];

export async function getTodos() {
  return await prisma.newtodo.findMany();
  //return todos;
}

export async function addTodo(title: string) {
   return await prisma.newtodo.create({
    data: {
      id: uuid(),
      title: title
    }
   })
  /*const newTodo = {
    id: uuid(),
    title: title,
  };
  todos.push(newTodo);
  return newTodo;
  */
}

export async function removeTodoById(id: string) {
  const todo = await prisma.newtodo.delete({
    where: { id: id },
  })
  if (todo){
    return true
  }else{
    return false
  }

  /*
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    return true;
  }
  return false;*/
}
