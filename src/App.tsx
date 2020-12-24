import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import TodoA from '../src/components/TodoA'

const App:React.FC = () => {
  return (
<div>
  <Route path={['/', '/active', '/completed']} component={TodoA} exact></Route>
</div>
  )
}

export default App;
