import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './App.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/stars');
  };

  return (
    <motion.div
      className="landing-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      onClick={handleEnter}
    >
      <motion.h1
        className="landing-title"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        Touch to enter your magical starry sky...
      </motion.h1>
      <motion.p
        className="landing-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        (Click anywhere ✨)
      </motion.p>
    </motion.div>
  );
};

export default LandingPage;
