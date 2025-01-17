import { useState, useRef, useEffect, useCallback } from "react";
import QRCode from "qrcode-generator";
import QrCodeSettings from "./QrCodeSettings";
import Title from "./Title";

function QrCodeGenerator() {
  const [url, setUrl] = useState("https://example.com");
  const [error, setError] = useState("");
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("L");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [pattern, setPattern] = useState("original");
  const [imageSrc, setImageSrc] = useState(null);
  const [removeFgBehindLogo, setRemoveFgBehindLogo] = useState(false);
  const qrCodeRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const maxSize = 180;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          setImageSrc(canvas.toDataURL("image/png"));
          setErrorCorrectionLevel("H");
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageSrc(null);
    setErrorCorrectionLevel("L");
  };

  const drawQRCode = useCallback(() => {
    if (!qrCodeRef.current) return;

    const qr = QRCode(0, errorCorrectionLevel);
    qr.addData(url);
    qr.make();

    const canvas = qrCodeRef.current;
    const ctx = canvas.getContext("2d");
    const tileW = canvas.width / qr.getModuleCount();
    const tileH = canvas.height / qr.getModuleCount();

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw pattern
    for (let row = 0; row < qr.getModuleCount(); row++) {
      for (let col = 0; col < qr.getModuleCount(); col++) {
        if (qr.isDark(row, col)) {
          const x = col * tileW;
          const y = row * tileH;
          ctx.fillStyle = fgColor;

          if (
            removeFgBehindLogo &&
            imageSrc &&
            x + tileW > canvas.width / 2 - canvas.width / 8 &&
            x < canvas.width / 2 + canvas.width / 8 &&
            y + tileH > canvas.height / 2 - canvas.height / 8 &&
            y < canvas.height / 2 + canvas.height / 8
          ) {
            continue;
          }

          switch (pattern) {
            case "dots":
              ctx.beginPath();
              ctx.arc(
                x + tileW / 2,
                y + tileH / 2,
                tileW / 2,
                0,
                2 * Math.PI
              );
              ctx.fill();
              break;
            case "diamonds":
              ctx.save();
              ctx.translate(x + tileW / 2, y + tileH / 2);
              ctx.rotate((45 * Math.PI) / 180);
              ctx.fillRect(-tileW / 2, -tileH / 2, tileW, tileH);
              ctx.restore();
              break;
            case "hexagons":
              const hexSize = tileW / 2;
              const hexHeight = Math.sqrt(3) * hexSize;
              ctx.beginPath();
              ctx.moveTo(x + hexSize, y);
              ctx.lineTo(x + 1.5 * hexSize, y + hexHeight / 2);
              ctx.lineTo(x + hexSize, y + hexHeight);
              ctx.lineTo(x, y + hexHeight);
              ctx.lineTo(x - 0.5 * hexSize, y + hexHeight / 2);
              ctx.closePath();
              ctx.fill();
              break;
            case "crosses":
              ctx.fillRect(x + tileW / 4, y, tileW / 2, tileH);
              ctx.fillRect(x, y + tileH / 4, tileW, tileH / 2);
              break;
            default:
              ctx.fillRect(x, y, tileW, tileH);
              break;
          }
        }
      }
    }

    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const maxLogoSize = canvas.width / 4;
        const ratio = img.width / img.height;
        let logoW, logoH;

        if (img.width > img.height) {
          logoW = maxLogoSize;
          logoH = maxLogoSize / ratio;
        } else {
          logoH = maxLogoSize;
          logoW = maxLogoSize * ratio;
        }

        const offsetX = (canvas.width - logoW) / 2;
        const offsetY = (canvas.height - logoH) / 2;

        if (removeFgBehindLogo) {
          ctx.fillStyle = bgColor;
          ctx.fillRect(offsetX, offsetY, logoW, logoH);
        }

        ctx.drawImage(img, offsetX, offsetY, logoW, logoH);
      };
    }
  }, [
    url,
    errorCorrectionLevel,
    fgColor,
    bgColor,
    pattern,
    imageSrc,
    removeFgBehindLogo,
  ]);

  useEffect(() => {
    drawQRCode();
  }, [drawQRCode, bgColor, removeFgBehindLogo]);

  const downloadQRCode = () => {
    if (!qrCodeRef.current) return;
    const dataUrl = qrCodeRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* Header */}
      <header className="w-full bg-white py-4 shadow-md flex items-center justify-start px-6">
        <img src="/Images/1.png" alt="Logo" className="h-10 mr-4" />
        <h1 className="text-3xl text-blue-900 font-bold">VTDT</h1>
      </header>
      <Title />

      <div className="max-w-6xl mb-10 w-full flex flex-col lg:flex-row bg-white shadow-lg mt-10 rounded-md">
        <div className="flex-1 p-6">
          <div className="flex flex-col items-center">
            <div className="mb-4 w-full">
              <label className="block font-medium mb-2 text-black">
                Website URL:
              </label>
              <input
                type="text"
                placeholder="Enter your URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <canvas
              ref={qrCodeRef}
              width={400}
              height={400}
              className="mb-6 shadow-md max-w-full h-auto"
            />

            {url && !error && (
              <button
                onClick={downloadQRCode}
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
              >
                Download QR Code
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 p-6">
          <QrCodeSettings
            setError={setError}
            errorCorrectionLevel={errorCorrectionLevel}
            setErrorCorrectionLevel={setErrorCorrectionLevel}
            fgColor={fgColor}
            setFgColor={setFgColor}
            bgColor={bgColor}
            setBgColor={setBgColor}
            pattern={pattern}
            setPattern={setPattern}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
            removeFgBehindLogo={removeFgBehindLogo}
            setRemoveFgBehindLogo={setRemoveFgBehindLogo}
            handleImageChange={handleImageChange}
            handleRemoveImage={handleRemoveImage}
          />
        </div>
      </div>
    </div>
  );
}

export default QrCodeGenerator;
