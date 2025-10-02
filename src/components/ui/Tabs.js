"use client";
import { useState } from "react";
import React from "react";

export function Tabs({ defaultValue, value: controlledValue, onValueChange, children, className = "" }) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    
    // Use controlled value if provided, otherwise use internal state
    const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
    const setValue = controlledValue !== undefined ? onValueChange : setInternalValue;
    
    const enhanceChild = (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        if (child.type.displayName === "TabsList") {
            return React.cloneElement(child, { 
                ...child.props, 
                value: currentValue, 
                setValue,
                key: index 
            });
        }
        if (child.type.displayName === "TabsContent") {
            return React.cloneElement(child, { 
                ...child.props, 
                current: currentValue,
                key: index 
            });
        }
        
        return child;
    };
    return (
        <div className={`ui-tabs ${className}`.trim()} data-value={currentValue}>
            {Array.isArray(children) ? children.map(enhanceChild) : enhanceChild(children)}
        </div>
    );
}

export function TabsList({ children, value, setValue, style }) {
	return (
		<div className="ui-tabs-list" style={style}>
			{Array.isArray(children)
				? children.map((child, index) =>
						React.isValidElement(child) && child.type?.displayName === "TabsTrigger"
							? React.cloneElement(child, { 
								...child.props, 
								current: value, 
								setValue,
								key: index 
							})
							: child
				  )
				: children}
		</div>
	);
}
TabsList.displayName = "TabsList";

export function TabsTrigger({ value, children, current, setValue, style }) {
	const active = current === value;
	
	const handleClick = () => {
		if (typeof setValue === 'function') {
			setValue(value);
		} else {
			console.error('TabsTrigger: setValue is not a function. Make sure TabsTrigger is used within a Tabs component.');
		}
	};
	
	return (
		<button
			className={`ui-tab-trigger ${active ? "active" : ""}`.trim()}
			onClick={handleClick}
			type="button"
			style={style}>
			{children}
		</button>
	);
}
TabsTrigger.displayName = "TabsTrigger";

export function TabsContent({ value, current, children }) {
    const isActive = current === value;
    return (
        <div
            className="ui-tab-content"
            data-value={value}
            style={{ display: isActive ? "block" : "none" }}
            aria-hidden={!isActive}
            role="tabpanel"
        >
            {children}
        </div>
    );
}
TabsContent.displayName = "TabsContent";


