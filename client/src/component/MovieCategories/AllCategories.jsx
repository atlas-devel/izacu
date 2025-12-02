import React from "react";
import Popular from "./Popular";
import Recent from "./Recent";
import Explore from "./Explore";

const AllCategories = () => {
  return (
    <section>
      <Recent type={"Recent"} />
      <Popular type={"Popular"} />
      {/* add paginations for all movies */}
      <Explore type={"Explore"} />
    </section>
  );
};

export default AllCategories;
