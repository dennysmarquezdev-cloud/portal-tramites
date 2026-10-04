import React from 'react';

export interface WeaveSpinnerProps {
  color?: string; // e.g. '#2F6CB5'
  accentColor?: string; // e.g. '#4FADD4'
  size?: number;  // container size in px
}

export const WeaveSpinner = ({ color = '#2F6CB5', accentColor = '#4FADD4', size = 150 }: WeaveSpinnerProps) => {
  return (
    <>
      <style>
        {`
          .spinner-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          /* Main container for the spinner */
          .spinner-container {
            position: relative;
            width: ${size}px;
            height: ${size}px;
            transform-style: preserve-3d;
            perspective: 1200px;
          }

          /* Central glowing node */
          .weave-node {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 13px;
            height: 13px;
            background: linear-gradient(135deg, ${color} 0%, ${accentColor} 100%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            box-shadow:
              0 0 20px ${accentColor},
              0 0 40px ${color}aa;
            animation: nodePulse 1.6s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
          }

          /* Base style for all weaving threads */
          .thread {
            position: absolute;
            background: linear-gradient(
              90deg,
              transparent,
              ${accentColor}cc,
              ${color}ee,
              transparent
            );
            box-shadow: 0 0 10px ${accentColor}90;
            transform-origin: center;
          }

          /* Individual thread positioning and animation delays */
          .t1 {
            width: 100%;
            height: 2px;
            top: 30%;
            left: 0;
            animation: weave1 2s cubic-bezier(0.45, 0, 0.55, 1) infinite;
          }

          .t2 {
            width: 2px;
            height: 100%;
            top: 0;
            left: 70%;
            animation: weave2 2.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
          }

          .t3 {
            width: 100%;
            height: 2px;
            bottom: 30%;
            left: 0;
            animation: weave3 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite;
          }

          .t4 {
            width: 2px;
            height: 100%;
            top: 0;
            left: 30%;
            animation: weave4 2.6s cubic-bezier(0.36, 0, 0.66, -0.56) infinite;
          }

          /* Animation for the central node's pulsing effect */
          @keyframes nodePulse {
            0%,
            100% {
              transform: translate(-50%, -50%) scale(1);
              box-shadow:
                0 0 20px ${color},
                0 0 40px ${color}99;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.4);
              box-shadow:
                0 0 30px ${color},
                0 0 60px ${color}cc;
            }
          }

          /* Animations for each of the four weaving threads */
          @keyframes weave1 {
            0% {
              transform: translateY(0) rotateX(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
            50% {
              transform: translateY(40px) rotateX(60deg) rotateZ(20deg);
              opacity: 1;
            }
            100% {
              transform: translateY(0) rotateX(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
          }

          @keyframes weave2 {
            0% {
              transform: translateX(0) rotateY(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
            50% {
              transform: translateX(-40px) rotateY(60deg) rotateZ(-20deg);
              opacity: 1;
            }
            100% {
              transform: translateX(0) rotateY(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
          }

          @keyframes weave3 {
            0% {
              transform: translateY(0) rotateX(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
            50% {
              transform: translateY(-40px) rotateX(-60deg) rotateZ(15deg);
              opacity: 1;
            }
            100% {
              transform: translateY(0) rotateX(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
          }

          @keyframes weave4 {
            0% {
              transform: translateX(0) rotateY(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
            50% {
              transform: translateX(40px) rotateY(-60deg) rotateZ(-15deg);
              opacity: 1;
            }
            100% {
              transform: translateX(0) rotateY(0deg) rotateZ(0deg);
              opacity: 0.8;
            }
          }
        `}
      </style>
      <div className="spinner-wrapper">
        <div className="spinner-container">
          <div className="thread t1" />
          <div className="thread t2" />
          <div className="thread t3" />
          <div className="thread t4" />
          <div className="weave-node" />
        </div>
      </div>
    </>
  );
};
