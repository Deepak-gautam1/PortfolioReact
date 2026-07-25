import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@/Components/providers/ThemeProvider";
import Navigation from "./Navigation";

describe("Navigation", () => {
  it("renders the logo and every nav item", () => {
    render(
      <MemoryRouter>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText("DG")).toBeInTheDocument();
    ["Home", "About", "Experience", "Projects", "Skills", "Contact"].forEach((name) => {
      expect(screen.getAllByText(name).length).toBeGreaterThan(0);
    });
  });
});
