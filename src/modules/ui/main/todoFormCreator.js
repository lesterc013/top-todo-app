export function createNewTodoForm() {
  const form = createFormWithStandardInputs();
  form.setAttribute('name', 'new-todo-form');
  const submitBtn = document.createElement('button');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.textContent = 'Add';
  form.appendChild(submitBtn);

  return form;
}

export function createTodoUpdateForm(todo) {
  const form = createFormWithStandardInputs(todo);
  form.setAttribute('name', 'update-todo-form');
  const submitBtn = document.createElement('button');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.textContent = 'Update';
  form.appendChild(submitBtn);

  // Add hidden id field to allow identification of the todo to be updated.
  const hiddenId = document.createElement('input');
  hiddenId.setAttribute('type', 'text');
  hiddenId.setAttribute('name', 'id');
  hiddenId.setAttribute('id', 'id');
  hiddenId.hidden = true;
  hiddenId.value = todo.id;
  form.appendChild(hiddenId);

  return form;
}

/**
 * This function is shared by createNew and createUpdate todo forms since all the editable Todo properties are the same.
 * @param {Todo} todo Supply a todo object to set the input field values.
 */
function createFormWithStandardInputs(todo = null) {
  const form = document.createElement('form');

  const title = createInputRow(todo, 'title', 'text', 'Title');
  const desc = createInputRow(todo, 'description', 'text', 'Description');
  const dueDate = createInputRow(todo, 'dueDate', 'date', 'Due');
  const isDone = createInputRow(todo, 'isDone', 'checkbox', 'Done');

  form.appendChild(title);
  form.appendChild(desc);
  form.appendChild(dueDate);
  form.appendChild(isDone);

  return form;
}

function createInputRow(todo, inputName, inputType, labelName) {
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

  // If no todo provided, then we leave value default since this is likely coming from createNewTodoForm.
  if (todo) {
    // To correctly render the checkbox ticked or not.
    if (inputType === 'checkbox' && todo.isDone) {
      input.setAttribute('checked', 'true');
    } else {
      input.value = todo[inputName];
    }
  }

  input.id = inputName;

  row.appendChild(label);
  row.appendChild(input);
  return row;
}
