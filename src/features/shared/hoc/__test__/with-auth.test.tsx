import { StorageUtil } from "@/lib";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { withAuth } from "../with-auth";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const MockComponent = () => <div>Protected Content</div>;

describe("withAuth HOC", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the component if token exists", () => {
    StorageUtil.getItem = vi.fn().mockReturnValue("mock-token");

    const WrappedComponent = withAuth(MockComponent);
    const { getByText } = render(
      <BrowserRouter>
        <WrappedComponent />
      </BrowserRouter>
    );

    expect(getByText("Protected Content")).toBeTruthy();
  });

});
