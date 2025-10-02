"use client"
"use client";
import { useState } from "react";

export function Tabs({ defaultValue, children, className = "" }) {
    const [value, setValue] = useState(defaultValue);
    const enhanceChild = (child) => {
        if (!child || !child.type) return child;
        if (child.type.displayName === "TabsList") {
            return { ...child, props: { ...child.props, value, setValue } };
        }
        if (child.type.displayName === "TabsContent") {
            return { ...child, props: { ...child.props, current: value } };
        }
        return child;
    };
    return (
        <div className={`ui-tabs ${className}`.trim()} data-value={value}>
            {Array.isArray(children) ? children.map(enhanceChild) : enhanceChild(children)}
        </div>
    );
}

export function TabsList({ children, value, setValue }) {
	return (
		<div className="ui-tabs-list">
			{Array.isArray(children)
				? children.map((child) =>
						child.type?.displayName === "TabsTrigger"
							? { ...child, props: { ...child.props, current: value, setValue } }
							: child
				  )
				: children}
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


