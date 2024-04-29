"use client";

import { memo } from "react";

import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config";

import { Cursor } from "./cursor";
import { shallow } from "@liveblocks/client";
import { Path } from "./path";
import { colorToCss } from "@/lib/utils";

const Cursors = () => {
    const ids = useOthersConnectionIds();

    return (
        <>
            {ids.map((connectionId) => (
                <Cursor
                    key={connectionId}
                    connectionId={connectionId}
                />
            ))}
        </>
    );
};

const Drafts = ()=>{
    const others = useOthersMapped((other)=>({
        pencilDraft:other.presence.pencilDraft,
        penColor:other.presence.penColor
    }),shallow);
    return(
        <>
            {others.map(([key,others])=>{
                if(others.pencilDraft){
                    return(
                        <Path
                            key={key}
                            x={0}
                            y={0}
                            points={others.pencilDraft}
                            fill={others.penColor? colorToCss(others.penColor):"#000"}
                        />
                    )
                }
                return null;
            })}
        </>
    )
}

export const CursorsPresence = memo(() => {
    return (
        <>
            <Drafts/>
            <Cursors />
        </>
    );
});

CursorsPresence.displayName = "CursorsPresence";