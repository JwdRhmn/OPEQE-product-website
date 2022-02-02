import React from 'react';
import cn from "classnames";

import CustomListItem from "../../CustomListItem";

export default function(props) {
	const {  
        className, 
        style,
        PrimaryIcon,
        SecondaryIcon,
        hideSecondaryIcon,
        primaryText,
        secondaryText,
        teritaryText,
        ...others
    } = props;

    return (
        <CustomListItem 
        	style={{
                ...style 
            }}
            className={cn(
                "custom-list-item-l2",
                className,
            )}
            icon={PrimaryIcon && PrimaryIcon}
            action={SecondaryIcon && SecondaryIcon}
            hideAction={hideSecondaryIcon}
            {...others}
        >                    
            <div className="body">
                <span className="primary text">
                    {primaryText}
                </span>
                <br />
                {(secondaryText || teritaryText) &&
                    <span>
                        {secondaryText && 
                            <span className="secondary">
                                {secondaryText}
                            </span>
                        }
                        <br/>
                        {teritaryText && 
                            <span className="teritary">
                                {teritaryText}
                            </span>
                        }
                    </span>
                }
            </div>
        </CustomListItem>

    );
}