// Components
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import DetailCard from "./DetailCard";
import Description from "./Description";

type CampaignContainerProps = {
  email: string;
  imageUrl: string;
  name: string;
  title: string;
  role: string;
  telephone: string;
};

const CrowdloanCard = (props: CampaignContainerProps) => {
  return (
    <li
      key={props.email}
      className="divide-y divide-gray-200 rounded-lg bg-white p-4 text-center shadow"
    >
      <Description title="EcoDAO" location="Porto, Porto" />
      <div className="flex flex-row space-x-2 py-4">
        <DetailCard label="Activation Date" value={"2022-01-01"} />
        <DetailCard label="Expiration Date" value={"2022-01-01"} />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a
              href={`mailto:${props.email}`}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <EnvelopeIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Email
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a
              href={`tel:${props.telephone}`}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              Call
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CrowdloanCard;
