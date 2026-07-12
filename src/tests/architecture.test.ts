import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function readFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? readFiles(full) : [full];
  });
}

describe("architecture separation", () => {
  it("NOT GPT services do not import GOO services", () => {
    const files = readFiles(join(process.cwd(), "src", "services", "not-gpt"));
    const offenders = files.filter((file) => readFileSync(file, "utf8").includes("@/services/goo"));

    expect(offenders).toEqual([]);
  });

  it("answer service files contain no GOO project metadata", () => {
    const files = readFiles(join(process.cwd(), "src", "services", "not-gpt"));
    const text = files.map((file) => readFileSync(file, "utf8")).join("\n");

    expect(text).not.toContain("Truth Sachet");
    expect(text).not.toContain("31 Seats");
    expect(text).not.toContain("Reverse Car Market");
    expect(text).not.toContain("Law On Demand");
  });

  it("experimental GOO hook is disabled by default", () => {
    expect(process.env.ENABLE_GOO_TO_NOTGPT_HOOK).not.toBe("true");
  });
});
