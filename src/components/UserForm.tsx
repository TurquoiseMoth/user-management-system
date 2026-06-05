import { useState } from "react";
import type { FormEvent } from "react";
import type { User } from "../types/user";

interface UserFormProps {
  initialUser?: Omit<User, "id">;
  submitLabel: string;
  onSubmit: (user: Omit<User, "id">) => void;
}

const emptyUser: Omit<User, "id"> = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};

export default function UserForm({
  initialUser,
  submitLabel,
  onSubmit,
}: UserFormProps) {
  const [formData, setFormData] = useState<Omit<User, "id">>(
    () => initialUser ?? emptyUser,
  );

  const handleFieldChange = (field: keyof Omit<User, "id">, value: string) => {
    if (["name", "username", "email", "phone", "website"].includes(field)) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleAddressChange = (field: keyof User["address"], value: string) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [field]: value,
      },
    });
  };

  const handleGeoChange = (field: "lat" | "lng", value: string) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        geo: {
          ...formData.address.geo,
          [field]: value,
        },
      },
    });
  };

  const handleCompanyChange = (field: keyof User["company"], value: string) => {
    setFormData({
      ...formData,
      company: {
        ...formData.company,
        [field]: value,
      },
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          value={formData.name}
          onChange={(event) => handleFieldChange("name", event.target.value)}
          required
        />
      </label>

      <label>
        Username
        <input
          type="text"
          value={formData.username}
          onChange={(event) =>
            handleFieldChange("username", event.target.value)
          }
          required
        />
      </label>

      <label>
        Email
        <input
          type="email"
          value={formData.email}
          onChange={(event) => handleFieldChange("email", event.target.value)}
          required
        />
      </label>

      <label>
        Phone
        <input
          type="tel"
          value={formData.phone}
          onChange={(event) => handleFieldChange("phone", event.target.value)}
        />
      </label>

      <label>
        Website
        <input
          type="url"
          value={formData.website}
          onChange={(event) => handleFieldChange("website", event.target.value)}
        />
      </label>

      <fieldset>
        <legend>Company</legend>
        <label>
          Company Name
          <input
            type="text"
            value={formData.company.name}
            onChange={(event) =>
              handleCompanyChange("name", event.target.value)
            }
          />
        </label>
        <label>
          Catchphrase
          <input
            type="text"
            value={formData.company.catchPhrase}
            onChange={(event) =>
              handleCompanyChange("catchPhrase", event.target.value)
            }
          />
        </label>
        <label>
          BS
          <input
            type="text"
            value={formData.company.bs}
            onChange={(event) => handleCompanyChange("bs", event.target.value)}
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Address</legend>
        <label>
          Street
          <input
            type="text"
            value={formData.address.street}
            onChange={(event) =>
              handleAddressChange("street", event.target.value)
            }
            required
          />
        </label>
        <label>
          Suite
          <input
            type="text"
            value={formData.address.suite}
            onChange={(event) =>
              handleAddressChange("suite", event.target.value)
            }
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={formData.address.city}
            onChange={(event) =>
              handleAddressChange("city", event.target.value)
            }
            required
          />
        </label>
        <label>
          Zipcode
          <input
            type="text"
            value={formData.address.zipcode}
            onChange={(event) =>
              handleAddressChange("zipcode", event.target.value)
            }
            required
          />
        </label>

        <fieldset>
          <legend>Geo Coordinates</legend>
          <label>
            Latitude
            <input
              type="text"
              value={formData.address.geo.lat}
              onChange={(event) => handleGeoChange("lat", event.target.value)}
            />
          </label>
          <label>
            Longitude
            <input
              type="text"
              value={formData.address.geo.lng}
              onChange={(event) => handleGeoChange("lng", event.target.value)}
            />
          </label>
        </fieldset>
      </fieldset>

      <button type="submit" className="btn primary-btn">
        {submitLabel}
      </button>
    </form>
  );
}
