import React from 'react';
import { TestTree } from '@/components/tree/TestTree';
import { Case01 } from '../Page1_Spring/Case01';
import { Case02 } from '../Page1_Spring/Case02';
import { Case03 } from '../Page1_Spring/Case03';
import { Case04 } from '../Page1_Spring/Case04';

export function Page2_Springs() {
    return (
        <div className="page grid place-items-center">
            <div className="m-4 max-w-[28rem]">
            {/* <div className="m-4 grid grid-cols-[repeat(2,minmax(400px,1fr))] gap-4"> */}
                <Case01 />
                {/* <Case02 />
                <Case03 />
                <Case04 /> */}
                <TestTree />
            </div>
        </div>
    );
}
