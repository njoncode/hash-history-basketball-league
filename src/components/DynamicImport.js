import { Component } from 'react'  // We are not import React bacuse ther is no JSx

export default class DynamicImport extends Component {
    state = {
        component: null
    }

    componentDidMount () {
        this.props.load()
            .then((mod) => this.setState(() => ({
                component: mod.default
            })))
    }
    render() {
        return this.props.children(this.state.component)
    }
}


 /**
*   DynamicImport
*  We are gonna have normal Home Component but instead of this being imported statically, we are gonna use DynamicImport.
   We are gonna use the same exact pattern we used both inside of our Articles Component as well as inside of our Teams component.
   Both of those components are responsible for getting the data & then they are gonna call their children with that data.

   So DynamicImport is gonna do the same where we will pass it a function except instead of getting some data, we are actually gonna get is component itself.
   And if the component is null, we wanna render our Loading Component & if the component is not null, we actually want to create the element itself passing in
   the props that are being passed to the Component when the element is created.

   Last thing we need is we want to pass the DynamicImport a prop (we call it a load) when this load prop is invoked, it's gonna use the DynmaicImport synatx to go & import the Component or module which is loacted at './Home'

                            const Home = (props) => (
                                <DynamicImport load={() => import('./Home')}>
                                    {(Component) => Component === null 
                                        ? <Loading/>
                                            : <Component {...props} />  
                                            }
                                </DynamicImport>
                                )

   */


/**
* When the component mounts, we will call this.props.load. That's gonna dynamically go & import that module & return us a promise
that when this promise resolves, will get us the module. We can then call setState & the component property on our state is gonna be mod.default.
Because we are using ES6 module, so we need to have the .default propery here.

And then, we want to call children passing it this.state.component. But instead of this being data now, it's actually gonna be the component itself
which is coming from the module that was imported when this.props.load was invoked.

*/