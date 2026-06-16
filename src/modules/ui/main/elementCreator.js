export function createTodoUpdateForm(todo) {
  const form = document.createElement('form');

  const title = createInputRow(todo, 'title', 'text', 'Title');
  const desc = createInputRow(todo, 'description', 'text', 'Description');
  const dueDate = createInputRow(todo, 'due-date', 'date', 'Due');
  const isDone = createInputRow(todo, 'is-done', 'checkbox', 'Done');

  form.appendChild(title);
  form.appendChild(desc);
  form.appendChild(dueDate);
  form.appendChild(isDone);
  const submitBtn = document.createElement('button');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.textContent = 'Update';
  form.appendChild(submitBtn);

  return form;
}

function createInputRow(todoObject, inputName, inputType, labelName) {
  const row = document.createElement('div');
  row.classList = 'input-row';

  const label = document.createElement('label');
  label.setAttribute('for', inputName);
  label.textContent = `${labelName}: `;

  const input =
    inputName === 'description'
      ? document.createElement('textarea')
      : document.createElement('input');
  input.setAttribute('type', inputType);
  input.setAttribute('name', inputName);
  input.value = todoObject[inputName];
  input.id = inputName;

  row.appendChild(label);
  row.appendChild(input);
  return row;
}
