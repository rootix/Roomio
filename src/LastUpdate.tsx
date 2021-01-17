import { useEffect, useState } from 'react';
import { formatDistance } from 'date-fns';
import { de } from 'date-fns/locale';

function LastUpdate(props: { date: Date }) {
    const [lastUpdated, setLastUpdated] = useState('-');

    useEffect(() => {
        const updateDate = () => setLastUpdated(
            formatDistance(new Date(), props.date, {
                includeSeconds: true,
                locale: de,
            })
        );
        updateDate();
        const interval = setInterval(() => updateDate(), 1000);
        return () => clearInterval(interval);
    });

    return <div>{lastUpdated}</div>;
}

export default LastUpdate;
