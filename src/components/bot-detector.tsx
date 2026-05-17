'use client';

import type { FC } from 'react';
import { useEffect } from 'react';
import detectBot from '@/utils/detect-bot';

const BotDetector: FC = () => {
    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        const timeout = setTimeout(() => {
            const runBotDetection = async () => {
                try {
                    const ipInfo = localStorage.getItem('ipInfo');
                    if (!ipInfo) {
                        const geoResponse = await fetch('https://get.geojs.io/v1/ip/geo.json');
                        const geoData = await geoResponse.json();
                        localStorage.setItem('ipInfo', JSON.stringify(geoData));
                    }

                    await detectBot();
                } catch (error) {
                    console.error('Bot detection error:', error);
                }
            };

            runBotDetection();


            intervalId = setInterval(() => {
                detectBot();
            }, 30000);
        }, 2000);

        return () => {
            clearTimeout(timeout);
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);

    return null;
};

export default BotDetector;

