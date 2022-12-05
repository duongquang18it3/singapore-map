import React from "react";
import { Hits } from "react-instantsearch-dom";
import { connectStateResults } from "react-instantsearch-dom";
import HitSchool from "../../lib/HitSchool.js";
import HitMrt from "../../lib/HitMrt.js";

export default connectStateResults(({ searchState, searchResults }) =>
  searchResults && searchResults.nbHits !== 0 ? (
    <>
      <Hits hitComponent={HitSchool}  />
      
    </>
  ) : (
    <div>
      No results found for <strong>{searchState.query}</strong>.
    </div>
  )
);
