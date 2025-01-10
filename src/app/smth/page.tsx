"use client"
import {useState} from "react";

export default function Smth() {
    const [arr, setArr] = useState<{ cellCount: number, playerID: number }[][]>(
        [
            [
                {
                    cellCount: 2,
                    playerID: 1
                },
                {
                    cellCount: 3,
                    playerID: 2,
                },
                {
                    cellCount: 4,
                    playerID: 1
                }
            ]
        ]
    );
}