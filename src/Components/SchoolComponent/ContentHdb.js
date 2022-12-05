import React from "react";
import { Hits } from "react-instantsearch-dom";
import { connectStateResults } from "react-instantsearch-dom";

import HitHdb from "../../lib/HitHdb.js";

export default connectStateResults(({ searchState, searchResults }) =>
  searchResults && searchResults.nbHits !== 0 ? (
    <>
      <Hits hitComponent={HitHdb}  />
      
    </>
  ) : (
    <div>
      No results found for <strong>{searchState.query}</strong>.
    </div>
  )
);
