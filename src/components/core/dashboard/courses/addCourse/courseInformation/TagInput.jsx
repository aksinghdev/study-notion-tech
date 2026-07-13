
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";

export default function TagInput({
  label,
  name,
  placeholder,
  setValue,
  register,
  errors,
}) {
  const { course, editCourse } = useSelector((state) => state.course);

  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Register field with react-hook-form
  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value?.length > 0,
    });
  }, [register, name]);

  // Populate tags while editing course
  useEffect(() => {
    if (editCourse) {
      setChips(course?.tag || []);
    }
  }, [editCourse, course]);

  // Update react-hook-form whenever chips change
  useEffect(() => {
    setValue(name, chips, { shouldValidate: true });
  }, [chips, name, setValue]);

  // Add Chip
  const addChip = () => {
    const chip = inputValue.trim();

    if (!chip) return;

    // Prevent duplicate tags (case-insensitive)
    const alreadyExists = chips.some(
      (item) => item.toLowerCase() === chip.toLowerCase()
    );

    if (alreadyExists) {
      setInputValue("");
      return;
    }

    setChips((prev) => [...prev, chip]);
    setInputValue("");
  };

  // Handle Enter / Comma
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addChip();
    }
  };

  // Delete Chip
  const handleDeleteChip = (indexToDelete) => {
    setChips((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm text-richblack-5">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="flex items-center rounded-full bg-yellow-600 px-3 py-1 text-sm text-richblack-5"
          >
            {chip}

            <button
              type="button"
              onClick={() => handleDeleteChip(index)}
              className="ml-2"
            >
              <MdClose />
            </button>
          </div>
        ))}
      </div>

      {/* Input */}
      <input
        id={name}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full rounded-lg border-b border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-100 outline-none"
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
        }}
      />

      {/* Mobile Only */}
      <button
        type="button"
        onClick={addChip}
        className="block w-full rounded-md bg-yellow-400 px-4 py-2 font-semibold text-black md:hidden"
      >
        Add Tag
      </button>

      {errors[name] && (
        <span className="ml-2 text-xs text-pink-200">
          At least one tag is required.
        </span>
      )}
    </div>
  );
}