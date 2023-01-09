import { useEffect } from "react"
import DisplayLiveController from "../component/displayLiveController"
import { TimeComponent } from "../component/timeComponent"

export function Market() {
    return (
        <div className="">
            <TimeComponent />
            <DisplayLiveController />
        </div>
    )
}