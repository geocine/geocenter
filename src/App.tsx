import { invoke } from "@tauri-apps/api";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { RiFullscreenLine } from "react-icons/ri";

const countAtom = atom(0);
const greetingAtom = atom("Hello");

function App() {
  const [count, setCount] = useAtom(countAtom);
  const [greeting, setGreeting] = useAtom(greetingAtom);

  // add fullscreen change listener then send to tauri
  useEffect(() => {
    const onFullscreenChange = () => {
      // log
      console.log("fullscreen change");
      invoke("fullscreen_change", {
        isFullscreen: document.fullscreenElement !== null,
      });
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  const increment = () => {
    setCount(count + 1);
    // invoke rust function
    invoke("greet", { name: "World" }).then((response) => {
      setGreeting(response as string);
    });
  };

  const toggleFullscreen = () => {
    let body = document.querySelector("body");
    if (document.fullscreenElement !== null) {
      // exit full screen if already in full screen
      document.exitFullscreen();
    } else {
      // enter full screen
      body?.requestFullscreen();
    }

  };

  return (
    <div className="App flex h-screen bg-gray-50 font-roboto">
      <div className="flex flex-col items-center w-16 h-full overflow-hidden text-gray-400 bg-gray-900">
        <a className="flex items-center justify-center mt-3" href="#">
          <svg
            className="w-8 h-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
          </svg>
        </a>
        <div className="flex flex-col items-center mt-3 border-t border-gray-700">
          <a
            className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
            href="#"
          >
            <svg
              className="w-6 h-6 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
          </a>
          
          <a
            className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
            href="#"
          >
            <svg
              className="w-6 h-6 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </a>
          <a
            className="flex items-center justify-center w-12 h-12 mt-2 text-gray-200 bg-gray-700 rounded"
            href="#"
          >
            <svg
              className="w-6 h-6 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </a>
          <a
            className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
            href="#"
          >
            <svg
              className="w-6 h-6 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              ></path>
            </svg>
          </a>
        </div>
        <a
          className="flex items-center justify-center w-16 h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300"
          href="#"
        >
          <svg
            className="w-6 h-6 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </a>
      </div>
      <div className="flex-1 overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            {/* Add Dashboard Header, with full screen button on right */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
              {/* Add full screen button icon using react icon*/}
              <button
                onClick={toggleFullscreen}
                className="text-gray-600 hover:text-gray-900"
              >
                <RiFullscreenLine className="w-6 h-6" />
              </button>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-[calc(100vh-110px)]">
                  <div className="flex flex-col items-center justify-center h-full">
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <span className="text-4xl font-semibold text-gray-700 mb-2">
                      {count}
                    </span>
                    <button
                      className="inline-flex items-center px-4 py-2 bg-indigo-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md"
                      onClick={increment}
                    >
                      Increment
                    </button>
                    <span className="text-xl font-semibold text-gray-700">
                      {greeting}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
