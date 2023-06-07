// Core
import { useNavigate } from "react-router-dom";

// Components
import Container from "components/Container";
import CampaignContainer from "pages/ListCrowdloans/Container";

const people = [
  {
    name: "Jane Cooper",
    title: "Paradigm Representative",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

export default function ListCrowdloans() {
  const navigate = useNavigate();
  return (
    <main className="lg:pl-72">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Crowdlending Campaigns
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the crowdloans in the community
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => navigate("/new-crowdloan")}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            New Crowdloan
          </button>
        </div>
      </div>
      <Container>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {people.map((person) => (
            <CampaignContainer key={person.email} {...person} />
          ))}
        </ul>
      </Container>
    </main>
  );
}
