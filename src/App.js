import './App.css';
import React from 'react';
import Todotable from "./components/Todolist";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns, filocale } from '@mui/x-date-pickers/AdapterDateFns';
import fiLocale from 'date-fns/locale/fi';
import { TextField } from '@mui/material';

function App() {
  const [todo, setTodo] = React.useState({ desc: "", date: "", priority: "" });
  const [todos, setTodos] = React.useState([]);
  const gridRef = React.useRef();

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  }

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
  }

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) =>
        index !== gridRef.current.getSelectedNodes()[0].childIndex))
    }
    else {
      alert('Select row first');
    }
  }

  const columns = [
    { headerName: "Date", field: "date", sortable: true, filter: true },
    { headerName: "Description", field: "desc", sortable: true, filter: true },
    {
      headerName: "Priority", field: "priority", sortable: true, filter: true,
      cellStyle: params => params.value === "High" ? { color: "red" } : { color: "black" }
    }
  ]

  return (
    <div className="App">
      <form onSubmit={addTodo}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fiLocale}>
          <DateTimePicker
            label=""
            value={todo.date}
            onChange={value =>
              setTodo({ ...todo, date: value })
            }
            renderInput={(params) => <TextField {...params} />} />
        </LocalizationProvider>
        <input type="text" name="desc" value={todo.desc} onChange={inputChanged} />
        <input type="text" name="priority" value={todo.priority} onChange={inputChanged} />
        <input type="submit" value="Add" />
      </form>
      <button onClick={deleteTodo}>Delete</button>
      <div className="ag-theme-material" style={{ height: "700px", width: "80%" }}>
        <AgGridReact
          ref={gridRef}
          onGridReady={params => gridRef.current = params.api}
          rowSelection="single"
          rowData={todos}
          columnDefs={columns}>
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;
