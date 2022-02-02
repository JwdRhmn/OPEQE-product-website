import React from "react";
import cn from "classnames";
import { connect } from "react-redux";

import selectFliteredItems from "../../../store/selectors/product/selectFliteredItems";

function Index(props) {
    const {
        mapItemData,
        product: {
            data: {
                items
            },
        },
        childComponent: ChildComponent,
        filterValue,
        filterTypes,
        component: Component = "div",
        className,
        style,
        location,
        match,
        history,
        staticContext,
        ...others
    } = props;
        
    return (
        <Component
            className={cn("filtered-items-l1", className)}
            style={{
                ...style
            }}
            {...others}
        >
            {items.map(item => (
                <ChildComponent 
                    key={item.id}
                    {...(mapItemData ? mapItemData(item) : item)}
                />
            ))}
        </Component>
    );
}

const createMapStateToProps = () => {
    const filterItems = selectFliteredItems();
    const mapStateToProps = (state, props) => {
        return {
            product: filterItems(state, props)
        };
    };
    return mapStateToProps;
};

export default connect(
    createMapStateToProps,
    {}
)(Index);
