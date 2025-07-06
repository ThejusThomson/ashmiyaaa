import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Custom interval hook
function useInterval(callback, delay) {
  const savedCallback = useRef();
  React.useEffect(() => { savedCallback.current = callback; }, [callback]);
  React.useEffect(() => {
    if (delay !== null) {
      let id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const CancerStars = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [playMusic, setPlayMusic] = useState(false);
  const [clickedStars, setClickedStars] = useState(new Set());
  const [shootingStars, setShootingStars] = useState([]);
  const [flashStar, setFlashStar] = useState(null);
  const audioRef = useRef(null);

 const stars = [
  { type: "image", src: "/images/2.jpg", message: "Gods that day be like: 'Who's this new goddess visiting today? 😍🛕" },
  { type: "image", src: "/images/3.jpg", message: "Even my favorite dessert isn’t as sweet as your smile 🍰☺️" },
  { type: "image", src: "/images/4.jpg", message: "Look at that smile!! Food is probably your first love, I'm hopefully top 5" },
  { type: "image", src: "/images/5.jpg", message: "Even AI couldn’t capture your real magic, but nice try 😉✨" },
  { type: "image", src: "/images/6.jpg", message: "I thought perfection didn’t exist… until I saw you 😌✨" },
  { type: "image", src: "/images/7.jpg", message: "You look like a sunbeam took human form — unstoppable glow 💫✨" },
  { type: "image", src: "/images/8.jpg", message: "No more 'I wanna go to Paris' requests ever (not that you've ever asked)" },
  { type: "image", src: "/images/9.jpg", message: "Damnn, If you become an IM staff, no way the games will happen, the guys are all gonna get distracted xD" },
  { type: "image", src: "/images/10.jpg", message: "You’re so cute, even chocolates feel like they need glow-up 🍫✨" },
  { type: "image", src: "/images/11.jpg", message: "Yep, definitely my favourite pic...yet! :)" },
  { type: "image", src: "/images/12.jpg", message: "You looked so cute that day... sorry, even today and every day! 🤷‍♂️💖" },
  { type: "image", src: "/images/13.jpg", message: "This has to become a yearly tradition for sure, cause this looks soo good. Also - Onam sadhya-il 26 curry undu… but nee mathi, full sadhya feeling 💖🍛" },
  { type: "image", src: "/images/14.jpg", message: "Your cheeks? Too cute, want to pinch — ISO standard approved! 👌" },
  { type: "image", src: "/images/15.jpg", message: "Your vibe? Even Google Maps got lost here 🗺️" },
  { type: "image", src: "/images/16.jpg", message: "If you were a forest, I'd happily get lost forever 🌲😇" },
  { type: "image", src: "/images/17.jpg", message: "I need a license to handle that much cuteness 🪪🥹" },
  { type: "image", src: "/images/18.jpg", message: "Ik you hate this pic, but I love it and that's all matter xD" },
  { type: "image", src: "/images/19.jpg", message: "Never expected you would be fine eating here, you become love x2 that day" },
  { type: "image", src: "/images/20.jpg", message: "Food again, it's soo easy to make you smile" },
  { type: "image", src: "/images/21.jpg", message: "Must be tough being so pretty… wait, no it isn’t! ;)" },
  { type: "image", src: "/images/22.jpg", message: "That face could convince me to buy you a whole zoo of plushies 🧸" },
  { type: "image", src: "/images/23.jpg", message: "Queen of ice, queen of my heart too 😍" },
  { type: "video", src: "/videos/1.mp4", message: "Baby steps for my baby!" },
  { type: "video", src: "/videos/2.mp4", message: "Yep, I still love you xP" },
  { type: "video", src: "/videos/4.mp4", message: "Oh yeah, it's incomplete without this video" },
];


  const permanentPhoto = "/images/1.jpg"; // <-- Change this to your permanent photo path
  // Fixed clickable star positions
  const positionsRef = useRef([]);
  // if (positionsRef.current.length === 0) {
  //   positionsRef.current = stars.map(() => {
  //     let pos;
  //     do {
  //       pos = {
  //         top: Math.random() * 80 + 5,
  //         left: Math.random() * 80 + 5,
  //       };
  //     } while (
  //       pos.left > 20 && pos.left < 60 &&
  //       pos.top > 10 && pos.top < 60
  //     );
  //     return pos;
  //   });
  // }
  // if (positionsRef.current.length === 0) {
  //   positionsRef.current = stars.map(() => ({
  //     top: Math.random() * 70 + 5,
  //     left: Math.random() * 70 + 5,
  //   }));
  // }
const starPositions = [
  { top: 15, left: 50 },
  { top: 25, left: 50 },
  { top: 35, left: 42 },
  { top: 35, left: 58 },
  { top: 45, left: 37 },
  { top: 45, left: 63 },
  { top: 55, left: 45 },
  { top: 55, left: 55 },
  { top: 65, left: 50 },
  { top: 20, left: 46 },
  { top: 30, left: 54 },
  { top: 40, left: 65 },
  { top: 50, left: 70 },
  { top: 55, left: 30 },
  { top: 45, left: 25 },
  { top: 30, left: 38 },
  { top: 22, left: 35 },
  { top: 25, left: 65 },
  { top: 35, left: 70 },
  { top: 45, left: 60 },
  { top: 58, left: 50 },
  { top: 68, left: 40 },
  { top: 70, left: 60 },
  { top: 55, left: 20 },
  { top: 60, left: 75 },
];

if (positionsRef.current.length === 0) {
  positionsRef.current = starPositions;
}

  // Fixed decorative star positions
  const decorPositionsRef = useRef([]);
  if (decorPositionsRef.current.length === 0) {
    decorPositionsRef.current = Array.from({ length: 30 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      animDuration: 3 + Math.random() * 2,
    }));
  }

  const colors = ['#a855f7', '#8b5cf6', '#c084fc', '#d8b4fe'];

  const handleMusicToggle = () => {
    if (playMusic) {
      audioRef.current.pause();
      setPlayMusic(false);
    } else {
      audioRef.current.play();
      setPlayMusic(true);
    }
  };

  const handleStarClick = (index) => {
    setFlashStar(index);
    setTimeout(() => {
      setSelectedMedia(stars[index]);
      setFlashStar(null);
    }, 300);
    setClickedStars((prev) => new Set(prev).add(index));
  };

  // Multiple shooting stars
  useInterval(() => {
    const newStars = Array.from({ length: 3 }, () => ({
      id: Date.now() + Math.random(),
      top: Math.random() * 80 + 5,
      left: Math.random() * 100,
    }));
    setShootingStars((prev) => [...prev.slice(-15), ...newStars]); // keep up to 15
  }, 1500); // every 1.5 sec

  // Auto play music on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set default volume
      audioRef.current.play().then(() => {
        setPlayMusic(true);
      }).catch(() => {
        // Some browsers block auto-play until user interaction
      });
    }
  }, []);

  return (
    <div className="stars-container">
      <h1 className="happy-text">Happiest Birthday to my Cutest Pookie Princess Ashmiyaaaaa! 🎂👑💖</h1>

      <h2 className="pick-text shimmer">Pick your favorite star ✨</h2>

      <button className="music-button" onClick={handleMusicToggle}>
        {playMusic ? '⏹️ Pause Music' : '🌺 Play Music 🌺'}
      </button>

      <audio ref={audioRef} src="/music/Oru-Ooril.mp3" loop style={{ display: 'none' }} />

      <motion.img
        src={permanentPhoto}
        alt="Permanent"
        className="permanent-photo"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 0.5,
          scale: 1,
          y: [0, -10, 0],
          x: [0, 10, 0],
        }}
        transition={{
          delay: 3,
          duration: 3,
          ease: "easeInOut",
        }}
      />


      <div className="sky">
        {positionsRef.current.map((pos, index) => (
          <motion.div
            key={index}
            className={`star ${flashStar === index ? 'star-flash' : ''}`}
            animate={{
              y: [0, Math.random() * 30 - 15, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              repeatType: 'mirror',
            }}
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              backgroundColor: clickedStars.has(index) ? '#ffffff' : '#a855f7',
              boxShadow: `0 0 20px ${clickedStars.has(index) ? '#ffffff' : '#a855f7'}`,
            }}
            whileHover={{
              scale: 1.7,
              boxShadow: `0 0 30px #ffffff`,
            }}
            onClick={() => handleStarClick(index)}
          />
        ))}

        {decorPositionsRef.current.map((pos, i) => (
          <div
            key={`decor-${i}`}
            className="decor-star"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              animationDuration: `${pos.animDuration}s`,
            }}
          />
        ))}

        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="shooting-star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="modal-overlay"
            onClick={() => setSelectedMedia(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content glitter-effect"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {selectedMedia.type === "image" ? (
                <img src={selectedMedia.src} alt="" />
              ) : (
                <video src={selectedMedia.src} controls />
              )}
              <p>{selectedMedia.message}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CancerStars;
