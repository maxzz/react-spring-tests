import React from 'react';
import styled, { keyframes } from 'styled-components';
import { randomInclusive } from '@/utils/numbers';

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
      background-color: #fff9;
      transform: translate(-30%, -20%);
      scale: 1;
   }
   100% {
      opacity: 0;
      transform: translate(0, -500%); //big bubbles move faster
   }
`;

const BubbleChild = styled.div`
    position: absolute;
    background-color: #22f7;
    opacity: 0;
    border-radius: 100%;
    animation: ${bubblesAnim} 3s ease-in infinite;
`;

const totalBubles = 10;

export function BubblesAnimation() {
    const [total, setTotal] = React.useState(totalBubles);
    React.useEffect(() => {
        const interval = setInterval(() => setTotal(randomInclusive(totalBubles / 2, totalBubles)), 5000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="absolute left-[15.5%] top-[12.5%] w-[48.5%] h-[66%] overflow-hidden rounded-full bg-blue-600/20">
            {/* <BubbleChild $left={rnd(10, 80)} $top={rnd(60, 80)} $size={rnd(40, 80) / 10} $delay={-rnd(0, 30) / 10} key={idx} /> */}
            {Array.from({ length: total }).map((_, idx) => {
                const size = randomInclusive(20, 70) / 10;
                return (
                    <BubbleChild key={idx}
                        style={{
                            left: `${randomInclusive(30, 70)}%`,
                            top: `${randomInclusive(60, 80)}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                            animationDelay: `${-randomInclusive(0, 30) / 10}s`
                        }}
                    />
                );
            })}
        </div>
    );
}
