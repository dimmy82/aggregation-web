import React, { FC } from "react";

export const Label: FC<{
    text: string
}> = (props) => {
    return (
        <label>{props.text}</label>
    );
}