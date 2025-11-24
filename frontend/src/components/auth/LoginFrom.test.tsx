import { test, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import LoginForm from "./LoginForm"

const mockConnectWithEmail = vi.fn()
const mockVerifyOneTimePassword = vi.fn()

vi.mock('@dynamic-labs/sdk-react-core', () => ({
  useConnectWithOtp: () => ({
    connectWithEmail: mockConnectWithEmail,
    verifyOneTimePassword: mockVerifyOneTimePassword
  })
}))

test("renders login form", () => {
  render(<LoginForm />)
  expect(screen.getByText("Log in or sign up")).toBeTruthy()
  expect(screen.getByPlaceholderText("Enter your email")).toBeTruthy()
  expect(screen.getByText("Continue")).toBeTruthy()
})

test("email input accepts text", () => {
  render(<LoginForm />)
  const emailInput = screen.getByPlaceholderText("Enter your email") as HTMLInputElement
  fireEvent.change(emailInput, { target: { value: "test@example.com" } })
  expect(emailInput.value).toBe("test@example.com")
})

test("shows OTP form after email submission", async () => {
  mockConnectWithEmail.mockResolvedValue(undefined)
  render(<LoginForm />)
  
  const emailInput = screen.getByPlaceholderText("Enter your email")
  const submitButton = screen.getByText("Continue")
  
  fireEvent.change(emailInput, { target: { value: "test@example.com" } })
  fireEvent.click(submitButton)
  
  await screen.findByText("Enter OTP")
  expect(screen.getByText("Enter OTP")).toBeTruthy()
  expect(screen.getByText("Verify OTP")).toBeTruthy()
})

test("handles email submission error", async () => {
  mockConnectWithEmail.mockRejectedValue(new Error("Email error"))
  render(<LoginForm />)
  
  const emailInput = screen.getByPlaceholderText("Enter your email")
  const submitButton = screen.getByText("Continue")
  
  fireEvent.change(emailInput, { target: { value: "test@example.com" } })
  fireEvent.click(submitButton)
  
  await screen.findByText("Email error")
  expect(screen.getByText("Email error")).toBeTruthy()
})
