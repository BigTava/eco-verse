// Components
import { AuthLayout } from "components/Layouts/AuthLayout";
import { DefaultButton } from "components/Buttons/DefaultButton";
import { SelectField, TextField } from "components/Fields";
import Navigation from "./Navigation";

export default function Singup() {
  return (
    <>
      <head>
        <title>Create Community - EcoVerse</title>
      </head>
      <AuthLayout title="Create a community">
        <Navigation />
        <form>
          <div className="grid grid-cols-2 gap-6">
            <TextField
              label="First name"
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="given-name"
              required
            />
            <TextField
              label="Last name"
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="family-name"
              required
            />
            <TextField
              className="col-span-full"
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <TextField
              className="col-span-full"
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />
            <SelectField
              className="col-span-full"
              label="How did you hear about us?"
              id="referral-source"
              name="referral_source"
            >
              <option>AltaVista search</option>
              <option>Super Bowl commercial</option>
              <option>Our route 34 city bus ad</option>
              <option>The “Never Use This” podcast</option>
            </SelectField>
          </div>
          <DefaultButton type="submit" color="cyan" className="mt-8 w-full">
            Get started today
          </DefaultButton>
        </form>
      </AuthLayout>
    </>
  );
}
