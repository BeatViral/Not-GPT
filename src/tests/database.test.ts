import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("database migration", () => {
  const sql = readFileSync(join(process.cwd(), "supabase", "migrations", "001_initial_schema.sql"), "utf8");

  it("creates required product tables", () => {
    for (const table of [
      "profiles",
      "investigations",
      "sources",
      "claim_clusters",
      "projects",
      "opportunities",
      "opportunity_interests",
      "goo_match_runs",
      "audit_events"
    ]) {
      expect(sql).toContain(`create table public.${table}`);
    }
  });

  it("enables row level security", () => {
    expect(sql.match(/enable row level security/g)?.length).toBeGreaterThanOrEqual(9);
  });

  it("defines public read boundaries for published GOO records and public reports", () => {
    expect(sql).toContain("published open opportunities public read");
    expect(sql).toContain("investigations owner or public read");
  });
});
