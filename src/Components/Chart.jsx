import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "ม.ค.", value: 400 },
  { name: "ก.พ.", value: 320 },
  { name: "มี.ค.", value: 280 },
  { name: "เม.ย.", value: 500 },
  { name: "พ.ค.", value: 350 },
  { name: "มิ.ย.", value: 420 },
  { name: "ก.ค.", value: 390 },
  { name: "ส.ค.", value: 460 },
  { name: "ก.ย.", value: 310 },
  { name: "ต.ค.", value: 470 },
  { name: "พ.ย.", value: 380 },
  { name: "ธ.ค.", value: 530 },
];
const colors = [
  "#f87171", // แดง
  "#fb923c", // ส้ม
  "#facc15", // เหลือง
  "#4ade80", // เขียวอ่อน
  "#34d399", // เขียวมิ้น
  "#60a5fa", // น้ำเงิน
  "#818cf8", // ม่วง
  "#a78bfa", // ม่วงอ่อน
  "#f472b6", // ชมพู
  "#f97316", // ส้มเข้ม
  "#14b8a6", // teal
  "#3b82f6", // น้ำเงินสด
];
export default function MyChart() {
  return (
    <ResponsiveContainer width="80%" height={400} className="ml-5">
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value">
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
