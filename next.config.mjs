/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export", // ✅ ใช้ Next.js Static Export
  basePath: isProd ? "/admin-dashboard" : "", // ✅ เปลี่ยน <repo-name> เป็นชื่อ repo ของคุณ
  assetPrefix: isProd ? "/admin-dashboard" : "",
  trailingSlash: true, // ✅ ช่วยให้เส้นทางไฟล์ทำงานถูกต้อง
};

export default nextConfig;
