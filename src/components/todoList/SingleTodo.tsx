import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../model';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface Props {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {

    const [edit, setEdit] = useState<Boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const handleDone = (id: Number) => {
        setTodos(todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)
        )
    }

    const handleEdit = (e: React.FormEvent, id: Number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setEdit(false);
    };

    const handleDelete = (id: Number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <Draggable draggableId={todo.id.toString()}
            index={index}
        >
            {
                (provided, snapshot) => (
                    <form className={`todos__single ${snapshot.isDragging ? "drag" : ""}`} onSubmit={(e) => handleEdit(e, todo.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {edit ? (
                            <input
                                value={editTodo}
                                onChange={(e) => setEditTodo(e.target.value)}
                                className="todos_single_text"
                                ref={inputRef}
                            />
                        ) : todo.isDone ? (
                            <s className="todos_single_text">{todo.todo}</s>
                        ) : (
                            <span className="todos_single_text">{todo.todo}</span>
                        )}

                        <div>
                            <span className="icon">
                                <AiFillEdit
                                    onClick={() => {
                                        if (!edit && !todo.isDone) {
                                            setEdit(!edit);
                                        }
                                    }}
                                />
                            </span>
                            <span className="icon">
                                <AiFillDelete onClick={() => handleDelete(todo.id)} />
                            </span>
                            <span className="icon">
                                <MdDone onClick={() => handleDone(todo.id)} />
                            </span>
                        </div>
                    </form>
                )
            }
        </Draggable>
    );
};

export default SingleTodo;