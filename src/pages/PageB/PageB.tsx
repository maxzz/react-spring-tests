import React from 'react';
import { Case01 } from '../PageA/Case01';
import { Case02 } from '../PageA/Case02';
import { Case03 } from '../PageA/Case03';
import { Case04 } from '../PageA/Case04';

export function PageB() {
    return (
        <div className="page grid place-items-center">
            <div className="m-4">
            {/* <div className="m-4 grid grid-cols-[repeat(2,minmax(400px,1fr))] gap-4"> */}
                <Case01 />
                {/* <Case02 />
                <Case03 />
                <Case04 /> */}
            </div>
        </div>
    );
}
