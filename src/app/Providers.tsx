'use client';

import { ReactNode, useMemo } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { makeStore } from './redux/features/store';

export default function Providers({ children }: { children: ReactNode }) {
    const store = useMemo(() => makeStore(), []); 
    const persistor = useMemo(() => persistStore(store), [store]);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
