import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../../model';
import SingleTodo from './SingleTodo';

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
    return (
        <div className="container">
            <Droppable droppableId='TodosList'>
                {
                    (provided, snapshot) => (
                        <div className={`todos ${snapshot.isDraggingOver ? "dragActive" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todos__heading">
                                Active Tasks
                            </span>
                            {
                                todos.map((item, index) => (
                                    <SingleTodo index={index} todo={item} todos={todos} setTodos={setTodos} />
                                ))
                            }
                        </div>
                    )
                }

            </Droppable>


            <Droppable droppableId='TodosRemove'>
                {
                    (provided , snapshot) => (
                        <div 
                        className={`todos remove ${snapshot.isDraggingOver ? "drogcomplete" : ""}`}
                         ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todos__heading">
                                Completed Tasks
                            </span>
                            {
                                completedTodos.map((item, index) => (
                                    <SingleTodo index={index} todo={item} todos={completedTodos} setTodos={setCompletedTodos} />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    );
};

export default TodoList;