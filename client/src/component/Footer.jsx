import React from "react";

const Footer = ({ grid, data }) => {
  const isIzacuMovies = grid === "Izacu Movies";
  const [firstName, lastName] = isIzacuMovies ? grid.split(" ") : ["", ""];

  return (
    <section className="py-3">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold uppercase text-gray-200 tracking-wide">
          {isIzacuMovies ? (
            <>
              <span className="capitalize">{firstName}</span>{" "}
              <span className="text-red-600">{lastName}</span>
            </>
          ) : (
            grid
          )}
        </h2>

        <ul className="space-y-1">
          {data.map(({ id, label }) => (
            <li key={id}>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-red-600 transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Footer;
