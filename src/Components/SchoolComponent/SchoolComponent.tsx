import { ReactComponent as ShopCenter } from "../../assets/shop-center.svg";
import React, { useEffect, useState } from "react";
import { GeoHit } from "../../types/SchoolHit";

const SchoolComponent = ({
  school,
  onClick,
  currentSchool,
}: {
  school: GeoHit;
  onClick: (store: GeoHit) => void;
  currentSchool?: GeoHit | null;
}): JSX.Element => {
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(currentSchool?.objectID === school.objectID);
  }, [currentSchool]);
  console.log(school.ROAD_NAME);

  return (
    <article
      className={`${
        isSelected
          ? "column is-3 has-background-white"
          : "column is-3 has-background-grey-light"
      } `}
      onClick={() => onClick(school)}
    >
      {/* <ShopCenter className={'w-8 stroke-current text-purple-800'} /> */}
      <div className="column">
        <h2 className={"title is-4"}>Schools:{school.SEARCHVAL}</h2>
        <p className={"subtitle is-5"}>Road name:{school.ROAD_NAME}</p>
        <p className={"subtitle is-5"}>Address{school.ADDRESS}</p>
        <p className={"subtitle is-5"}>Lat:{school.LATITUDE}</p>
        <p className={"subtitle is-5"}>Long:{school.LONGTITUDE}</p>
      </div>
    </article>
  );
};

export default SchoolComponent;
