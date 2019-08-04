class CurrencyTable {
    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props

        return (
            <>
                <table className="currencies">
                    <thead>
                        <th>#</th>
                        <th>name</th>
                        <th>price</th>
                        <th>change</th>
                        <th>chart</th>
                        <th>trade</th>
                    </thead>
                    <tbody>
                        {React.Children.toArray(children).map((child, idx) => (
                            <>
                                <tr>
                                    <td>{idx}</td>
                                    <td>{child.name}</td>
                                    <td>{child.price}</td>
                                    <td>{child.change}</td>
                                    <td>{child.chart}</td>
                                    {/* <td><!-- TODO button --></td> */}
                                </tr>
                                
                            </>
                        ))}
                    </tbody>
                </table>
            </>
        );
    }
}

export default CurrencyTable;