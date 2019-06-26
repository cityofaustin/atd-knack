import React from "react";
import styled from "styled-components";

const LayerControls = styled.div`
  position: absolute;
  top: 7%;
  left: 0%;
  margin: 0px 0px 0px 10px;
`;

const LayerButtons = props => {
  return (
    <LayerControls>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <div className="ibtn btn-secondary">
            <label htmlFor="satellite-streets-v9" className="input-group-text">
              Hybrid
            </label>
            <input
              name="style"
              id="satellite-streets-v9"
              type="radio"
              aria-label="Checkbox for following text input"
              onClick={props.toggleStyle}
              defaultChecked
            />
            <label htmlFor="streets-v9" className="input-group-text">
              Streets
            </label>
            <input
              name="style"
              id="streets-v9"
              type="radio"
              aria-label="Checkbox for following text input"
              onClick={props.toggleStyle}
            />
          </div>
        </div>
      </div>
    </LayerControls>
  );
};

export default LayerButtons;
