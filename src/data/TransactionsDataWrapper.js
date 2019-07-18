import React from 'react';

import { connect } from 'react-redux';
import { getTransactions } from '../redux/selectors';
import { fetchTransactionsIfNecessary } from '../redux/actions';

class TransactionsDataWrapper extends React.Component {
    render(){
        if(this.props.transactions.length){
            return this.props.render(this.props.transactions)
        } else {
            return <div>Loading...</div>
        }


    }

    componentDidMount () {
        this.props.fetchTransactionsIfNecessary();
    }
}

const mapStateToProps = state => {
    return {
        transactions: getTransactions(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTransactionsIfNecessary: () => dispatch(fetchTransactionsIfNecessary())
    }
}

TransactionsDataWrapper.defaultProps = {
    transactions: []
}

export default connect (mapStateToProps, mapDispatchToProps)(TransactionsDataWrapper)