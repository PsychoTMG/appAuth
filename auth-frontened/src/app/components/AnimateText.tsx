import { useEffect, useState } from "react";

export default function AnimateText({ text, speed = 100 }: { text: string; speed?: number }) {
    const [display, setDisplay] = useState("");

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplay(text.slice(0, index));
            index++;
            if (index > text.length) clearInterval(interval);
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return <span>{display}</span>;
}
