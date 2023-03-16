import "./App.css";
import {Routes, Route, Navigate } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Hi</h1>}></Route>
      <Route path="/new" element={<h1>New</h1>}></Route>
      <Route path="/:id">
        <Route index element={<h1>Show</h1>} />
        <Route path="edit" element={<h1>Edit</h1>} />
      </Route>
      <Route path="/*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
}

export default App;
