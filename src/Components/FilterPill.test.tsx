import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterPill from "./FilterPill";

describe("FilterPill", () => {
  it("exposes pressed state via aria-pressed and fires onClick", async () => {
    const onClick = vi.fn();
    render(
      <FilterPill active={false} onClick={onClick}>
        All
      </FilterPill>,
    );

    const button = screen.getByRole("button", { name: "All" });
    expect(button).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("reflects the active state", () => {
    render(
      <FilterPill active onClick={() => {}}>
        2026
      </FilterPill>,
    );

    expect(screen.getByRole("button", { name: "2026" })).toHaveAttribute("aria-pressed", "true");
  });
});
