import React from 'react';
import { Case01 } from './Case01';
import { Case01snapshot } from './Case01snapshot';
import { Case02 } from './Case02';
import { Case03 } from './Case03';
import { Case04 } from './Case04';
import { Case0X } from './Case0X';

export function Page1_Spring() {
    return (
        <div className="page grid place-items-center overflow-hidden">
            <div className="m-4 grid grid-cols-[repeat(2,minmax(400px,28rem))] gap-4">
                <Case01 />
                <Case02 />
                <Case03 />
                <Case04 />
                {/* <Case01snapshot /> */}
            </div>
        </div>
    );
}
