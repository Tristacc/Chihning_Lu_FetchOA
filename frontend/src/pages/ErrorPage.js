import { useEffect } from "react";

const ErrorPage = () => {
  useEffect(async () => {
    try {
      const response = await fetch("/logout", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.status}`);
      }

      window.location.href = "/";
    } catch (error) {
      console.error("Error sending data:", error);
    }
  });
  return (
    <div>
      <h1>404</h1>
      <p>Please login again</p>
    </div>
  );
};
export default ErrorPage;
