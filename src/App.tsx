import { invoke } from "@tauri-apps/api";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { RiFullscreenLine } from 'react-icons/ri';

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
      let body = document.querySelector('body');
      if( document.fullscreenElement !== null ) {
        // exit full screen if already in full screen
        document.exitFullscreen();
      } else {
        // enter full screen
        body?.requestFullscreen();
      }

  };

  return (
    <div className="App flex h-screen bg-gray-50 font-roboto">
      <div className="flex flex-col flex-shrink-0 w-64">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-indigo-600">
          <span className="text-xl font-semibold tracking-wide text-white">
            Geocenter
          </span>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white">
          <nav className="flex flex-col py-4 space-y-1">
            <a
              href="#"
              className="flex items-center px-6 py-2 space-x-2 text-indigo-600 bg-indigo-100"
            >
              <span className="text-sm font-medium tracking-wide text-indigo-600">
                Home
              </span>
            </a>
            <a
              href="#"
              className="flex items-center px-6 py-2 space-x-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="text-sm font-medium tracking-wide text-gray-600">
                Misc
              </span>
            </a>
          </nav>
        </div>
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
                      className="px-3 py-1 rounded-md bg-indigo-600 text-white mb-3"
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
