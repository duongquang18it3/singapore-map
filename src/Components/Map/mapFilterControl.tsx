import { useCallback, useEffect, useState } from "react";
import { Configure, InstantSearch, SearchBox } from "react-instantsearch-dom";
import { indexNameSchool, searchClient } from "../../lib/algoliaClient";
import { useAppStateDispatch } from "../AppContext/AppContext";
import Content from "../SchoolComponent/ContentSchool";
import CustomSearchBox from '../Search/CustomSearchBox';
import { Search } from "../Search/searchInput";
import { SelectBuildingByDistrict } from "./mapFilters/SelectBuildingByDistrict";
import { SelectSingaporeBoundaryByArea } from "./mapFilters/SelectSingaporeBoundaryByArea";
import { SelectSingaporeBoundaryByRegion } from "./mapFilters/SelectSingaporeBoundaryByRegion";
import { SelectSingaporeBoundaryByZone } from "./mapFilters/SelectSingaporeBoundaryByZone";
import { SelectSingaporeHDB } from "./mapFilters/SelectSingaporeHDB";
import { SelectSingaporeLrt } from "./mapFilters/SelectSingaporeLrt";
import { SelectSingaporeMrt } from "./mapFilters/SelectSingaporeMrt";
import { SelectSingaporeProperties } from "./mapFilters/selectSingaporeProperties";
import { SelectSingaporeSchool } from "./mapFilters/SelectSingaporeSchool";
import "./mapLayers/mapFilterControl.css";
export const MapFilterControl = (): JSX.Element => {
  const AppStateDispatch = useAppStateDispatch();

  const [hideDropdown, setHideDropdown] = useState<boolean>(true);
  const [hideCheck, setHideCheck] = useState<boolean>(true);
  const [searchKey, setSearchKey] = useState<string>("");

  const handleChangeSearchKey = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value !== undefined && e.target.value !== searchKey) {
        setSearchKey(e.target.value);
      }
    },
    [searchKey]
  );

  const handleSearch = useCallback(() => {
    console.log(`do search with ${searchKey}`);

    AppStateDispatch({
      type: "changeSearchKey",
      searchKey: searchKey,
    });
  }, [searchKey, AppStateDispatch]);

  useEffect(() => {
    console.log(`changed searchKey to: ${searchKey}`);
  }, [searchKey]);

  return (
    <>
      <div className="column">
        <div className="column">
          {/* <div className="field has-addons">
            <div className="control is-expanded">
              <Search
                inputPlaceholder="input name to search"
                searchKey={searchKey}
                handleChangeSearchKey={handleChangeSearchKey}
                minLength={2}
                // hasDebounce={false}
              />
            </div>
            <div className="control">
              <button
                className="button is-info is-rounded"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div> */}
        </div>

        <div className="columns">
          <div className="column">
            <div className="box p-2">
              <button
                className="button is-outlined"
                onClick={() => setHideDropdown(!hideDropdown)}
              >
                {`${hideDropdown ? "Show" : "Hide"} dropdown filters`}
              </button>
              {!hideDropdown && (
                <div className="columns">
                  <div className="column is-narrow">
                    <p className="title mb-0">Boundary</p>
                    <div className="column pb-0">
                      <SelectSingaporeBoundaryByRegion />
                    </div>
                    <div className="column pb-0">
                      <SelectSingaporeBoundaryByArea />
                    </div>
                    <div className="column pb-0">
                      <SelectSingaporeBoundaryByZone />
                    </div>
                  </div>
                  <div className="column">
                    <p className="title mb-0">Facilities</p>
                    <div className="column pb-0">
                      <SelectBuildingByDistrict />
                    </div>
                    <div className="column pb-0">
                      <SelectSingaporeHDB />
                    </div>
                    <div className="column pb-0">
                      <SelectSingaporeSchool />
                    </div>
                    <div className="column pb-0">
                      <SelectSingaporeMrt />
                    </div>
                    <div className="column pb-0">
                      <SelectSingaporeLrt />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="column is-3">
            <div className="box p-2">
              <button
                className="button is-outlined"
                onClick={() => setHideCheck(!hideCheck)}
              >
                {`${hideCheck ? "Show" : "Hide"} checkbox filters`}
              </button>
              {!hideCheck && (
                <div className="column">
                  <SelectSingaporeProperties />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="column is-mobile ">
          <div className="column">
            {/* <SearchBox
              className=""
              translations={{
                placeholder: "Search schools by name, address, road name",
              }}
            /> */}
            <CustomSearchBox></CustomSearchBox>
          </div>
        </div>
      </div>
    </>
  );
};
