import React, { useEffect } from "react";
import { Hits } from "react-instantsearch-dom";
import { connectStateResults } from "react-instantsearch-dom";

import HitMrt from "../../lib/HitMrt.js";
import { useAppState, useAppStateDispatch } from "../AppContext/AppContext";
import algoliasearch from "algoliasearch";

const client = algoliasearch("GDCB38XISD", "f170736b40f37641b3bbae2c402deab9");
const indexMrt = client.initIndex("map_mrt");
const indexHdb = client.initIndex("map_hdb");
const indexSchool = client.initIndex("map_school");
const indexLrt = client.initIndex("map_lrt");

export default connectStateResults(({ searchState, searchResults }) => {
  const appState = useAppState();
  const AppStateDispatch = useAppStateDispatch();

  useEffect(() => {
    const hit = searchResults.hits[0];

    if (appState.homeMapViewState.searchQuery.searchByMrt) {
      const circleRadius = appState.homeMapViewState.selectedPinned.radius * 1000;
      var test = String(hit.LATITUDE + "," + hit.LONGTITUDE);

      indexHdb
        .search("", {
          aroundLatLng: test,

          aroundRadius: circleRadius,
          // 100km
        })
        .then(({ hits }) => {
          console.log(hits);
          AppStateDispatch({
            type: "changeMapLayer",
            layerData: {
              layerName: "icon",
              selectedHDBList: hits,
            },
          });
        });

      indexLrt
        .search("", {
          aroundLatLng: test,
          aroundRadius: circleRadius, // 100km
        })
        .then(({ hits }) => {
          console.log(hits);
          AppStateDispatch({
            type: "changeMapLayer",
            layerData: {
              layerName: "icon",
              selectedLrtList: hits,
            },
          });
        });

      indexSchool
        .search("", {
          aroundLatLng: test,
          aroundRadius: circleRadius, // 100km
        })
        .then(({ hits }) => {
          console.log(hits);
          AppStateDispatch({
            type: "changeMapLayer",
            layerData: {
              layerName: "icon",
              selectedSchoolList: hits,
            },
          });
        });

      AppStateDispatch({
        type: "changeMapLayer",
        layerData: {
          layerName: "icon",
          selectedMRTValue: hit.SEARCHVAL,
        },
      });
      AppStateDispatch({
        type: "changePinned",
        pinData: {
          isPinned: true,
          showOnlyRadius: true,
          data: {
            coordinate: [hit.LONGTITUDE, hit.LATITUDE],
          },
        },
      });
    } else {
      AppStateDispatch({
        type: "changePinned",
        pinData: {
          isPinned: false,
          data: undefined,
        },
      });
      AppStateDispatch({
        type: "changeMapLayer",
        layerData: {
          layerName: "icon",
          selectedSchoolValue: "",
          selectedMRTValue: "",
          selectedLRTValue: "",
          selectedHDBType: "building",
          selectedHDBValue: "",
        },
      });
    }
  }, [
    searchResults,
    AppStateDispatch,
    appState.homeMapViewState.selectedPinned.radius,
    appState.homeMapViewState.searchQuery
  ]);

  return searchResults && searchResults.nbHits !== 0 ? (
    <>
      <Hits hitComponent={HitMrt} />
    </>
  ) : (
    <div>
      No results found for <strong>{searchState.query}</strong>.
    </div>
  );
});