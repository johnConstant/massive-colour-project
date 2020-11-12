import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import DraggableColourBox from './DraggableColourBox';

const DraggableColourList = SortableContainer(({ colors, deleteColour }) => {
	return (
		<div style={{ height: '100%' }}>
			{colors.map((color, i) => (
				<DraggableColourBox
					index={i}
					color={color.color}
					name={color.name}
					key={color.name}
					deleteColour={() => deleteColour(color.name)}
				/>
			))}
		</div>
	);
});

export default DraggableColourList;
