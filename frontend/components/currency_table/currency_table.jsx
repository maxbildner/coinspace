import React from 'react';
import { Fragment } from 'react';

class CurrencyTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props

        // debugger
        return (
            <>
                <table className="currencies">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>price</th>
                            <th>change</th>
                            <th>chart</th>
                            <th>trade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {React.Children.toArray(children).map((child, idx) => (
                            <Fragment key={idx}>
                                <tr key={idx}>
                                    <td>{idx}</td>
                                    <td>{child.name} {child.props.symbol}</td>
                                    <td>{child.props.price}</td>
                                    <td>{child.props.change}</td>
                                    <td>{child.chart}</td>
                                    {/* <td><!-- TODO button --></td> */}
                                </tr>
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </>
        );
    }
}

export default CurrencyTable;