import type { Field, FieldType } from "../lib/types.ts";

const FIELD_TYPES: { type: FieldType; label: string }[] = [
  { type: "text", label: "Text" },
  { type: "email", label: "Email" },
  { type: "textarea", label: "Textarea" },
  { type: "select", label: "Select" },
  { type: "radio", label: "Radio" },
  { type: "checkbox", label: "Checkbox" },
  { type: "file", label: "File Upload" },
];

export default function FieldPalette({ onAdd }: { onAdd: (f: Field) => void }) {
  return (
    <div className="card">
      <h3 className="font-semibold mb-3">Fields</h3>
      <div className="grid-2">
        {FIELD_TYPES.map((ft) => (
          <button
            key={ft.type}
            className="btn"
            onClick={() =>
              onAdd({
                key: ft.type + "-" + Math.random().toString(36).slice(2, 8),
                type: ft.type,
                label: ft.label,
                required: false,
                options:
                  ft.type === "select" ||
                  ft.type === "radio" ||
                  ft.type === "checkbox"
                    ? ["Option 1", "Option 2"]
                    : undefined,
              })
            }
          >
            + {ft.label}
          </button>
        ))}
      </div>
    </div>
  );
}

