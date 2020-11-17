import React, { useEffect } from "react";
import $ from "jquery";
const Init = () => {
    useEffect(() => {
        $("body").addClass("form-membership dark");
    }, []);

    return (
        <div>
            Loading...
        </div>
    );
};

export default Init;
