import React from 'react';
import { TreeView } from './TreeView';

type Category = {
    id: string;
    label: string;
    icon: JSX.Element;
    items?: Category[];
};

const categories: Category[] = [
    {
        id: 'beverages',
        label: 'Beverages',
        icon: <>🥤</>,
        items: [
            {
                id: 'juices',
                label: 'Juices',
                icon: <>🧃</>,
                items: [
                    { id: 'apple-juice', label: 'Apple juice', icon: <>🍎</> },
                    { id: 'orange-juice', label: 'Orange juice', icon: <>🍊</> },
                    { id: 'strawberry-juice', label: 'Strawberry juice', icon: <>🍓</> }
                ]
            },
            {
                id: 'coffee',
                label: 'Coffee',
                icon: <>☕</>,
                items: [
                    { id: 'latte', label: 'Latte', icon: <>☕</> },
                    { id: 'espresso', label: 'Espresso', icon: <>☕</> }
                ]
            }
        ]
    },
    {
        id: 'dairy',
        label: 'Dairy',
        icon: <>🧈</>,
        items: [
            {
                id: 'cheeses',
                label: 'Cheeses',
                icon: <>🧀</>,
                items: [
                    { id: 'goat-cheese', label: 'Goat cheese', icon: <>🧀</> },
                    { id: 'camembert-cheese', label: 'Camembert', icon: <>🧀</> },
                    { id: 'cheddar-cheese', label: 'Cheddar', icon: <>🧀</> }
                ]
            },
            {
                id: 'milk',
                label: 'Milk',
                icon: <>🥛</>,
                items: [
                    { id: 'cow-milk', label: 'Cow Milk', icon: <>🐄</> },
                    { id: 'soya-milk', label: 'Soya milk', icon: <>🥛</> },
                    { id: 'oat-milk', label: 'Oat milk', icon: <>🥛</> }
                ]
            }
        ]
    }
];

export function TestTree() {
    return (<>
        <div>Catalog</div>
        <div style={{ maxWidth: '250px' }}>
            <TreeView tree={categories} />
        </div>
    </>);
}
