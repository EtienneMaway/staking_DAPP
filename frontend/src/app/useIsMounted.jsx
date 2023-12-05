/** @format */

import { useEffect, useState } from "react";

export function UseIsMounted() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	return mounted;
}
