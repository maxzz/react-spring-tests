// Local storage

import { atom, Getter } from "jotai";
import atomWithCallback from "../hooks/atomsX";
import debounce from "../utils/debounce";

namespace Storage {
    const KEY = 'react-springs-test-01';

    type Store = {
        useGoo: boolean;
    };

    export let initialData: Store = {
        useGoo: true,
    };

    function load() {
        const s = localStorage.getItem(KEY);
        if (s) {
            try {
                let obj = JSON.parse(s) as Store;
                initialData = obj;
            } catch (error) {
            }
        }
    }
    load();

    export const save = debounce(function _save(get: Getter) {
        let newStore: Store = {
            useGoo: get(useGooAtom),
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);
}

export const useGooAtom = atomWithCallback(Storage.initialData.useGoo, ({get}) => Storage.save(get));
