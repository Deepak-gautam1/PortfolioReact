import { describe, expect, it } from "vitest";
import { mapCalendarToWeeks } from "@/lib/githubContributions";

describe("mapCalendarToWeeks", () => {
  it("maps GraphQL contribution levels to numeric levels 0-4", () => {
    const calendar = {
      totalContributions: 3,
      weeks: [
        {
          contributionDays: [
            { contributionCount: 0, date: "2026-01-01", contributionLevel: "NONE" },
            { contributionCount: 1, date: "2026-01-02", contributionLevel: "FIRST_QUARTILE" },
            { contributionCount: 2, date: "2026-01-03", contributionLevel: "SECOND_QUARTILE" },
            { contributionCount: 3, date: "2026-01-04", contributionLevel: "THIRD_QUARTILE" },
            { contributionCount: 4, date: "2026-01-05", contributionLevel: "FOURTH_QUARTILE" },
          ],
        },
      ],
    };

    const weeks = mapCalendarToWeeks(calendar);

    expect(weeks).toHaveLength(1);
    expect(weeks[0].map((d) => d.level)).toEqual([0, 1, 2, 3, 4]);
    expect(weeks[0][2]).toEqual({ date: "2026-01-03", count: 2, level: 2 });
  });

  it("falls back to level 0 for an unrecognized level string", () => {
    const calendar = {
      totalContributions: 0,
      weeks: [
        {
          contributionDays: [
            { contributionCount: 0, date: "2026-01-01", contributionLevel: "UNKNOWN" },
          ],
        },
      ],
    };

    expect(mapCalendarToWeeks(calendar)[0][0].level).toBe(0);
  });
});
