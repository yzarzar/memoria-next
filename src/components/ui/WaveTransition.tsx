const WaveTransition = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="wave-container">
        <svg
          viewBox="0 0 1440 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto transform rotate-180 wave"
          preserveAspectRatio="none"
        >
          <path
            d="M0 74C360 74 360 35 720 35C1080 35 1080 74 1440 74V0H0V74Z"
            fill="white"
            className="text-white"
          />
        </svg>
        {/* Duplicate wave for seamless animation */}
        <svg
          viewBox="0 0 1440 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto transform rotate-180 wave"
          preserveAspectRatio="none"
        >
          <path
            d="M0 74C360 74 360 35 720 35C1080 35 1080 74 1440 74V0H0V74Z"
            fill="white"
            className="text-white"
          />
        </svg>
        <style jsx>{`
          .wave-container {
            display: flex;
            width: 200%;
            animation: wave 10s linear infinite;
          }
          .wave {
            width: 50%;
          }
          @keyframes wave {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default WaveTransition; 