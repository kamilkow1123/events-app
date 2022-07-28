import { validateEmail } from "./validators";

describe("validateEmail", () => {
  test("valid email", () => {
    expect(validateEmail("test@test.com")).toBe(true);
  });

  test("invalid email", () => {
    expect(validateEmail("testtest.com")).toBe(false);
  });
});
