let FormEl = document.querySelector(".todo-input");
let UlEl = document.querySelector(".todo-list");
let Modal = document.querySelector(".modal")
let ModalForm = document.querySelector(".modal-form");
let ModalInput = document.querySelector("#modalInput")




import { getTodo, postTodo, deleteTodo, patchTodo  } from "./getDate.js";
FormEl.addEventListener("submit", (e) => {
  e.preventDefault()
  console.log(FormEl.input.value);
  postTodo("http://localhost:8080/todos", FormEl.input.value);
  getTodo("http://localhost:8080/todos");
  FormEl.reset()
});

function Edit (id){
  ModalForm.addEventListener("submit", (e) => {
  e.preventDefault()

  patchTodo(`http://localhost:8080/todos/${id}`, ModalForm.modalInput.value);
  console.log(ModalForm.modalInput.value);
  getTodo(`http://localhost:8080/todos`);

})
}

export function UpdateUi(list) {
  
  UlEl.innerHTML = ""
  list.forEach((todo) => {
    
    let { id, title } = todo;
    
    UlEl.innerHTML += `
    <li class="todo-item" data-id="${id}" >
    <span class="todo-text">${title}</span>
    
    <div class="todo-actions">
    <button data-id="${id}" class="edit-btn" title="O‘zgartirish">✏️</button>
    <button class="delete-btn" title="O‘chirish">🗑</button>
    </div>
        </li>
        
        `;
      });
    }
    
   UlEl.addEventListener("click", async (e) => {
     if (e.target.classList.contains("delete-btn")) {
       const li = e.target.closest(".todo-item");
       const id = li.dataset.id;
       

       await deleteTodo("http://localhost:8080/todos", id);
       await getTodo("http://localhost:8080/todos");
     }
     if(e.target.classList.contains("edit-btn")){
      
      openModal()
      let EditId = e.target.dataset.id
      Edit(EditId)
      ModalInput.value =
        e.target.parentElement.previousElementSibling.textContent;
     }
   });

   function openModal () {
    Modal.classList.toggle("hidden")
   }
   openModal()

   document.addEventListener("keydown", (e) =>{
    
    if(e.key == "Enter"){
      openModal()
    }
   })