import React from "react";

const TextAreaField = ({ name, label, placeholder, value, onChange }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <textarea
        type="text"
        name={name}
        className="p-2 border-2 rounded-sm"
        rows={4}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextAreaField;
