import {createStore} from 'redux'
import reducers from "./reducers/index"
import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(
    reducers,
    {},
    )

export default store