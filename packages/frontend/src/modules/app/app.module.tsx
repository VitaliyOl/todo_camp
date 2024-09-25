import * as React from 'react';
import TodoContainer from '../../components/TodoContainer/TodoContainer';

const App: React.FunctionComponent = (): React.ReactElement => {

	return (
		<>
			<h1>Todo project</h1>			
			<TodoContainer />
		</>
	);
};

export default App;