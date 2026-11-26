import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@/Components/providers/ThemeProvider";
import Navigation from "./Navigation";

const renderNav = () =>
  render(
    <MemoryRouter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navigation chatOpen={false} onToggleChat={() => {}} />
      </ThemeProvider>
    </MemoryRouter>,
  );

// Vitest runs without globals, so Testing Library can't register its own cleanup.
afterEach(cleanup);

describe("Navigation", () => {
  it("renders the logo and every nav item", () => {
    renderNav();

    expect(screen.getByText("DG")).toBeInTheDocument();
    ["Home", "About", "Experience", "Projects", "Skills", "Certifications", "Contact"].forEach(
      (name) => {
        expect(screen.getAllByText(name).length).toBeGreaterThan(0);
      },
    );
  });

  it("underlines the section in view, even when sections mount after the nav", async () => {
    renderNav();
    // On the real page sections are lazy-loaded, so they only exist after the nav mounts.
    // Certifications sits where a tab click lands it; GitHub starts just below it.
    const tops = { about: -2000, skills: -600, certifications: 64, github: 363 };
    const sections = Object.entries(tops).map(([id, top]) => {
      const el = document.createElement("section");
      el.id = id;
      el.getBoundingClientRect = () => ({ top }) as DOMRect;
      document.body.appendChild(el);
      return el;
    });

    await act(async () => {
      window.dispatchEvent(new Event("scroll"));
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    const underlined = screen.getAllByRole("link").filter((link) => link.querySelector("span"));
    expect(underlined.map((link) => link.textContent)).toEqual(["Certifications"]);
    sections.forEach((el) => el.remove());
  });
});
