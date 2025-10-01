"use client";
import React, { useState } from "react";

export function Tabs({ defaultValue, children, className = "" }) {
    const [value, setValue] = useState(defaultValue);
    return (
        <div className={`ui-tabs ${className}`.trim()} data-value={value}>
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;
                if (child.type?.displayName === "TabsList") {
                    return React.cloneElement(child, { value, setValue });
                }
                if (child.type?.displayName === "TabsContent") {
                    return React.cloneElement(child, { currentValue: value });
                }
                return child;
            })}
        </div>
    );
}
export function TabsList({ children, value, setValue }) {
    return (
        <div className="ui-tabs-list">
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;
                if (child.type?.displayName === "TabsTrigger") {
                    return React.cloneElement(child, { current: value, setValue });
                }
                return child;
            })}
        </div>
    );
}
TabsList.displayName = "TabsList";

export function TabsTrigger({ value, children, current, setValue }) {
	const active = current === value;
	return (
		<button
			className={`ui-tab-trigger ${active ? "active" : ""}`.trim()}
			onClick={() => setValue(value)}
			type="button">
		
			{children}
		</button>
	);
}
TabsTrigger.displayName = "TabsTrigger";

export function TabsContent({ value, children, currentValue }) {
    if (currentValue !== value) return null;
    return (
        <div className="ui-tab-content" data-value={value}>
            {children}
        </div>
    );
}
TabsContent.displayName = "TabsContent";


