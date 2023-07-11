import { ParamEditor } from './components/ParamEditor';
import { model, params } from './data';

function App() {
  return <ParamEditor params={params} model={model} />;
}

export default App;
