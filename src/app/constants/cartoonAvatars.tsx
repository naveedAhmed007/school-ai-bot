import { Avatar } from "../types";

export const CartoonAvatars: Avatar[] = [
    {
        id: 1,
        name: 'Alex (Male, Young)',
        svg: (
            <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#F9D5B3" />
                <path fill="#5D4037" d="M20 40c6 4 24 4 24 0v8H20v-8z" />
                <circle cx="22" cy="30" r="5" fill="#3E2723" />
                <circle cx="42" cy="30" r="5" fill="#3E2723" />
                <path d="M20 25c0-6 24-6 24 0" stroke="#6D4C41" strokeWidth="3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 2,
        name: 'Bella (Female, Young)',
        svg: (
            <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#FFD1DC" />
                <path fill="#4E342E" d="M16 38c7 5 24 5 24 0v6H16v-6z" />
                <circle cx="22" cy="28" r="6" fill="#6D4C41" />
                <circle cx="42" cy="28" r="6" fill="#6D4C41" />
                <path d="M22 26c0-5 20-5 20 0" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 3,
        name: 'Chris (Non-binary)',
        svg: (
            <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#C6B89F" />
                <path fill="#3E2723" d="M24 40c8 6 16 0 16 0v6H24v-6z" />
                <circle cx="25" cy="30" r="5" fill="#4E342E" />
                <circle cx="40" cy="30" r="5" fill="#4E342E" />
                <path d="M24 25c0-6 16-6 16 0" stroke="#6D4C41" strokeWidth="3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 4,
        name: 'Dana (Older Female)',
        svg: (
            <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#E7C9A9" />
                <path fill="#4E342E" d="M18 38c9 6 24 6 24 0v5H18v-5z" />
                <circle cx="22" cy="28" r="7" fill="#6D4C41" />
                <circle cx="42" cy="28" r="7" fill="#6D4C41" />
                <path d="M20 24c0-4 24-4 24 0" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 5,
        name: 'Eli (Bald Male)',
        svg: (
            <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#B49982" />
                <path fill="#3E2723" d="M21 38c6 5 22 5 22 0v5H21v-5z" />
                <circle cx="24" cy="30" r="5" fill="#5D4037" />
                <circle cx="40" cy="30" r="5" fill="#5D4037" />
                <path d="M21 25c0-5 22-5 22 0" stroke="#6D4C41" strokeWidth="3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 6,
        name: 'Faith (Young Female, Glasses)',
        svg: (
            <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#FFD9B3" />
                <path fill="#4E342E" d="M18 38c8 7 24 7 24 0v5H18v-5z" />
                <circle cx="22" cy="28" r="6" fill="#6D4C41" />
                <circle cx="42" cy="28" r="6" fill="#6D4C41" />
                <rect x="16" y="25" width="12" height="4" fill="none" stroke="#3E2723" strokeWidth="2" rx="2" ry="2" />
                <rect x="36" y="25" width="12" height="4" fill="none" stroke="#3E2723" strokeWidth="2" rx="2" ry="2" />
                <path d="M20 22c0-3 24-3 24 0" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
            </svg>
        ),
    },
];
