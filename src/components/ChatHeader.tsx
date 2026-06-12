import { useAuth0 } from "@auth0/auth0-react";
import pdfUrl from "../assets/icici-5-10.pdf";

export function ChatHeader() {
  const { user, logout } = useAuth0();

  return (
    <header className="chat-header">
      <div className="brand-section">
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2ZM17.5 22H14.5V14H17.5V22ZM17.5 11.5H14.5V8.5H17.5V11.5Z"
            fill="var(--accent)"
          />
        </svg>
        <div>
          <h1 className="brand-title">MMRag Assistant</h1>
          <span className="brand-subtitle">ICICI Bank Q&A</span>
        </div>
      </div>

      <div className="header-actions">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="view-pdf-btn"
          title="Open the source PDF file in a new tab"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "6px" }}
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
          Source PDF
        </a>

        {user && (
          <div className="user-profile-badge">
            {user.picture && (
              <img
                className="user-avatar"
                src={user.picture}
                alt={user.name}
              />
            )}
            <span className="user-name" title={user.email}>
              {user.name || user.email}
            </span>
          </div>
        )}
        <button
          className="logout-btn"
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: window.location.origin,
              },
            })
          }
        >
          Logout
        </button>
      </div>
    </header>
  );
}
