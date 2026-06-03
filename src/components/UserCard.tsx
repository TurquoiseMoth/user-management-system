import { Link } from "react-router-dom";
import type { User } from "../types/user";

interface Props {
  user: User;
  onDelete: (id: number) => void;
}

export default function UserCard({ user, onDelete }: Props) {
  return (
    <article className="user-card">
      <div className="user-card__content">
        <h2>{user.name}</h2>
        <p>
          <strong>Username:</strong> @{user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Website:</strong> {user.website}
        </p>
        <p>
          <strong>Company:</strong> {user.company.name}
        </p>
        <p>
          <strong>Address:</strong> {user.address.street}, {user.address.suite},{" "}
          {user.address.city} {user.address.zipcode}
        </p>
      </div>
      <div className="user-card__actions">
        <Link to={`/users/${user.id}`} className="button button--small">
          Details
        </Link>
        <Link
          to={`/edit-user/${user.id}`}
          className="button button--small button--secondary"
        >
          Edit
        </Link>
        <button
          type="button"
          className="button button--danger button--small"
          onClick={() => onDelete(user.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
