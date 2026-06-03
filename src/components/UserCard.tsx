import { Link } from "react-router-dom";
import type { User } from "../types/user";

interface Props {
  user: User;
  onDelete: (id: number) => void;
}

export default function UserCard({ user, onDelete }: Props) {
  return (
    <article className="card">
      <div className="card-content">
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
      <div className="card-buttons">
        <Link to={`/users/${user.id}`} className="btn small-btn">
          Details
        </Link>
        <Link
          to={`/edit-user/${user.id}`}
          className="btn small-btn secondary-btn"
        >
          Edit
        </Link>
        <button
          type="button"
          className="btn danger-btn small-btn"
          onClick={() => onDelete(user.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
