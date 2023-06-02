// Components
import Container from "components/Container";
import CampaignContainer from "pages/ListCampaigns/Container";
import ListCampaignsNav from "pages/ListCampaigns/Nav";

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

const ListCampaigns = () => {
  return (
    <div className="overflow-hidden py-20 sm:py-8 lg:pb-32 xl:pb-36">
      <Container>
        <ListCampaignsNav />
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {people.map((person) => (
            <CampaignContainer key={person.email} {...person} />
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default ListCampaigns;
