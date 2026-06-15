import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setLoading(false);
        setMessage("Verification token is missing.");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/verify",
          {
            token,
          }
        );

        localStorage.setItem(
          "token",
          response.data.token
        );

        setSuccess(true);
        setMessage(
          response.data.message
        );

        setTimeout(() => {
          navigate("/feed");
        }, 1500);
      } catch (error) {
        setSuccess(false);

        if (error.response?.data?.message) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Failed to verify email.");
        }
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams]);

  if (loading) {
    return (
      <div>
        <h2>Verifying your email...</h2>
      </div>
    );
  }

  return (
    <div>
      {success ? (
        <>
          <h2>Email Verified ✅</h2>
          <p>{message}</p>
        </>
      ) : (
        <>
          <h2>Verification Failed ❌</h2>
          <p>{message}</p>
        </>
      )}
    </div>
  );
}

export default VerifyEmailPage;