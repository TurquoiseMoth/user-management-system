import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function UserDetailsPage() {
  const { id } = useParams();
  const userId = Number(id);
  const user = useSelector((state: RootState) =>
    state.users.users.find((item) => item.id === userId),
  );

  if (!user) {
    return <div className="status-message">User not found.</div>;
  }

  return (
    <section>
      <h2>{user.name}</h2>

      <div className="details-section">
        <h3>Contact Information</h3>
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
      </div>

      <div className="details-section">
        <h3>Company</h3>
        <p>
          <strong>Name:</strong> {user.company.name}
        </p>
        <p>
          <strong>Catchphrase:</strong> {user.company.catchPhrase}
        </p>
        <p>
          <strong>BS:</strong> {user.company.bs}
        </p>
      </div>

      <div className="details-section">
        <h3>Address</h3>
        <p>
          <strong>Street:</strong> {user.address.street}
        </p>
        <p>
          <strong>Suite:</strong> {user.address.suite}
        </p>
        <p>
          <strong>City:</strong> {user.address.city}
        </p>
        <p>
          <strong>Zipcode:</strong> {user.address.zipcode}
        </p>
        <p>
          <strong>Latitude:</strong> {user.address.geo.lat}
        </p>
        <p>
          <strong>Longitude:</strong> {user.address.geo.lng}
        </p>
      </div>

      <div className="actions">
        <Link to="/users" className="btn">
          Back to Users
        </Link>
        <Link to={`/edit-user/${user.id}`} className="btn secondary-btn">
          Edit User
        </Link>
      </div>
    </section>
  );
}
