import {
  Building2,
  Castle,
  Church,
  Landmark,
  Mountain,
  Palmtree,
  TentTree,
  TreePine,
  Trees,
  Waves
} from "lucide-react";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

const landmarkIcons = [Landmark, Church, TentTree, Castle, Mountain, Palmtree, Building2, Trees, TreePine, Landmark, Church, Waves];

function StateItems({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="india-states-list" aria-label={duplicate ? undefined : "States we deliver to"} aria-hidden={duplicate || undefined}>
      {states.map((state, index) => {
        const LandmarkIcon = landmarkIcons[index % landmarkIcons.length];

        return (
          <li key={state} className="india-state-card">
            <span className="india-state-icon" aria-hidden="true">
              <LandmarkIcon className="size-8 stroke-[1.15]" />
            </span>
            <span>{state}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function IndiaStatesMarquee() {
  return (
    <section className="border-b border-ink/10 bg-[#fcf7ee] py-7 dark:border-white/10 dark:bg-[#0e0d0b]" aria-labelledby="india-delivery-title">
      <div className="container-luxe">
        <div className="mb-4 flex flex-col gap-1 text-center sm:mb-5">
          <p className="eyebrow">PRECEA ACROSS INDIA</p>
          <h2 id="india-delivery-title" className="font-serif text-2xl font-semibold sm:text-3xl">
            Delivering luxury to every corner of India
          </h2>
        </div>

        <div className="india-states-marquee" tabIndex={0}>
          <div className="india-states-track">
            <StateItems />
            <StateItems duplicate />
          </div>
        </div>
      </div>
    </section>
  );
}
