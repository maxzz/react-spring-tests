import { ButtonRunTest } from "./ButtonRunTest";
import { Counters } from "./Counters";
import { SimpleCheckbox } from "./SimpleCheckbox";

export function CaseControls({
    running, onClickRun,
    auto, setAuto,
    wobbly, setWobbly,
    nContainer,
    nElements,
}: {
    running: boolean, onClickRun: () => void,
    auto: boolean, setAuto: (v: boolean) => void,
    wobbly: boolean, setWobbly: (v: boolean) => void,
    nContainer: number,
    nElements: number,
}) {
    return (
        <div className="flex justify-between space-x-4">
            <div className="ml-4 mt-2 flex flex-col">
                <Counters nContainer={nContainer} nElements={nElements} />

                <div className="flex items-center space-x-4">
                    <SimpleCheckbox label="wobbly" value={wobbly} onChange={setWobbly} />
                    <SimpleCheckbox label="auto reset animation" value={auto} onChange={setAuto} />
                </div>
            </div>

            <ButtonRunTest running={running} onClick={onClickRun} />
        </div>
    );
}
