import React from 'react';
import { useDispatch } from 'react-redux';
import { sortRecipes } from '../../redux/actions/actions';

export default function Sort() {
	const dispatch = useDispatch();
	const optionSort = ['A-Z', 'Z-A', '0-100', '100-0'];

	function handleChange(e) {
		dispatch(sortRecipes(e.target.value));
		e.target.value = 'default';
	}

	return (
		<select name="SORT" defaultValue="default" onChange={handleChange}>
			<option key="default" hidden value="default" defaultValue="default">
				SORT
			</option>
			{optionSort.map((option) => {
				return (
					<option key={option} value={option}>
						{option}
					</option>
				);
			})}
		</select>
	);
}
