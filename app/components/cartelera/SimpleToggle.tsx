import { useEffect, useState } from "react";

const SimpleToggle = (props: any) => {
    const { value, onChange } = props;
    const [isOn, setIsOn] = useState(value);

    useEffect(() => { setIsOn(value) }, [value])
    function handleToggle() {
        setIsOn(!isOn);
        if (onChange) {
            onChange(!isOn);
        }
    }

    return (
        <button type="button" style={{ verticalAlign: "baseline", marginTop: "0.5rem" }}
            onClick={() => handleToggle()}
            className={`w-16 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${isOn ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
            aria-pressed={isOn}
        >
            <span
                className={`bg-white w-7 h-7 rounded-full shadow-md transform transition-transform duration-300 ${isOn ? 'translate-x-full' : 'translate-x-0'
                    }`}
            />
        </button>
    );
};

export default SimpleToggle;