import { Link } from "react-router-dom";
import UserList from "../components/UserList";

export default function UsersPage() {
  return (
    <section>
      <div className="top">
        <h2 className="title">All Users</h2>
        <div className="actions">
          <Link to="/users" className="btn">
            Users
          </Link>
          <Link to="/add-user" className="btn secondary-btn outline">
            Add User
          </Link>
        </div>
      </div>
      <UserList />
    </section>
  );
}
