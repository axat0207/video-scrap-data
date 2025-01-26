"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Filmmaker {
  Name: string;
  Title: string;
  Organization: string;
  Location: string;
  "Participation Type": string;
  Website: string;
  Frame: string;
}

const FilmmakerDirectory = () => {
  const [filmmakers, setFilmmakers] = useState<Filmmaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFilmmakers = async () => {
      try {
        const response = await fetch("/api/data");
        const data = await response.json();
        setFilmmakers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch filmmakers:", error);
        setIsLoading(false);
      }
    };

    fetchFilmmakers();
  }, []);

  const openImage = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-900">
      <h1 className="text-5xl font-bold mb-12 text-center text-white">
        Filmmakers Directory
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          style={{
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
          }}
        >
          {filmmakers.map((filmmaker, index) => (
            <div
              key={index}
              className="filmmaker-card bg-white rounded-xl shadow-md overflow-hidden border-2 border-gray-700"
            >
              <div
                className="relative w-full h-96 overflow-hidden cursor-pointer bg-black"
                onClick={() => openImage(filmmaker.Frame)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={filmmaker.Frame || "/placeholder.svg"}
                    alt={filmmaker.Name}
                    fill
                    style={{
                      objectFit: "contain",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                    className="absolute"
                  />
                </div>
              </div>
              <div className="fancy-border h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
              <div className="p-6 space-y-4 bg-gray-800 text-white">
                <h2 className="text-2xl font-semibold">{filmmaker.Name}</h2>
                <p>
                  <span className="font-medium text-gray-300">Title:</span>{" "}
                  {filmmaker.Title}
                </p>
                <p>
                  <span className="font-medium text-gray-300">
                    Organization:
                  </span>{" "}
                  {filmmaker.Organization}
                </p>
                <p>
                  <span className="font-medium text-gray-300">Location:</span>{" "}
                  {filmmaker.Location}
                </p>
                <p>
                  <span className="font-medium text-gray-300">
                    Participation:
                  </span>{" "}
                  {filmmaker["Participation Type"]}
                </p>
                <p>
                  <span className="font-medium text-gray-300">Website:</span>{" "}
                  <span
                    // href={filmmaker.Website}
                    // target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline break-all"
                  >
                    {filmmaker.Website}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilmmakerDirectory;
