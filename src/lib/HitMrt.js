import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Highlight } from "react-instantsearch-dom";
import {
  useAppState,
  useAppStateDispatch,
} from "../Components/AppContext/AppContext";
import { MdLocationOn, MdOutlineSubway, MdSchool } from "react-icons/md";
import { indexName } from "./algoliaClient";

import algoliasearch from "algoliasearch";
const client = algoliasearch("YCPEDH9ZMW", "ae3078d9604f25ccd2a7e3bd0e28ac4a");
const indexMrt = client.initIndex("map_mrt");
const indexHdb = client.initIndex("map_hdb");
const indexSchool = client.initIndex("map_school");
const indexLrt = client.initIndex("map_lrt");

// Connect and authenticate with your Algolia app

const HitMrt = ({ hit }) => {
  const appState = useAppState();
  const AppStateDispatch = useAppStateDispatch();
  const handleSelectedBoundaryMRT = useCallback(() => {
    const circleRadius = appState.homeMapViewState.selectedPinned.radius * 1000;
    var test = String(hit.LATITUDE + "," + hit.LONGTITUDE);
    // indexMrt
    //   .search("", {
    //     aroundLatLng: test,
    //     aroundRadius: 1000, // 100km
    //   })
    //   .then(({ hits }) => {
    //     console.log(hits);
    //     AppStateDispatch({
    //       type: "changeMapLayer",
    //       layerData: {
    //         layerName: "icon",
    //         selectedMRTList: hits,
    //       },
    //     });
    //   });
    indexHdb
      .search("", {
        aroundLatLng: test,

        aroundRadius: circleRadius,
        // 100km
      })
      .then(({ hits }) => {
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
  }, [AppStateDispatch]);

  return (
    <div className="box has-text-left">
      <div className="is-clickable " onClick={handleSelectedBoundaryMRT}>
        <div className="columns is-vcentered is-mobile">
          <div className="is-narrow pt-1">
            <MdOutlineSubway color="hsl(348, 100%, 61%)" />
          </div>
          <div className="ml-2">
            <span className="title is-7 has-text-info has-text-weight-bold ">
              <Highlight attribute="SEARCHVAL" hit={hit} />{" "}
            </span>
          </div>
        </div>
        <div className="columns is-mobile">
          <div className="is-narrow ">
            <MdLocationOn color="hsl(141, 71%, 48%)" />
          </div>
          <div className="ml-2">
            <span className="subtitle is-7 is-italic">
              <Highlight attribute="ADDRESS" hit={hit} />{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

HitMrt.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default HitMrt;
