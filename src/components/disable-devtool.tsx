'use client';

import type { FC } from 'react';
import { useEffect } from 'react';

const DisableDevtool: FC = () => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            import('disable-devtool').then((module) => {
                const DisableDevtool = module.default;
                DisableDevtool({
                    disableMenu: true,
                    disableSelect: false,
                    disableCopy: false,
                    disableCut: false,
                    disablePaste: false,
                    clearLog: true,
                    interval: 1000,
                    detectors: [0, 1, 2, 3, 4, 5, 6, 7],
                    clearIntervalWhenDevOpenTrigger: true
                });
            });
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);
    return null;
};

export default DisableDevtool;
