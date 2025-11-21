import React from "react";

const Footer = ({ grid, data }) => {
  if (grid !== "Izacu Movies") {
    return (
      <section className="">
        <div>
          <h1
            className="font-semibold uppercase text-gray-300 mb-3 inline-bol
            "
          >
            {grid}
          </h1>
          <div>
            {data.map(({ id, label }) => {
              return (
                <p
                  key={id}
                  className="text-gray-600 text-sm hover:text-red-800 cursor-pointer"
                >
                  {label}
                </p>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
  const [Firstname, Lastname] = grid.split(" ");
  return (
    <section className="">
      <div>
        <h1
          className="font-semibold uppercase text-gray-300 mb-3 inline-bol
          "
        >
          <span className="font-semibold capitalize">{Firstname}</span>
          <span className="font-semibold text-red-800 uppercase">
            {Lastname}
          </span>
        </h1>
        <div>
          {data.map(({ id, label }) => {
            return (
              <p key={id} className="text-gray-600 text-sm ">
                {label}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Footer;
