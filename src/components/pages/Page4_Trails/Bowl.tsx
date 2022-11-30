import React from 'react';
import styled, { keyframes } from 'styled-components';
import { rnd } from '@/utils/numbers';

const bubblesAnim = keyframes`
   0% {
      opacity: 0;
      background-color: teal;
      scale: 0.1;
   }
   20% { //show and hint at moving
      opacity: 0.25;
      transform: translate(-30%, 40%);
      scale: 0.5;
   }
   40% { //show and hint at moving
      opacity: 1;
      transform: translate(30%, -20%);
      scale: 0.2;
   }
   60%{
      background-color: #fff7;
      transform: translate(-60%, -20%);
      scale: 1;
   }
   100% {
      opacity: 0;
      transform: translate(0, -500%); //big bubbles move faster
   }
`;

const BubbleChild = styled.div`
    position: absolute;
    //background-color: red;
    background-color: #fff7;
    opacity: 0;
    border-radius: 100%;
    animation: ${bubblesAnim} 3s ease-in infinite;
`;

export function Bubbles() {
    const [total, setTotal] = React.useState(10);
    React.useEffect(() => {
        const int = setInterval(() => setTotal(rnd(total - 1, total + 1)), 5000);
        return () => clearInterval(int);
    }, []);
    return (
        <div className="absolute left-[15.5%] top-[12.5%] w-[48.5%] h-[66%] overflow-hidden rounded-full bg-blue-600/20">
            {/* <BubbleChild $left={rnd(10, 80)} $top={rnd(60, 80)} $size={rnd(40, 80) / 10} $delay={-rnd(0, 30) / 10} key={idx} /> */}
            {Array.from({ length: total }).map((_, idx) => {
                const size = rnd(20, 70) / 10;
                return (
                    <BubbleChild key={idx}
                        style={{
                            left: `${rnd(20, 70)}%`,
                            top: `${rnd(50, 70)}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                            animationDelay: `${-rnd(0, 30) / 10}s`
                        }}
                    />
                );
            })}
        </div>
    );
}
