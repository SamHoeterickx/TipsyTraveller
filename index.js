import { registerRootComponent } from 'expo';

// import Home from './App/home/home.js';
import SelectionPages from './App/SelectionPages/SelectionPages';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(SelectionPages);
