import { NavigationActions } from 'react-navigation';
const config = {};
export function setNavigator(nav) {
    if (nav) {
        config.navigator = nav;
    }
}
export function navigate(routeName, childRoutes, params, ) {    
    if (config.navigator && routeName) {
        // let childRoutesNav = childRoutes.map(route => (
        //     { action: NavigationActions.navigate({ routeName: route }) }
        // ))
        // //  console.log(childRoutesNav);
        // childRoutesNav = childRoutesNav[0];
      
        let action = NavigationActions.navigate({ routeName: routeName, action: NavigationActions.navigate({ routeName: childRoutes }), params })
  //     console.log(action);
        config.navigator.dispatch(action);
        /**
         * NavigationActions.navigate({
    routeName: 'YOUR_STACK',
    action: NavigationActions.navigate({ routeName: 'YOUR_STACK-subRoute' })
    })
         * 
         */
    }
}
export function resetStack() {

}
export function goBack() {
    if (config.navigator) {
        let action = NavigationActions.back({});
        config.navigator.dispatch(action);
    }
}