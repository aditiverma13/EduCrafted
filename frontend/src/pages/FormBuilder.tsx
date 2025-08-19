// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import FieldPalette from "../components/FieldPalette";
// import { createForm, getForm, updateForm } from "../lib/api";
// import type { Field, FormDoc } from "../lib/types";
// import {
//   DndContext,
//   closestCenter,
//   useSensor,
//   useSensors,
//   MouseSensor,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
//   useSortable,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// function SortableRow({
//   f,
//   onRemove,
//   onSelect,
// }: {
//   f: Field;
//   onRemove: () => void;
//   onSelect: () => void;
// }) {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: f.key });
//   const style = { transform: CSS.Transform.toString(transform), transition };
//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className="flex items-center justify-between border rounded-md p-2 bg-white"
//     >
//       <div className="flex items-center gap-3">
//         <span {...attributes} {...listeners} className="cursor-grab select-none">
//           ↕
//         </span>
//         <span className="font-medium">{f.label}</span>
//         <span className="text-xs text-gray-500">({f.type})</span>
//       </div>
//       <div className="flex gap-2">
//         <button className="text-blue-600" onClick={onSelect}>
//           Edit
//         </button>
//         <button className="text-red-600" onClick={onRemove}>
//           Remove
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function FormBuilder() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState<FormDoc>({
//     title: "Untitled Form",
//     description: "",
//     status: "draft",
//     settings: { thankYouMessage: "Thanks!", submissionLimit: undefined },
//     fields: [],
//   });

//   const [selectedKey, setSelectedKey] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return;
//     getForm(id).then(setForm);
//   }, [id]);

//   function addField(f: Field) {
//     setForm((prev) => ({ ...prev, fields: [...prev.fields, f] }));
//   }

//   const sensors = useSensors(useSensor(MouseSensor));

//   function onDragEnd(e: any) {
//     const { active, over } = e;
//     if (!over || active.id === over.id) return;
//     setForm((prev) => {
//       const oldIndex = prev.fields.findIndex((x) => x.key === active.id);
//       const newIndex = prev.fields.findIndex((x) => x.key === over.id);
//       return { ...prev, fields: arrayMove(prev.fields, oldIndex, newIndex) };
//     });
//   }

//   async function save() {
//     if (id) {
//       const saved = await updateForm(id, form);
//       setForm(saved);
//       alert("Saved!");
//     } else {
//       const created = await createForm(form);
//       navigate(`/forms/${created._id}/edit`);
//     }
//   }

//   const selected = useMemo(
//     () => form.fields.find((f) => f.key === selectedKey) || null,
//     [form, selectedKey]
//   );

//   function updateSelected(patch: Partial<Field>) {
//     setForm((prev) => ({
//       ...prev,
//       fields: prev.fields.map((f) =>
//         f.key === selectedKey ? { ...f, ...patch } : f
//       ),
//     }));
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 xl:px-8 px-4 py-6 space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <input
//           className="border rounded-md px-3 py-2 w-1/2"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//         />
//         <div className="flex gap-3">
//           <select
//             className="border rounded-md px-3 py-2"
//             value={form.status}
//             onChange={(e) =>
//               setForm({ ...form, status: e.target.value as any })
//             }
//           >
//             <option value="draft">Draft</option>
//             <option value="published">Published</option>
//           </select>
//           <button
//             className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
//             onClick={save}
//           >
//             Save
//           </button>
//         </div>
//       </div>

//       <textarea
//         className="border rounded-md px-3 py-2 w-full"
//         placeholder="Description"
//         value={form.description}
//         onChange={(e) => setForm({ ...form, description: e.target.value })}
//       />

//       {/* Palette */}
//       <FieldPalette onAdd={addField} />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left: form fields */}
//         <div className="lg:col-span-2 space-y-4">
//           <h3 className="font-semibold">Form Fields</h3>
//           <div className="space-y-2">
//             <DndContext
//               sensors={sensors}
//               collisionDetection={closestCenter}
//               onDragEnd={onDragEnd}
//             >
//               <SortableContext
//                 items={form.fields.map((f) => f.key)}
//                 strategy={verticalListSortingStrategy}
//               >
//                 {form.fields.map((f) => (
//                   <SortableRow
//                     key={f.key}
//                     f={f}
//                     onSelect={() => setSelectedKey(f.key)}
//                     onRemove={() =>
//                       setForm((prev) => ({
//                         ...prev,
//                         fields: prev.fields.filter((x) => x.key !== f.key),
//                       }))
//                     }
//                   />
//                 ))}
//               </SortableContext>
//             </DndContext>
//           </div>
//         </div>

//         {/* Right: settings */}
//         <div className="space-y-4">
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="font-semibold mb-3">Form Settings</h3>
//             <label className="text-sm font-medium">Thank-you message</label>
//             <input
//               className="border rounded-md px-3 py-2 mt-1 w-full"
//               value={form.settings?.thankYouMessage || ""}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   settings: {
//                     ...form.settings,
//                     thankYouMessage: e.target.value,
//                   },
//                 })
//               }
//             />
//             <label className="text-sm font-medium mt-4 block">
//               Submission limit
//             </label>
//             <input
//               className="border rounded-md px-3 py-2 mt-1 w-full"
//               type="number"
//               placeholder="(optional)"
//               value={form.settings?.submissionLimit ?? ""}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   settings: {
//                     ...form.settings,
//                     submissionLimit: e.target.value
//                       ? +e.target.value
//                       : undefined,
//                   },
//                 })
//               }
//             />
//           </div>

//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="font-semibold mb-3">Field Config</h3>
//             {!selected ? (
//               <p className="text-sm text-gray-500">Select a field to edit</p>
//             ) : (
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Label</label>
//                 <input
//                   className="border rounded-md px-3 py-2 w-full"
//                   value={selected.label}
//                   onChange={(e) =>
//                     updateSelected({ label: e.target.value })
//                   }
//                 />
//                 <label className="text-sm font-medium">Placeholder</label>
//                 <input
//                   className="border rounded-md px-3 py-2 w-full"
//                   value={selected.placeholder || ""}
//                   onChange={(e) =>
//                     updateSelected({ placeholder: e.target.value })
//                   }
//                 />
//                 <label className="text-sm font-medium">Required</label>
//                 <select
//                   className="border rounded-md px-3 py-2 w-full"
//                   value={selected.required ? "1" : "0"}
//                   onChange={(e) =>
//                     updateSelected({ required: e.target.value === "1" })
//                   }
//                 >
//                   <option value="0">No</option>
//                   <option value="1">Yes</option>
//                 </select>
//                 {(selected.type === "select" ||
//                   selected.type === "radio" ||
//                   selected.type === "checkbox") && (
//                   <>
//                     <label className="text-sm font-medium">
//                       Options (comma-separated)
//                     </label>
//                     <input
//                       className="border rounded-md px-3 py-2 w-full"
//                       value={(selected.options || []).join(", ")}
//                       onChange={(e) =>
//                         updateSelected({
//                           options: e.target.value
//                             .split(",")
//                             .map((s) => s.trim())
//                             .filter(Boolean),
//                         })
//                       }
//                     />
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FieldPalette from "../components/FieldPalette";
import { createForm, getForm, updateForm } from "../lib/api";
import type { Field, FormDoc } from "../lib/types";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableRow({
  f,
  onRemove,
  onSelect,
}: {
  f: Field;
  onRemove: () => void;
  onSelect: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: f.key });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="card-row"
    >
      <div className="flex-left">
        <span {...attributes} {...listeners} className="drag-handle">
          ↕
        </span>
        <span className="font-medium">{f.label}</span>
        <span className="text-xs text-gray-500">({f.type})</span>
      </div>
      <div className="flex gap-2">
        <button className="btn-edit" onClick={onSelect}>
          Edit
        </button>
        <button className="btn-remove" onClick={onRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default function FormBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormDoc>({
    title: "Untitled Form",
    description: "",
    status: "draft",
    settings: { thankYouMessage: "Thanks!", submissionLimit: undefined },
    fields: [],
  });

  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getForm(id).then(setForm);
  }, [id]);

  function addField(f: Field) {
    setForm((prev) => ({ ...prev, fields: [...prev.fields, f] }));
  }

  const sensors = useSensors(useSensor(MouseSensor));

  function onDragEnd(e: any) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    setForm((prev) => {
      const oldIndex = prev.fields.findIndex((x) => x.key === active.id);
      const newIndex = prev.fields.findIndex((x) => x.key === over.id);
      return { ...prev, fields: arrayMove(prev.fields, oldIndex, newIndex) };
    });
  }

  async function save() {
    if (id) {
      const saved = await updateForm(id, form);
      setForm(saved);
      alert("Saved!");
    } else {
      const created = await createForm(form);
      navigate(`/forms/${created._id}/edit`);
    }
  }

  const selected = useMemo(
    () => form.fields.find((f) => f.key === selectedKey) || null,
    [form, selectedKey]
  );

  function updateSelected(patch: Partial<Field>) {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.map((f) =>
        f.key === selectedKey ? { ...f, ...patch } : f
      ),
    }));
  }

  return (
    <div className="min-h-screen bg-gray-100 xl:px-8 px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <input
          className="input"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <div className="flex gap-3">
          <select
            className="input"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as any })
            }
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button className="btn-primary" onClick={save}>
            Save
          </button>
        </div>
      </div>

      {/* Description */}
      <textarea
        className="input textarea"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* Field Palette */}
      <FieldPalette onAdd={addField} />

      {/* Form Fields + Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Form Fields */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-semibold">Form Fields</h3>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
            <SortableContext
              items={form.fields.map((f) => f.key)}
              strategy={verticalListSortingStrategy}
            >
              {form.fields.map((f) => (
                <SortableRow
                  key={f.key}
                  f={f}
                  onSelect={() => setSelectedKey(f.key)}
                  onRemove={() =>
                    setForm((prev) => ({
                      ...prev,
                      fields: prev.fields.filter((x) => x.key !== f.key),
                    }))
                  }
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {/* Right: Settings */}
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-3">Form Settings</h3>
            <label className="label">Thank-you message</label>
            <input
              className="input"
              value={form.settings?.thankYouMessage || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  settings: { ...form.settings, thankYouMessage: e.target.value },
                })
              }
            />
            <label className="label mt-4">Submission limit</label>
            <input
              className="input"
              type="number"
              placeholder="(optional)"
              value={form.settings?.submissionLimit ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  settings: {
                    ...form.settings,
                    submissionLimit: e.target.value
                      ? +e.target.value
                      : undefined,
                  },
                })
              }
            />
          </div>

          <div className="card">
            <h3 className="font-semibold mb-3">Field Config</h3>
            {!selected ? (
              <p className="text-sm text-gray-500">Select a field to edit</p>
            ) : (
              <div className="space-y-2">
                <label className="label">Label</label>
                <input
                  className="input"
                  value={selected.label}
                  onChange={(e) => updateSelected({ label: e.target.value })}
                />
                <label className="label">Placeholder</label>
                <input
                  className="input"
                  value={selected.placeholder || ""}
                  onChange={(e) => updateSelected({ placeholder: e.target.value })}
                />
                <label className="label">Required</label>
                <select
                  className="input"
                  value={selected.required ? "1" : "0"}
                  onChange={(e) =>
                    updateSelected({ required: e.target.value === "1" })
                  }
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
                {(selected.type === "select" ||
                  selected.type === "radio" ||
                  selected.type === "checkbox") && (
                  <>
                    <label className="label">Options (comma-separated)</label>
                    <input
                      className="input"
                      value={(selected.options || []).join(", ")}
                      onChange={(e) =>
                        updateSelected({
                          options: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
