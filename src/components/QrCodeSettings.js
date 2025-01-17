// QrCodeSettings.jsx
import React from "react";

function QrCodeSettings({
  errorCorrectionLevel,
  setErrorCorrectionLevel,
  fgColor,
  setFgColor,
  bgColor,
  setBgColor,
  pattern,
  setPattern,
  imageSrc,
  handleImageChange,
  handleRemoveImage,
  removeFgBehindLogo,
  setRemoveFgBehindLogo,
}) {
  return (
    <div className="bg-white px-4 py-6 rounded-md shadow-sm space-y-6">
      <div>
        <label className="block font-medium mb-2 text-gray-800">
          Error Correction Level:
        </label>
        <select
          value={errorCorrectionLevel}
          onChange={(e) => setErrorCorrectionLevel(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="L">Low</option>
          <option value="M">Medium</option>
          <option value="Q">Quartile</option>
          <option value="H">High</option>
        </select>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex-1">
          <label className="block font-medium mb-2 text-gray-800">
            Foreground Color:
          </label>
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            className="w-full h-10 rounded-md border border-gray-300"
          />
        </div>
        <div className="flex-1">
          <label className="block font-medium mb-2 text-gray-800">
            Background Color:
          </label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full h-10 rounded-md border border-gray-300"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-2 text-gray-800">Pattern:</label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "original", label: "Original" },
            { value: "dots", label: "Dots" },
            { value: "diamonds", label: "Diamonds" },
            { value: "hexagons", label: "Hexagons" },
            { value: "crosses", label: "Crosses" },
          ].map((p) => (
            <button
              key={p.value}
              onClick={() => setPattern(p.value)}
              className={`px-4 py-2 rounded-md transition-colors duration-150 ${
                pattern === p.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Upload Logo */}
      <div>
        <label className="block font-medium mb-2 text-gray-800 text-lg">
          Upload Logo:
        </label>
        <div className="flex flex-col items-start space-y-2">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {imageSrc && (
            <div className="mt-2 w-full">
              <div className="flex flex-col items-start space-y-2">
                <button
                  onClick={handleRemoveImage}
                  className="bg-red-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-600 transition-colors duration-200"
                >
                  Remove Image
                </button>

                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={removeFgBehindLogo}
                      onChange={(e) => setRemoveFgBehindLogo(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div
                      className="
                        w-12 h-7 bg-gray-200 rounded-full
                        peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-blue-400
                        dark:peer-focus:ring-blue-600
                        transition-colors duration-300
                        relative
                        peer-checked:bg-gradient-to-r peer-checked:from-sky-500 peer-checked:to-blue-600
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                        after:bg-white after:border after:border-gray-300
                        after:rounded-full after:h-6 after:w-6
                        after:transition-all after:duration-300
                        peer-checked:after:translate-x-5
                        peer-checked:after:border-white
                      "
                    />
                    <span className="ml-3 text-black font-medium">
                      Remove Background From Logo
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QrCodeSettings;
