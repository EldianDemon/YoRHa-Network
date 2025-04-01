import React from "react";
import { useParams } from "react-router-dom";

const Server = () => {

    const { serverId } = useParams()

    return (
        <div>
            Server id: {serverId}
        </div>
    )
}

export default Server