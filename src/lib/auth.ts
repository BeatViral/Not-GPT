import { headers } from "next/headers";

export function hasAdminToken(requestHeaders: Headers) {
  const configured = process.env.ADMIN_API_TOKEN;
  const auth = requestHeaders.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice("Bearer ".length) : null;

  if (configured && token && token === configured) {
    return true;
  }

  return process.env.DEMO_ADMIN_ACCESS === "true" && requestHeaders.get("x-demo-admin") === "true";
}

export function canRenderAdminTools() {
  const h = headers();
  const cookie = h.get("cookie") ?? "";
  return (
    process.env.DEMO_ADMIN_ACCESS === "true" ||
    Boolean(process.env.ADMIN_API_TOKEN && cookie.includes("notgpt_admin=1"))
  );
}
