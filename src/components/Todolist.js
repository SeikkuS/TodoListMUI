import React from "react";

export default function Todolist(props) {
    return(
        <div>
            <table>
                <tbody>
                {
                props.todos.map((todo, index) => 
                    <tr key={index}>
                        <td>{todo.desc}</td>
                        <td>{todo.date}</td>
                        <td><input type="button" value="Delete" onClick={e => props.deleteTodo(index, e)} /></td>
                    </tr>
                )
                }
                </tbody>
            </table>
        </div>
    );
}