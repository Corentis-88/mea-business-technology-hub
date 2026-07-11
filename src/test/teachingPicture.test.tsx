import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TeachingPicture } from "../components/TeachingPicture";

describe("TeachingPicture", () => {
  it("presents the picture, teaching caption and focal points accessibly", () => {
    render(<TeachingPicture picture={{
      src: "images/example.webp",
      alt: "A learner compares two products.",
      title: "See the choice",
      caption: "Customers weigh price and quality.",
      focalPoints: ["Price affects affordability", "Quality affects satisfaction"],
    }} />);

    expect(screen.getByRole("img", { name: "A learner compares two products." })).toHaveAttribute("loading", "lazy");
    expect(screen.getByText("Customers weigh price and quality.")).toBeInTheDocument();
    expect(screen.getByText("Price affects affordability")).toBeInTheDocument();
  });
});
