let FormEl = document.querySelector(".todo-input");
let UlEl = document.querySelector(".todo-list");



import { getTodo, postTodo, deleteTodo } from "./getDate.js";
FormEl.addEventListener("submit", (e) => {
  e.preventDefault()
  console.log(FormEl.input.value);
  postTodo("http://localhost:8080/todos", FormEl.input.value);
  getTodo("http://localhost:8080/todos");
  FormEl.reset()
});
UlEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const li = e.target.closest(".todo-item");
    const id = li.dataset.id;

    deleteTodo("http://localhost:8080/todos", id).then(() => {
      getTodo("http://localhost:8080/todos");
    });
  }
})
export function UpdateUi(list) {

  UlEl.innerHTML = ""
  list.forEach((todo) => {
    
    let { id, title, completed } = todo;

    UlEl.innerHTML += `
         <li class="todo-item" data-id="${id}" >
          <span class="todo-text">${title}</span>

          <div class="todo-actions">
            <button class="edit-btn" title="O‘zgartirish">✏️</button>
            <button class="delete-btn" title="O‘chirish">🗑</button>
          </div>
        </li>
        
        `;
  });
}
