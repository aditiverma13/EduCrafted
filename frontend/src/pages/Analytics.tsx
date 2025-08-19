// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { downloadCSV, fetchAnalytics, getForm } from "../lib/api";
// import type { FormDoc } from "../lib/types";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// export default function Analytics() {
//   const { id } = useParams();
//   const [form, setForm] = useState<FormDoc | null>(null);
//   const [data, setData] = useState<{ _id: string; count: number }[]>([]);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     if (!id) return;
//     getForm(id).then(setForm);
//     fetchAnalytics(id).then((d) => {
//       setData(d.submissionsByDate);
//       setTotal(d.totalSubmissions);
//     });
//   }, [id]);

//   if (!form) return <p className="p-6">Loading…</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 xl:px-8 px-4 py-6 space-y-6">
//       <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
//         <div>
//           <h2 className="text-xl font-semibold">
//             Analytics: {form.title}
//           </h2>
//           <p className="text-sm text-gray-500">
//             Total submissions: {total}
//           </p>
//         </div>
//         <button
//           onClick={() => downloadCSV(form._id!)}
//           className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
//         >
//           Export CSV
//         </button>
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow" style={{ height: 360 }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="_id" />
//             <YAxis allowDecimals={false} />
//             <Tooltip />
//             <Line type="monotone" dataKey="count" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { downloadCSV, fetchAnalytics, getForm } from "../lib/api";
import type { FormDoc } from "../lib/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const { id } = useParams();
  const [form, setForm] = useState<FormDoc | null>(null);
  const [data, setData] = useState<{ _id: string; count: number }[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!id) return;
    getForm(id).then(setForm);
    fetchAnalytics(id).then((d) => {
      setData(d.submissionsByDate);
      setTotal(d.totalSubmissions);
    });
  }, [id]);

  if (!form) return <p className="p-6">Loading…</p>;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="card flex-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Analytics: {form.title}</h2>
          <p className="text-sm text-gray">Total submissions: {total}</p>
        </div>
        <button
          onClick={() => downloadCSV(form._id!)}
          className="btn-primary"
        >
          Export CSV
        </button>
      </div>

      {/* Chart */}
      <div className="card chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

