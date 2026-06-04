import React from "react";

export default function PdfViewer() {


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8 mt-5">
      <h1 className="text-3xl font-bold mb-6">PDF to Website Example</h1>

      {/* PDF embedded */}
      <iframe
       src="/Marine_Core_Item_Catalogue_2025.pdf"
        width="100%"
        height="900px"
        className="shadow-lg rounded-xl border border-gray-300"
        title="PDF Viewer"
      ></iframe>

      {/* Optional: Download Button */}
      <a
        src="/Marine_Core_Item_Catalogue_2025.pdf"
        download
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        Download PDF
      </a>
    </div>
  );
}
