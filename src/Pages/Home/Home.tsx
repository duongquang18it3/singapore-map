import App from "../../App/App";
import { HeaderProps } from "../../Components/AppHeader/AppHeader";
import { Map } from "../../Components/Map/Map";
import {
  InstantSearch,
  Hits,
  Configure,
  RefinementList,
  SearchBox,
} from "react-instantsearch-dom";
import { GeoHit } from "../../types/SchoolHit";
import Content from "../../Components/SchoolComponent/ContentSchool";
import { useCallback, useState } from "react";
import { indexNameSchool, searchClient } from "../../lib/algoliaClient";
import SchoolComponent from "../../Components/SchoolComponent/SchoolComponent";
export function Home(): JSX.Element {
  const headerProps: HeaderProps = {
    colorType: "is-dark",
  };
  const [currentSchool, setCurrentSchool] = useState<GeoHit | null>(null);
  const [searchKey, setSearchKey] = useState<string>("");
  const handleChangeSearchKey = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value !== undefined && e.target.value !== searchKey) {
        setSearchKey(e.target.value);
      }
    },
    [searchKey]
  );
  // const [indexName, setIndexName] = useState
  return (
    <>
      {/* <div className="select is-rounded">
            <select onChange={handleChangeSearchKey}>
              <option value={"map_school"}>School</option>
              <option value={"map_mrt"}>MRT</option>
              <option value={"map_lrt"}>LRT</option>
              <option value={"map_hdb"}>HDB</option>
            </select>
          </div> */}
      <App headerProps={headerProps}>
        <Map />
          
        
      </App>
    </>
  );
}
