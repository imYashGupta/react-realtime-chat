import React from "react";

const Avatar = (props) => {
    let { size, user } = props;
    if(size===undefined) size = '';
    return (
        <figure className={"avatar no-select " + size}>
            {user.displayPicture != null ? (
                <img
                    src={user.displayPicture}
                    className="rounded-circle"
                    alt="user"
                />
            ) : (
                <span
                    className={
                        "avatar-title bg-success rounded-circle " +
                        user.meta.color[0]
                    }
                >
                    {user.name[0]}
                </span>
            )}
        </figure>
    );
};

export default Avatar;
