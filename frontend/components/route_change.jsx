import React from "react";
import { withRouter } from "react-router";

// A simple component that shows the pathname of the current location
class RouteChange extends React.Component {
    constructor(props) {
        super(props);
        this.onRouteChanged = this.onRouteChanged.bind(this);

    }
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }

    componentDidMount() {
        this.onRouteChanged();
    }

    onRouteChanged() {
        const { match, location, history } = this.props;
        console.log("ROUTE CHANGED", match, location, history);
        $('html').attr('data-location', location.pathname);
    }

    render() {
        return (
            <></>
        );
    }
}

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
export default withRouter(RouteChange);