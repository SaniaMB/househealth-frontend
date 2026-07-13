import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle, AlertCircle, Loader, Leaf } from "lucide-react";
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
        }, 2000);
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
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-content">
          <div className="auth-logo">
            <div className="auth-logo-icon">
              <Leaf size={22} />
            </div>
            <h1 className="auth-title">
              House<span>Health</span>
            </h1>
          </div>

          <div className="auth-success">
            <Loader size={48} className="text-center mb-lg" style={{ animation: 'spin 1s linear infinite' }} />
            <h2>Verifying Email</h2>
            <p>Please wait while we verify your email address...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-content">
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <Leaf size={22} />
          </div>
          <h1 className="auth-title">
            House<span>Health</span>
          </h1>
        </div>

        <div className="auth-success">
          {success ? (
            <>
              <CheckCircle size={56} style={{ color: 'var(--hh-green)', marginBottom: '16px' }} />
              <h2>Email Verified!</h2>
              <p>{message}</p>
              <p style={{ fontSize: '0.9rem', marginTop: '8px' }}>Redirecting to dashboard...</p>
            </>
          ) : (
            <>
              <AlertCircle size={56} style={{ color: 'var(--hh-error)', marginBottom: '16px' }} />
              <h2>Verification Failed</h2>
              <p>{message}</p>
              <Link to="/login" className="primary-btn auth-submit" style={{ marginTop: '16px' }}>
                Back to Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;