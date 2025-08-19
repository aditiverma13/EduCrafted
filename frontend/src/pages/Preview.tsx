// import { getForm } from "../lib/api";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import FormRenderer from "../components/FormRenderer";
// import type { FormDoc } from "../lib/types";

// export default function Preview() {
//   const { id } = useParams();
//   const [form, setForm] = useState<FormDoc | null>(null);

//   useEffect(() => {
//     if (id) getForm(id).then(setForm);
//   }, [id]);

//   if (!form) return <div className="p-6">Loading…</div>;

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center py-10">
//       <div className="bg-white w-full max-w-2xl rounded-lg shadow p-6">
//         <h1 className="text-xl font-semibold mb-3">{form.title} (Preview)</h1>
//         <FormRenderer
//           form={form}
//           submitLabel="Test Submit"
//           onSubmit={() => alert("Preview mode (no submit)")}
//         />
//       </div>
//     </div>
//   );
// }


import { getForm } from "../lib/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormRenderer from "../components/FormRenderer";
import type { FormDoc } from "../lib/types";

export default function Preview() {
  const { id } = useParams();
  const [form, setForm] = useState<FormDoc | null>(null);

  useEffect(() => {
    if (id) getForm(id).then(setForm);
  }, [id]);

  if (!form) return <div className="p-6">Loading…</div>;

  return (
    <div className="min-h-screen flex justify-center py-10 bg-gray-50">
      <div className="card w-full max-w-2xl">
        <h1 className="text-xl font-semibold mb-3">{form.title} (Preview)</h1>
        <FormRenderer
          form={form}
          submitLabel="Test Submit"
          onSubmit={() => alert("Preview mode (no submit)")}
        />
      </div>
    </div>
  );
}

