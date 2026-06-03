import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../store/userSlice";
import type { RootState, AppDispatch } from "../store/store";
import UserCard from "./UserCard";

export default function UserList() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  if (loading) {
    return <div className="status-message">Loading users...</div>;
  }

  if (error) {
    return (
      <div className="status-message status-message--error">Error: {error}</div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="status-message">
        No users found. Add a user to get started.
      </div>
    );
  }

  return (
    <div className="cards">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onDelete={(id) => dispatch(deleteUser(id))}
        />
      ))}
    </div>
  );
}
