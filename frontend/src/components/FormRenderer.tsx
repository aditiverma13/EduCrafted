// import { useForm } from "react-hook-form";
// import type { Field, FormDoc } from "../lib/types";

// function FieldControl({ field, register }: { field: Field; register: any }) {
//   const common = { ...register(field.key, { required: field.required }) };
//   switch (field.type) {
//     case "text":
//     case "email":
//       return <input className="input" type={field.type} placeholder={field.placeholder} {...common} />;
//     case "textarea":
//       return <textarea className="input" placeholder={field.placeholder} {...common} />;
//     case "select":
//       return (
//         <select className="input" {...common}>
//           <option value="">Select...</option>
//           {(field.options || []).map((opt) => (
//             <option key={opt} value={opt}>{opt}</option>
//           ))}
//         </select>
//       );
//     case "radio":
//       return (
//         <div className="flex gap-3">
//           {(field.options || []).map((opt) => (
//             <label key={opt} className="flex items-center gap-1">
//               <input type="radio" value={opt} {...register(field.key, { required: field.required })} />
//               <span className="text-sm">{opt}</span>
//             </label>
//           ))}
//         </div>
//       );
//     case "checkbox":
//       return (
//         <div className="flex gap-3">
//           {(field.options || []).map((opt) => (
//             <label key={opt} className="flex items-center gap-1">
//               <input type="checkbox" value={opt} {...register(field.key)} />
//               <span className="text-sm">{opt}</span>
//             </label>
//           ))}
//         </div>
//       );
//     case "file":
//       return <input className="input" type="file" {...register(field.key)} />;
//     default:
//       return null;
//   }
// }

// export default function FormRenderer({
//   form,
//   onSubmit,
//   submitLabel = "Submit",
// }: {
//   form: FormDoc;
//   onSubmit?: (values: any, files: Record<string, File | undefined>) => Promise<void> | void;
//   submitLabel?: string;
// }) {
//   const { register, handleSubmit } = useForm();

//   const handle = handleSubmit(async (values) => {
//     // collect file inputs separately
//     const files: Record<string, File | undefined> = {};
//     form.fields.forEach((f) => {
//       if (f.type === "file") {
//         const input = (document.querySelector(`input[name="${f.key}"]`) as HTMLInputElement | null);
//         files[f.key] = input?.files?.[0];
//       }
//     });
//     await onSubmit?.(values, files);
//   });

//   return (
//     <form onSubmit={handle} className="space-y-4">
//       {form.description && <p className="text-gray-600">{form.description}</p>}
//       {form.fields.map((f) => (
//         <div key={f.key} className="space-y-1">
//           <label className="label">{f.label}{f.required && <span className="text-red-500"> *</span>}</label>
//           <FieldControl field={f} register={register} />
//         </div>
//       ))}
//       <button className="btn btn-primary" type="submit">{submitLabel}</button>
//     </form>
//   );
// }
  import { useForm } from "react-hook-form";
import type { Field, FormDoc } from "../lib/types";

function FieldControl({ field, register }: { field: Field; register: any }) {
  const common = { ...register(field.key, { required: field.required }) };
  switch (field.type) {
    case "text":
    case "email":
      return <input className="input" type={field.type} placeholder={field.placeholder} {...common} />;
    case "textarea":
      return <textarea className="input" placeholder={field.placeholder} {...common} />;
    case "select":
      return (
        <select className="input" {...common}>
          <option value="">Select...</option>
          {(field.options || []).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    case "radio":
      return (
        <div className="flex gap-3">
          {(field.options || []).map((opt) => (
            <label key={opt} className="flex items-center gap-1">
              <input type="radio" value={opt} {...register(field.key, { required: field.required })} />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      );
    case "checkbox":
      return (
        <div className="flex gap-3">
          {(field.options || []).map((opt) => (
            <label key={opt} className="flex items-center gap-1">
              <input type="checkbox" value={opt} {...register(field.key)} />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      );
    case "file":
      return <input className="input" type="file" {...register(field.key)} />;
    default:
      return null;
  }
}

export default function FormRenderer({
  form,
  onSubmit,
  submitLabel = "Submit",
}: {
  form: FormDoc;
  onSubmit?: (values: any, files: Record<string, File | undefined>) => Promise<void> | void;
  submitLabel?: string;
}) {
  const { register, handleSubmit } = useForm();

  const handle = handleSubmit(async (values) => {
    const files: Record<string, File | undefined> = {};
    form.fields.forEach((f) => {
      if (f.type === "file") {
        const input = document.querySelector(`input[name="${f.key}"]`) as HTMLInputElement | null;
        files[f.key] = input?.files?.[0];
      }
    });
    await onSubmit?.(values, files);
  });

  return (
    <form onSubmit={handle} className="space-y-4">
      {form.description && <p className="text-gray-600">{form.description}</p>}
      {form.fields.map((f) => (
        <div key={f.key} className="space-y-1">
          <label className="label">{f.label}{f.required && <span className="text-red-500"> *</span>}</label>
          <FieldControl field={f} register={register} />
        </div>
      ))}
      <button className="btn btn-primary" type="submit">{submitLabel}</button>
    </form>
  );
}

