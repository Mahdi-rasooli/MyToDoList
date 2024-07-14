import React, { useState } from 'react';
import './ToDoListStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashAlt, faHandPointUp } from '@fortawesome/free-solid-svg-icons';

function MyToDoList() {


  const [todos, setToDos] = useState([]);

  const [newToDo, setNewToDo] = useState('');

  const [isEditMode, setIsEditMode] = useState(false);

  const [editValue, setEditValue] = useState('');

  const [editIndex, setEditIndex] = useState(null);


  function handleChangeInput(event) {
    setNewToDo(event.target.value);
  }

  function addToDo() {
    if (newToDo.trim() !== '') {
      setToDos(t => [...t, newToDo]);
      setNewToDo('');
    }
  }

  function handleDelete(index) {
    setToDos(todos.filter((_, i) => i !== index));
  }

  function moveUpItem(index) {
    if (index > 0) {
      const updatedTodos = [...todos];
      const temp = updatedTodos[index];
      updatedTodos[index] = updatedTodos[index - 1];
      updatedTodos[index - 1] = temp;
      setToDos(updatedTodos);
    }
  }

  function turnOnEditMode(index) {
    setIsEditMode(true);
    setEditValue(todos[index]);
    setEditIndex(index);
  }

  function handleEditChange(event) {
    setEditValue(event.target.value);
  }

  function editTodo() {
    const editedTodos = todos.map((todo, i) => (i === editIndex ? editValue : todo));
    setToDos(editedTodos);
    setIsEditMode(false);
    setEditIndex(null);
  }




  return (
    <div className='todolist'>
      <h1 className='todo-title'>What are you going to do?</h1>
      <div className='todo-input'>
        <input
          type='text'
          placeholder='Write your plan...'
          value={newToDo}
          onChange={handleChangeInput}
        />
        <button onClick={addToDo}>Add Task</button>
      </div>

      <div className='todo-item'>
        <ol>
          {todos.map((todo, index) => (
            <li key={index}>
              <div className='todo-list-item'>
                {isEditMode && editIndex === index ? (
                  <div className='edit-todo'>
                    <input
                      type='text'
                      value={editValue}
                      onChange={handleEditChange}
                    />
                    <button onClick={editTodo}>Save</button>
                  </div>
                ) : (
                  <>
                    <span>{todo}</span>
                    <div className='todo-icons'>
                      <FontAwesomeIcon
                        className='editicon'
                        icon={faPenToSquare}
                        onClick={() => turnOnEditMode(index)}
                      />
                      <FontAwesomeIcon
                        className='trashicon'
                        icon={faTrashAlt}
                        onClick={() => handleDelete(index)}
                      />
                      <FontAwesomeIcon
                        className='upicon'
                        icon={faHandPointUp}
                        onClick={() => moveUpItem(index)}
                      />
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default MyToDoList;
