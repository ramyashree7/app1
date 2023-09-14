import React from "react";
import "./Part1.css";

const Part1 = () => {
  return (
    <div className="container">
      <div className="background">
        <p className="content" >
          <b>about design studio</b>
        </p>
        <h1 className="content1" >
          We have developed more than 300 <br />
          professional, customer converting, <br />
          mobile friendly websites.
        </h1>
        <p className="content2">
          contact: +1 777 000 0000 / email / facebook{" "}
        </p>

        <div className="buttons">
          <button className="rounded-button">
            <b>learn more</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Part1;
