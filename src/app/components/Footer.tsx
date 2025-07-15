// components/WidgetFooter.tsx
import { FC, ReactNode, useMemo } from 'react';
import clsx from 'clsx';                // or `classnames`
import { TEXTS } from '../constants/texts';

interface WidgetFooterProps {
    /** fallback plain‑text copy (i18n‑ready) */
    text?: string;
    /** richer override */
    children?: ReactNode;
    className?: string;
}

const defaultClasses =
    'p-3 text-center text-xs text-gray-400 border-t bg-gray-50 dark:bg-gray-800 dark:text-gray-500';

const WidgetFooter: FC<WidgetFooterProps> = ({
    text = TEXTS.widgetFooterText,
    children,
    className,
}) => {
    const year = useMemo(() => new Date().getFullYear(), []);

    return (
        <footer
            role="contentinfo"
            data-testid="widget-footer"
            className={clsx(defaultClasses, className)}
        >
            <small>
                © {year} {children ?? text}
            </small>
        </footer>
    );
};

export default WidgetFooter;
