// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { duplicateForm, listForms, deleteForm, updateForm } from "../lib/api";
// import type { FormDoc } from "../lib/types";

// export default function FormList() {
//   const [items, setItems] = useState<FormDoc[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   async function load() {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await listForms();
//       setItems(Array.isArray(data) ? data : []);
//     } catch (e) {
//       setError("Failed to load forms");
//       setItems([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     load();
//   }, []);

//   async function onDelete(id?: string) {
//     if (!id) return;
//     if (!confirm("Delete this form?")) return;
//     await deleteForm(id);
//     load();
//   }

//   async function toggleStatus(f: FormDoc) {
//     if (!f._id) return;
//     const next = f.status === "draft" ? "published" : "draft";
//     await updateForm(f._id, { status: next });
//     load();
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 lg:px-8 px-4 py-6">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="font-bold text-2xl">Dashboard</h1>
//         <Link
//           className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//           to="/forms/new"
//         >
//           + Create Form
//         </Link>
//       </div>

//       {/* Forms grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {loading && <p>Loading...</p>}
//         {error && <p className="text-red-500">{error}</p>}

//         {!loading &&
//           !error &&
//           items.map((f) => (
//             <div
//               key={f._id}
//               className="bg-white p-5 rounded-lg shadow hover:shadow-md transition space-y-3"
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h2 className="font-semibold text-lg">{f.title}</h2>
//                   <p className="text-xs text-gray-500">
//                     {new Date(f.createdAt || "").toLocaleDateString()}
//                   </p>
//                 </div>
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-medium ${
//                     f.status === "draft"
//                       ? "bg-yellow-100 text-yellow-600"
//                       : "bg-green-100 text-green-600"
//                   }`}
//                 >
//                   {f.status}
//                 </span>
//               </div>

//               <div className="border-t pt-3 grid grid-cols-2 gap-2 text-sm">
//                 <Link
//                   className="bg-gray-100 hover:bg-gray-200 rounded px-3 py-1 text-center"
//                   to={`/forms/${f._id}/edit`}
//                 >
//                   Edit
//                 </Link>
//                 <Link
//                   className="bg-gray-100 hover:bg-gray-200 rounded px-3 py-1 text-center"
//                   to={`/forms/${f._id}/preview`}
//                 >
//                   Preview
//                 </Link>
//                 <Link
//                   className="bg-gray-100 hover:bg-gray-200 rounded px-3 py-1 text-center"
//                   to={`/forms/${f._id}/analytics`}
//                 >
//                   Analytics
//                 </Link>
//                 <button
//                   onClick={() => duplicateForm(f._id!).then(load)}
//                   className="bg-gray-100 hover:bg-gray-200 rounded px-3 py-1"
//                 >
//                   Duplicate
//                 </button>
//                 <button
//                   onClick={() => toggleStatus(f)}
//                   className="bg-gray-100 hover:bg-gray-200 rounded px-3 py-1"
//                 >
//                   {f.status === "draft" ? "Publish" : "Unpublish"}
//                 </button>
//                 <button
//                   onClick={() => onDelete(f._id)}
//                   className="bg-red-100 hover:bg-red-200 text-red-600 rounded px-3 py-1"
//                 >
//                   Delete
//                 </button>
//                 {f.status === "published" && (
//                   <Link
//                     className="col-span-2 bg-blue-600 text-white hover:bg-blue-700 rounded px-3 py-1 text-center"
//                     to={`/f/${f._id}`}
//                     target="_blank"
//                   >
//                     Open Public Link
//                   </Link>
//                 )}
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { duplicateForm, listForms, deleteForm, updateForm } from "../lib/api";
import type { FormDoc } from "../lib/types";

export default function FormList() {
  const [items, setItems] = useState<FormDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await listForms();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("Failed to load forms");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id?: string) {
    if (!id) return;
    if (!confirm("Delete this form?")) return;
    await deleteForm(id);
    load();
  }

  async function toggleStatus(f: FormDoc) {
    if (!f._id) return;
    const next = f.status === "draft" ? "published" : "draft";
    await updateForm(f._id, { status: next });
    load();
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex-between mb-6">
        <h1 className="title">Dashboard</h1>
        <Link className="btn-primary" to="/forms/new">
          + Create Form
        </Link>
      </div>

      {/* Forms Grid */}
      <div className="forms-grid">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red">{error}</p>}

        {!loading &&
          !error &&
          items.map((f) => (
            <div key={f._id} className="card">
              <div className="flex-between mb-2">
                <div>
                  <h2 className="font-semibold">{f.title}</h2>
                  <p className="text-sm text-gray">
                    {new Date(f.createdAt || "").toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`status-badge ${
                    f.status === "draft" ? "draft" : "published"
                  }`}
                >
                  {f.status}
                </span>
              </div>

              <div className="grid grid-2 gap-2 text-sm">
                <Link className="btn-light" to={`/forms/${f._id}/edit`}>
                  Edit
                </Link>
                <Link className="btn-light" to={`/forms/${f._id}/preview`}>
                  Preview
                </Link>
                <Link className="btn-light" to={`/forms/${f._id}/analytics`}>
                  Analytics
                </Link>
                <button onClick={() => duplicateForm(f._id!).then(load)} className="btn-light">
                  Duplicate
                </button>
                <button onClick={() => toggleStatus(f)} className="btn-light">
                  {f.status === "draft" ? "Publish" : "Unpublish"}
                </button>
                <button onClick={() => onDelete(f._id)} className="btn-danger">
                  Delete
                </button>
                {f.status === "published" && (
                  <Link
                    className="btn-primary col-span-2"
                    to={`/f/${f._id}`}
                    target="_blank"
                  >
                    Open Public Link
                  </Link>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

