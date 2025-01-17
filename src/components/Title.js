function Title() {
    return (
      <div className="w-full py-6 flex flex-col items-center justify-center bg-white">
        <h2 className="text-5xl font-bold text-center text-black leading-snug">
          Generate and Publish <br />
          <span>
            <span className="relative inline-block border-2 border-blue-600 px-1 text-blue-600">
              Dynamic
              <span
                className="absolute -top-1.5 -left-1.5  w-3 h-3 bg-blue-600"/>
              <span
                className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-blue-600"/>
              <span
                className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-blue-600"/>
              <span
                className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-blue-600"/>
            </span>{" "}
            QR Codes
          </span>
        </h2>
  
        <p className="text-lg text-gray-600 mt-4 text-center max-w-2xl">
          Gencode is a dynamic QR code generator. It allows users to easily create
          customized QR codes for sharing or embedding on their website.
        </p>
      </div>
    );
  }
  
  export default Title;  