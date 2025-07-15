import { FC } from 'react';
import clsx from 'clsx';
import { MessageCircle } from 'lucide-react';

interface ChatLauncherProps {
    onOpen: () => void;
    iconSize?: number;
    className?: string;
    'aria-label'?: string;
}

/**
 * Floating circular button that opens the chat widget.
 */
const ChatLauncher: FC<ChatLauncherProps> = ({
    onOpen,
    iconSize,
    className,
    'aria-label': ariaLabel = 'Open School Assistant Chat',
}) => {
    // simple mobile sniff – or lift this up & pass a prop if you prefer
    const isMobile =
        /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
            navigator.userAgent.toLowerCase(),
        ) || window.innerWidth < 768;

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
        >
            <MessageCircle size={size} />
        </button>
    );
};

export default ChatLauncher;