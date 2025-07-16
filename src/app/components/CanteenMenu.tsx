// src/components/CanteenMenu.tsx
import React, { useState } from 'react';
import { CalendarDays, Coffee, Apple, Leaf, Heart } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* ➊ Type & data helpers                                              */
/* ------------------------------------------------------------------ */

type MenuItem = {
    name: string;
    price?: string;
    notes?: string;
};

type DayMenu = {
    main: MenuItem[];
    sides: MenuItem[];
    vegetarian: MenuItem[];
    desserts: MenuItem[];
    drinks: MenuItem[];
    specials?: string;
};

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday',"Thursday","Friday","Saturday"] as const;

/**
 * Default structure returned if a menu for `selectedDay` is not defined,
 * ensuring we never read properties of `undefined`.
 */
const EMPTY_MENU: DayMenu = { main: [], sides: [], vegetarian: [], desserts: [], drinks: [] };

/* ------------------------------------------------------------------ */
/* ➋ Hard‑coded sample menus (replace with API calls if you like)      */
/* ------------------------------------------------------------------ */

const CANTEEN_MENUS: Record<string, DayMenu> = {
    Monday: {
        main: [
            { name: 'Chicken Curry', price: '£3.50' },
            { name: 'Beef Lasagne', price: '£3.50' },
        ],
        sides: [{ name: 'Steamed Rice' }, { name: 'Garden Peas' }],
        vegetarian: [{ name: 'Vegetable Stir Fry', price: '£3.20' }],
        desserts: [{ name: 'Apple Crumble', price: '£1.50' }, { name: 'Fruit Salad' }],
        drinks: [{ name: 'Water' }, { name: 'Orange Juice', price: '£1.00' }],
        specials: 'Gluten‑free options available on request.',
    },

    Tuesday: {
        main: [
            { name: 'Spaghetti Bolognese', price: '£3.50' },
            { name: 'Roast Pork', price: '£3.80' },
        ],
        sides: [{ name: 'Mashed Potatoes' }, { name: 'Carrots' }],
        vegetarian: [{ name: 'Quorn Sausages', price: '£3.20' }],
        desserts: [{ name: 'Chocolate Cake', price: '£1.50' }, { name: 'Yogurt' }],
        drinks: [{ name: 'Milk' }, { name: 'Apple Juice', price: '£1.00' }],
        specials: 'Low‑sugar drinks served.',
    },

    Wednesday: {
        main: [{ name: 'Fish & Chips', price: '£3.70' }],
        sides: [{ name: 'Baked Beans' }],
        vegetarian: [{ name: 'Cheese & Tomato Quiche', price: '£3.10' }],
        desserts: [{ name: 'Ice‑Cream Tub', price: '£1.20' }],
        drinks: [{ name: 'Water' }, { name: 'Lemonade', price: '£1.00' }],
    },

    Thursday: {
        main: [{ name: 'Chicken Fajitas', price: '£3.60' }],
        sides: [{ name: 'Salsa & Guacamole' }],
        vegetarian: [{ name: 'Falafel Wrap', price: '£3.20' }],
        desserts: [{ name: 'Banana Bread', price: '£1.40' }],
        drinks: [{ name: 'Iced Tea', price: '£1.00' }],
    },

    Friday: {
        main: [{ name: 'Margherita Pizza Slice', price: '£2.50' }],
        sides: [{ name: 'Side Salad' }],
        vegetarian: [{ name: 'Veggie Pizza Slice', price: '£2.50' }],
        desserts: [{ name: 'Cookie', price: '£1.00' }],
        drinks: [{ name: 'Milkshake', price: '£1.20' }],
        specials: '“Fish‑Free Friday” vegetarian promotion!',
    },
};

/* ------------------------------------------------------------------ */
/* ➌ Section sub‑component                                             */
/* ------------------------------------------------------------------ */

function Section({
    title,
    icon,
    items,
}: {
    title: string;
    icon: React.ReactNode;
    items: MenuItem[];
}) {
    if (items.length === 0) return null; // auto‑hide empty sections

    return (
        <div>
            <h3 className="flex items-center gap-2 text-blue-800 font-semibold mb-2 text-lg">
                {icon}
                {title}
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
                {items.map(({ name, price }) => (
                    <li key={name} className="flex justify-between">
                        <span>{name}</span>
                        {price && <span className="font-semibold text-gray-900">{price}</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* ➍ Main component                                                    */
/* ------------------------------------------------------------------ */

export default function CanteenMenu() {
    /* ---- Pick current weekday (Mon–Fri). Fall back to Monday on Sun/Sat. ---- */
    const jsDay = new Date().getDay(); // 0 = Sun, 1 = Mon, … 6 = Sat
    const defaultDay = WEEK_DAYS[jsDay - 1] ?? 'Monday';

    const [selectedDay, setSelectedDay] = useState<string>(defaultDay);

    /* ---- Retrieve menu safely ---- */
    const dayMenu: DayMenu = CANTEEN_MENUS[selectedDay] ?? EMPTY_MENU;

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200 space-y-6">
            {/* Day selector */}
            <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide mb-2">
                {WEEK_DAYS.map((day) => (
                    <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition
        ${day === selectedDay
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                            }`}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {/* Menu sections */}
            <Section title="Main Dishes" icon={<CalendarDays size={20} />} items={dayMenu.main} />
            <Section title="Sides" icon={<Apple size={20} />} items={dayMenu.sides} />
            <Section title="Vegetarian Options" icon={<Leaf size={20} />} items={dayMenu.vegetarian} />
            <Section title="Desserts" icon={<Heart size={20} />} items={dayMenu.desserts} />
            <Section title="Drinks" icon={<Coffee size={20} />} items={dayMenu.drinks} />

            {dayMenu.specials && (
                <p className="border-t border-gray-200 pt-3 text-sm text-gray-600 italic">
                    <strong>Note:</strong> {dayMenu.specials}
                </p>
            )}
        </div>
    );
}
