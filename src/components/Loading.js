import React from 'react'
import PropTypes from 'prop-types'

export default class Loading extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired
    }

    static defaultProps = {
        text: "Loading"
    }

    state= {
        text: this.props.text
    }

    componentDidMount () {
        const stopper = this.props.text + '...'
        this.interval = setInterval (() => {
            this.state.text === stopper 
                ? this.setState(() => ({ text: this.props.text }))
                : this.setState(({ text }) => ({ text: text + '.' }))
        }, 300)
    }

    componetWillUnmount () {
        window.clearInterval(this.interval)
    }

    render() {
        return (
            <div className='container'>
                <p className='text-center'>{this.state.text}</p>
            </div>
        )
    }
}



/**
 * If we want the Loading component to say 'Loading', then we don't really need to do anything. We can just use the Loading component as we normally would.
   But if we want to change that, we can go ahead & pass in a text prop for whatever we want to say.
 */

/**
 * The UI is gonna show:
    Loading
    Loading.
    Loading..
    Loading...
    Loading
 */


/**
   
*    this.setState(() => ({ text: this.props.text }))
        : this.setState(({ text }) => ({ text: text + '.' }))

   If this.state.text === stopper, then we want to call setState with text being whatever the initial this.props.text was.
            this.setState(() => ({ text: this.props.text }))

   But if the text on our state doen't match the stopper, then text is now gonna be whatever the previous text property on the state was plus a dot (.)
            this.setState(({ text }) => ({ text: text + '.' }))

   Then we want do do some cleanup.

            componetWillUnmount () {
                window.clearInterval(this.interval)
            }

*/

        