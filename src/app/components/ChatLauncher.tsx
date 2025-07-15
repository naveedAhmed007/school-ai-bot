import { FC } from 'react';
import clsx from 'clsx';
import { MessageCircle } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile'; 

interface ChatLauncherProps {
    onOpen: () => void;
    iconSize?: number;
    className?: string;
    'aria-label'?: string;
}

const ChatLauncher: FC<ChatLauncherProps> = ({
    onOpen,
    iconSize,
    className,
    'aria-label': ariaLabel = 'Open School Assistant Chat',
}) => {
    const isMobile = useIsMobile();

    const size = iconSize ?? (isMobile ? 22 : 26);
    const padding = isMobile ? '1rem' : '1.125rem';
    const dim = isMobile ? '4rem' : '4.5rem';

    return (
        <button
            onClick={onOpen}
            aria-label={ariaLabel}
            className={clsx(
                `
        bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700
        text-white rounded-full
        shadow-lg shadow-indigo-500/50
        hover:from-purple-700 hover:via-indigo-700 hover:to-blue-600
        hover:shadow-xl hover:shadow-purple-600/70
        transition-shadow duration-300
        transform hover:scale-110 active:scale-95
        focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50
        flex items-center justify-center
        `,
                className,
            )}
            style={{ padding, width: dim, height: dim }}
            data-testid="chat-launcher"
            role="button"
        >
            <MessageCircle size={size} />
        </button>
    );
};

export default ChatLauncher;
