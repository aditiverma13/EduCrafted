// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getForm, submitToForm } from "../lib/api";
// import type { FormDoc } from "../lib/types";
// import FormRenderer from "../components/FormRenderer";

// export default function PublicForm() {
//   const { id } = useParams();
//   const [form, setForm] = useState<FormDoc | null>(null);
//   const [done, setDone] = useState<string | null>(null);

//   useEffect(() => {
//     if (id) getForm(id).then(setForm);
//   }, [id]);

//   if (!form) return <p className="p-6">Loading…</p>;
//   if (form.status !== "published")
//     return <p className="p-6">Form is not published.</p>;
//   if (done)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <div className="bg-white p-6 rounded-lg shadow w-full max-w-lg text-center">
//           <h1 className="text-xl font-semibold mb-2">Thank you!</h1>
//           <p>{done}</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen flex justify-center py-10 bg-gray-50">
//       <div className="bg-white p-6 rounded-lg shadow w-full max-w-lg">
//         <h1 className="text-xl font-semibold mb-3">{form.title}</h1>
//         <FormRenderer
//           form={form}
//           onSubmit={async (values, files) => {
//             await submitToForm(form._id!, values, files);
//             setDone(
//               form.settings?.thankYouMessage || "Thanks for submitting!"
//             );
//           }}
//         />
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getForm, submitToForm } from "../lib/api";
import type { FormDoc } from "../lib/types";
import FormRenderer from "../components/FormRenderer";

export default function PublicForm() {
  const { id } = useParams();
  const [form, setForm] = useState<FormDoc | null>(null);
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    if (id) getForm(id).then(setForm);
  }, [id]);

  if (!form) return <p className="p-6">Loading…</p>;
  if (form.status !== "published")
    return <p className="p-6">Form is not published.</p>;
  if (done)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="card w-full max-w-lg text-center">
          <h1 className="text-xl font-semibold mb-2">Thank you!</h1>
          <p>{done}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center py-10 bg-gray-50">
      <div className="card w-full max-w-lg">
        <h1 className="text-xl font-semibold mb-3">{form.title}</h1>
        <FormRenderer
          form={form}
          onSubmit={async (values, files) => {
            await submitToForm(form._id!, values, files);
            setDone(
              form.settings?.thankYouMessage || "Thanks for submitting!"
            );
          }}
        />
      </div>
    </div>
  );
}
