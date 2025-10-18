import { useUsersStore } from "../../store/useUsersStore";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./user-card.css";
import type { User } from "../../types/user";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const { archiveUser, hideUser, archived, unarchiveUser } = useUsersStore();
  const [buttonsExpanded, setButtonsExpanded] = useState(false);
  const isArchived = archived.includes(user.id);
  const navigate = useNavigate();
  const { username, address, company } = user;
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setButtonsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onEdit = () => {
    setButtonsExpanded(false);
    navigate(`/edit/${user.id}`);
  };

  const onArchive = () => {
    archiveUser(user.id);
    setButtonsExpanded(false);
  };

  const onUnarchive = () => {
    unarchiveUser(user.id);
    setButtonsExpanded(false);
  };

  const onHide = () => {
    hideUser(user.id);
    setButtonsExpanded(false);
  };

  return (
    <div className={`user-card ${isArchived ? "archived" : ""}`}>
      <div className="user-img-block">
        <img
          className="user-img"
          src="https://i.pravatar.cc/100"
          alt={user.username}
        />
      </div>
      <div className="user-info-block">
        <svg
          onClick={() => setButtonsExpanded((prev) => !prev)}
          className="user-info-icon"
          width="4"
          height="16"
          viewBox="0 0 4 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12C0.9 12 0 12.9 0 14ZM0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2ZM0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6C0.9 6 0 6.9 0 8Z"
            fill="#161616"
          />
        </svg>
        <p className="user-info-username">{username}</p>
        <p className="user-info-company-name">{company.name}</p>
        <p className="user-info-city-name">{address.city}</p>
      </div>
      {buttonsExpanded && (
        <div className="user-card__dropdown-block" ref={dropdownRef}>
          {!isArchived ? (
            <>
              <button className="user-card__dropdown-button" onClick={onEdit}>
                Редактировать
              </button>
              <button
                className="user-card__dropdown-button"
                onClick={onArchive}
              >
                Архивировать
              </button>
              <button className="user-card__dropdown-button" onClick={onHide}>
                Скрыть
              </button>
            </>
          ) : (
            <button
              className="user-card__dropdown-button"
              onClick={onUnarchive}
            >
              Активировать
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
