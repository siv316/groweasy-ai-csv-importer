"use client";

import { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import UploadBox from "../components/UploadBox";

export default function Home() {
  const [fileName, setFileName] = useState("");
  const [csvData, setCsvData] = useState<any[]>([]);
  const [crmData, setCrmData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFile = (file: File) => {
    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data as any[]);
      },
    });
  };

  const handleConfirmImport = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://groweasy-ai-csv-importer-g62v.onrender.com/api/import",
        csvData
      );

      const result =
        typeof response.data.data === "string"
          ? JSON.parse(response.data.data)
          : response.data.data;

      setCrmData(result);
    } catch (error) {
      console.error(error);
      alert("Import Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl rounded-xl bg-white p-8 shadow-lg">

        <h1 className="text-center text-3xl font-bold">
          AI Powered CSV Importer
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Upload your CSV file to extract CRM leads using AI
        </p>

        <UploadBox onFileSelect={handleFile} />

        {fileName && (
          <div className="mt-6 rounded-lg bg-green-100 p-4 text-green-700">
            <strong>Selected File:</strong> {fileName}
          </div>
        )}

        {csvData.length > 0 && (
          <>
            <h2 className="mt-8 mb-4 text-xl font-bold">
              CSV Preview
            </h2>

            <div className="overflow-auto rounded-lg border">
              <table className="min-w-full border-collapse">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    {Object.keys(csvData[0]).map((key) => (
                      <th key={key} className="border p-2">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {csvData.slice(0, 5).map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value: any, i) => (
                        <td key={i} className="border p-2">
                          {String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={handleConfirmImport}
              className="mt-6 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
            >
              {loading ? "Importing..." : "Confirm Import"}
            </button>
          </>
        )}

        {crmData.length > 0 && (
          <>
            <h2 className="mt-10 mb-4 text-2xl font-bold">
              AI Parsed CRM Records
            </h2>

            <div className="overflow-auto rounded-lg border">
              <table className="min-w-full border-collapse">
                <thead className="bg-green-600 text-white">
                  <tr>
                    {Object.keys(crmData[0]).map((key) => (
                      <th key={key} className="border p-2">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {crmData.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value: any, i) => (
                        <td key={i} className="border p-2">
                          {String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-lg bg-blue-100 p-4">
              <p><strong>Total Imported:</strong> {crmData.length}</p>
              <p><strong>Total Skipped:</strong> 0</p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}