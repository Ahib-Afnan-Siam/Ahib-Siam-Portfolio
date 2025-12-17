import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import sakura from "../assets/sakura.mp3";
import { HomeInfo, Loader, ChatInterface } from "../components";
import { soundoff, soundon, send } from "../assets/icons";
import { Bird, Island, Plane, Sky } from "../models";

const Home = ({ setIsIslandMoved }) => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [currentStage, setCurrentStage] = useState(1); // Changed initial stage to 1
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const previousStageRef = useRef(1); // Track previous stage

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  // Track when the island moves from stage 1 to other stages
  useEffect(() => {
    if (currentStage !== previousStageRef.current) {
      // If we moved from stage 1 to any other stage, mark island as moved
      if (previousStageRef.current === 1 && currentStage !== 1) {
        setIsIslandMoved(true);
      }
      // If we moved back to stage 1 from any other stage, mark island as returned
      else if (currentStage === 1 && previousStageRef.current !== 1) {
        setIsIslandMoved(false);
      }
      
      previousStageRef.current = currentStage;
    }
  }, [currentStage, setIsIslandMoved]);

  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -4.5, -43.4]; // Moved further up from -5.0 to -4.5
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -4.5, -43.4]; // Moved further up from -5.0 to -4.5
    }

    return [screenScale, screenPosition];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      {/* Glass overlay effect with smooth transition - covers entire screen when input is focused */}
      <div className={`fixed inset-0 bg-white/10 backdrop-blur-sm z-30 transition-all duration-500 ease-in-out ${
        isInputFocused ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}></div>
      
      <div className='absolute top-16 left-0 right-0 z-10 flex items-center justify-center'>
        <div className={`transition-all duration-500 ease-in-out ${isInputFocused ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {currentStage === 1 && (
            <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
              Hi, I'm
              <span className='font-semibold mx-2 text-white'>Ahib</span>
              👋
              <br />
              Full-Stack AI Engineer at PRAN-RFL Group, Bangladesh 🇧🇩
            </h1>
          )}
          {currentStage >= 2 && <HomeInfo currentStage={currentStage} />}
        </div>
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent transition-all duration-500 ease-in-out ${
          isInputFocused ? 'opacity-30' : 'opacity-100'
        } ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            skyColor='#b1e1ff'
            groundColor='#000000'
            intensity={1}
          />

          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />
          <Plane
            isRotating={isRotating}
            position={biplanePosition}
            rotation={[0, 20.1, 0]}
            scale={biplaneScale}
          />
        </Suspense>
      </Canvas>

      <div className='absolute bottom-2 left-2 z-20'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-10 h-10 cursor-pointer object-contain'
        />
      </div>

      {/* Chat Trigger Input Box */}
      <div className='absolute bottom-4 right-0 left-0 flex justify-center items-center z-40 px-4'>
        <div className='flex items-center w-full max-w-2xl'>
          <input
            type='text'
            placeholder='Ask me anything...'
            onFocus={() => {
              console.log('Home input focused');
              setIsInputFocused(true);
            }}
            onBlur={() => {
              console.log('Home input blurred');
              // Don't close the chat when the input loses focus
              // The chat should only close when explicitly closed by the user
            }}
            className='flex-grow py-3 px-4 rounded-l-lg border-0 focus:ring-0 bg-white/80 backdrop-blur-sm shadow-lg cursor-pointer'
            style={{ display: isInputFocused ? 'none' : 'block' }}
          />
          <button
            type='button'
            className='bg-blue-600 hover:bg-blue-700 py-4 px-6 rounded-r-lg focus:outline-none focus:ring-0 shadow-lg'
            aria-label="Open chat"
            onClick={() => setIsInputFocused(true)}
            role="button"
          >
            <img src={send} alt='send' className='w-5 h-5 filter invert' />
          </button>
        </div>
      </div>

      {/* Chat Interface Component - only visible when input is focused */}
      <ChatInterface 
        isVisible={isInputFocused} 
        onClose={() => {
          setIsInputFocused(false);
          // Reset any chat state if needed when closing
        }} 
      />
    </section>
  );
};

export default Home;