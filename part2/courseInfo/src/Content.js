import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
    return (
        <>
            {parts.map((part) => {
                return <Part key={String(part.name)} part={part} />;
            })}
        </>
    );
};

export default Content;
