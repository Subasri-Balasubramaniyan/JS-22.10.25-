const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const filter = document.getElementById('filter');
const clearBtn = document.getElementById('clear-completed');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function render() {
  list.innerHTML = '';
  const mode = filter.value;
  const toShow = todos.filter(t => mode === 'all' ? true : (mode === 'active' ? !t.completed : t.completed));
  toShow.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo' + (todo.completed ? ' completed' : '');
    li.dataset.id = todo.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      save();
      render();
    });

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = todo.text;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => startEdit(todo, li));

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
      todos = todos.filter(t => t.id !== todo.id);
      save();
      render();
    });

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(checkbox);
    li.appendChild(title);
    li.appendChild(actions);

    list.appendChild(li);
  });
}

function startEdit(todo, li) {
  li.innerHTML = '';
  const editInput = document.createElement('input');
  editInput.className = 'edit-input';
  editInput.value = todo.text;
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.addEventListener('click', () => {
    todo.text = editInput.value.trim() || todo.text;
    save();
    render();
  });
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.addEventListener('click', render);

  li.appendChild(editInput);
  li.appendChild(saveBtn);
  li.appendChild(cancelBtn);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  const newTodo = { id: Date.now().toString(), text, completed: false };
  todos.unshift(newTodo);
  input.value = '';
  save();
  render();
});

filter.addEventListener('change', render);
clearBtn.addEventListener('click', () => {
  todos = todos.filter(t => !t.completed);
  save();
  render();
});

render();
