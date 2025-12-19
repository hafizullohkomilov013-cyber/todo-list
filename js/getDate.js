import { UpdateUi } from "./index.js";
export async function getTodo(params) {
  try {
    let res = await fetch(params);
    if (!res.ok) {
      throw new Error("apida muammo");
    }
    let data = await res.json();
    UpdateUi(data);
  } catch (error) {
    console.log(error);
  }
}
getTodo("http://localhost:8080/todos");20
export async function postTodo(params, title) {
  try {
    let res = await fetch(params, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    });
    if (!res.ok) {
      throw new Error("qo'shishda muammo uchramoqda");
    }
    let data = await res.json();
  } catch (error) {
    console.log(error);
  }
}
export async function deleteTodo(url, id) {
  try {
    let res = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("O‘chirishda xatolik");
    }
  } catch (error) {
    console.log(error);
  }
}

