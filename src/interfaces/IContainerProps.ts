// ========= IContainerProps
// import all modules
import {ReactNode} from 'react';

export interface IContainerProps {
	children: ReactNode;
	size: number;
	relative?: boolean;
}
