import { useEffect, useState } from 'react';
import { formatDistance } from 'date-fns';
import { de } from 'date-fns/locale';

function LastUpdate(props: { date: Date }) {
    const [lastUpdated, setLastUpdated] = useState('-');

    useEffect(() => {
        const interval = setInterval(() => {
            setLastUpdated(
                formatDistance(new Date(), props.date, {
                    includeSeconds: true,
                    locale: de,
                })
            );
        }, 1000);
        return () => clearInterval(interval);
    });

    return <div>{lastUpdated}</div>;
}

export default LastUpdate;
