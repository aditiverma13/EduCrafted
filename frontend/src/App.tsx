import { Link, NavLink, Route, Routes } from "react-router-dom";
import FormList from "./pages/FormList";
import FormBuilder from "./pages/FormBuilder";
import Preview from "./pages/Preview";
import Analytics from "./pages/Analytics";
import PublicForm from "./pages/PublicForm";
import Navbar from "./components/Navbar";



export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container py-6">
        <Routes>
          <Route path="/" element={<FormList />} />
          <Route path="/forms/new" element={<FormBuilder />} />
          <Route path="/forms/:id/edit" element={<FormBuilder />} />
          <Route path="/forms/:id/preview" element={<Preview />} />
          <Route path="/forms/:id/analytics" element={<Analytics />} />
          {/* Public form route (shareable) */}
          <Route path="/f/:id" element={<PublicForm />} />
          {/* Fallback */}
          <Route path="*" element={
            <div className="card">
              <h1 className="text-xl font-semibold mb-2">Not found</h1>
              <NavLink className="btn btn-primary" to="/">Go Home</NavLink>
            </div>
          }/>
        </Routes>
      </div>
    </div>
  );
}

