"use client"
"use client";
import { useState } from "react";

export function Tabs({ defaultValue, children, className = "" }) {
	const [value, setValue] = useState(defaultValue);
	return (
		<div className={`ui-tabs ${className}`.trim()} data-value={value}>
			{Array.isArray(children)
				? children.map((child) =>
						child.type?.displayName === "TabsList"
							? { ...child, props: { ...child.props, value, setValue } }
							: child
				  )
				: children}
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

export function TabsContent({ value, children }) {
	return (
		<div className="ui-tab-content" data-value={value}>
			{children}
		</div>
	);
}
TabsContent.displayName = "TabsContent";


