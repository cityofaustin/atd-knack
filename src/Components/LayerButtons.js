import React from "react";

const LayerButtons = props => {
  return (
    <div className="input-group mb-3 layer-buttons">
      <div className="input-group-prepend">
        <div className="ibtn btn-secondary">
          <label htmlFor="streets-v9" className="input-group-text">
            Streets
          </label>
          <input
            name="style"
            id="streets-v9"
            type="radio"
            aria-label="Checkbox for following text input"
            onClick={props.toggleStyle}
            defaultChecked
          />
          <label htmlFor="satellite" className="input-group-text">
            Satellite
          </label>
          <input
            name="style"
            id="satellite-v9"
            type="radio"
            aria-label="Checkbox for following text input"
            onClick={props.toggleStyle}
          />
          <label htmlFor="satellite-streets-v9" className="input-group-text">
            Hybrid
          </label>
          <input
            name="style"
            id="satellite-streets-v9"
            type="radio"
            aria-label="Checkbox for following text input"
            onClick={props.toggleStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default LayerButtons;
