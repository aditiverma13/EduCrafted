export type FieldType =
  | "text"
  | "email"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "file";

// Field interface
export interface Field {
  key: string;
  type: FieldType;
  label: string;
  required: boolean;
  options?: string[];
  placeholder?: string;      // ✅ ADDED PLACEHOLDER SUPPORT
}

// A Form document interface
export interface FormDoc {
  _id?: string;
  title: string;
  description?: string;
  status: "draft" | "published";
  settings?: {
    thankYouMessage?: string;
    submissionLimit?: number;
  };
  fields: Field[];
  createdAt?: string;
}

// A Submission document interface
export interface SubmissionDoc {
  _id: string;
  form: string;
  answers: Record<string, any>;
  files: { fieldKey: string; url: string; name?: string }[];
  createdAt: string;
}
