import React from "react";
import { Award } from "./Config";

interface ConfigTableProps {
  awards: Award[];

  // form functions
  handleChangeHost: (idx: number) => (e: any) => void;
  handleAddRow: () => void;
  handleRemoveRow: () => void;
  handleRemoveSpecificRow: (idx: number) => () => void;
  handleSubmit: (event: any) => void;
}

function ConfigTable(props: ConfigTableProps) {
  return (
    <form onSubmit={props.handleSubmit}>
      <table className="config-table">
        <thead>
          <tr>
            <th className="award-name-heading"> Award Name </th>
            <th className="award-number-heading"> How Many? </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {props.awards.map((item, idx) => (
            <tr key={idx}>
              <td className="award-name">
                <input
                  type="text"
                  name="nameAward"
                  placeholder="Enter Award Name"
                  value={props.awards[idx].nameAward}
                  onChange={props.handleChangeHost(idx)}
                />
              </td>
              <td className="award-number">
                <input
                  type="number"
                  name="numAward"
                  placeholder="Enter Number of Awards"
                  min="1"
                  value={props.awards[idx].numAward}
                  onChange={props.handleChangeHost(idx)}
                />
              </td>
              <td className="cross-button">
                <button
                  className="btn"
                  type="button"
                  onClick={props.handleRemoveSpecificRow(idx)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="ionicon s-ion-icon" viewBox="0 0 512 512"><path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path></svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons-container">
        <button className="add-row btn btn__primary" type="button" onClick={props.handleAddRow}>
          Add Award
        </button>
        <button className="start-game btn" type="submit">
          Start Game
        </button>
      </div>
    </form>
  );
}

export default ConfigTable;
