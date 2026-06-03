import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import type { AppDispatch } from "../store/store";
import type { User } from "../types/user";
import UserForm from "../components/UserForm";

export default function AddUserPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (userData: Omit<User, "id">) => {
    dispatch(addUser(userData));
    navigate("/users");
  };

  return (
    <section>
      <h2>Add New User</h2>
      <UserForm submitLabel="Add User" onSubmit={handleSubmit} />
    </section>
  );
}
