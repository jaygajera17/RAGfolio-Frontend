import { useState, useRef, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import pdfUrl from "../assets/icici-fund-factsheet-for-may-2026.pdf";

export function ChatHeader() {
  const { user, logout } = useAuth0();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="chat-header">
      <div className="brand-section">
        <div className="brand-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <path d="M9 15l2 2 4-4"></path>
          </svg>
        </div>
        <div>
          <h1 className="brand-title">RAGfolio</h1>
          <span className="brand-subtitle">Mutual Fund RAG</span>
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <span>Source PDF</span>
        </a>

        {user && (
          <div className="dropdown-container" ref={dropdownRef}>
            <button
              className="dropdown-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.picture && (
                <img
                  className="user-avatar"
                  src={user.picture}
                  alt={user.name}
                />
              )}
              <span className="user-name">
                {(user.name || user.email || "").split(" ")[0]}
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
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
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
