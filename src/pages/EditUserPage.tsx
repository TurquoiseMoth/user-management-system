import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/userSlice";
import type { RootState, AppDispatch } from "../store/store";
import type { User } from "../types/user";
import UserForm from "../components/UserForm";

export default function EditUserPage() {
  const { id } = useParams();
  const userId = Number(id);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) =>
    state.users.users.find((item) => item.id === userId),
  );

  if (!user) {
    return <div className="status-message">User not found.</div>;
  }

  const initialUser = {
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
    address: {
      street: user.address.street,
      suite: user.address.suite,
      city: user.address.city,
      zipcode: user.address.zipcode,
      geo: {
        lat: user.address.geo.lat,
        lng: user.address.geo.lng,
      },
    },
    company: {
      name: user.company.name,
      catchPhrase: user.company.catchPhrase,
      bs: user.company.bs,
    },
  };

  const handleSubmit = (updatedData: Omit<User, "id">) => {
    dispatch(updateUser({ id: userId, ...updatedData }));
    navigate("/users");
  };

  return (
    <section>
      <h2>Edit User</h2>
      <UserForm
        initialUser={initialUser}
        submitLabel="Save Changes"
        onSubmit={handleSubmit}
      />
    </section>
  );
}
