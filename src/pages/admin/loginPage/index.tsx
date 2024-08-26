import React, { useState, useEffect } from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useFetch } from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { loadUserToken, saveUserToken } from "../../../store/localStore";

const AdminLoginPage: React.FC = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // State for remember me
  const navigate = useNavigate();

  // Using the custom hook
  const [loginState, fetchLogin] = useFetch<{ token: string }>(
    "https://dummyjson.com/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
  );

  // Check for token in localStorage on mount
  useEffect(() => {
    const token = loadUserToken();
    if (token) {
      // If token exists, redirect to admin-dashboard
      navigate("/admin-dashboard");
    }

    // Load saved username from localStorage if Remember Me was previously selected
    const savedUsername = localStorage.getItem("rememberedUsername");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Call the custom hook's fetch function
    fetchLogin({
      username: username,
      password: password,
      expiresInMins: 30,
    });
  };

  // Handle successful login and errors
  useEffect(() => {
    if (loginState.data && loginState.data.token) {
      // Store token in localStorage for persistent login
      saveUserToken(loginState.data.token);

      // Store username if remember me is checked
      if (rememberMe) {
        localStorage.setItem("rememberedUsername", username);
      } else {
        localStorage.removeItem("rememberedUsername");
      }

      // Redirect to admin-dashboard on successful login
      navigate("/admin-dashboard");
    }
  }, [loginState.data, rememberMe, username, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-lg">
        {" "}
        {/* Increased width */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Your username" />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="ex.emilys"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit" disabled={loginState.loading}>
            {loginState.loading ? "Logging in..." : "Submit"}
          </Button>
          {loginState.error && (
            <p className="text-red-500">{loginState.error}</p>
          )}
        </form>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
