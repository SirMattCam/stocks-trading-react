import React, { useState, useContext } from 'react';
import Modal from './Modal';
import SellBuyForm from './SellBuyForm';
import { StockContext } from '../pages/Home';
import TickerPriceDataWrapper from '../data/TickerPriceDataWrapper';

export default function StockRow(props) {
  const [selectedStock, setSelected] = useContext(StockContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [type, setType] = useState(0);

  const toggleModal = type => {
    setType(type);
    setIsModalVisible(!isModalVisible);
  };
  return (
    <div
      className='stock-list__grid-row'
      onClick={() => setSelected(props.symbol)}
    >
      <Modal isVisible={isModalVisible} closeCallback={toggleModal}>
        <SellBuyForm type={type} stock={props.symbol} />
      </Modal>

      {props.onDelete && (
        <div className='stock-list__grid-cell'>
          <a onClick={() => props.onDelete(props.symbol)}>
            <span className='stock-list__btn stock-list__btn--remove'>
              &ndash;
            </span>
          </a>
        </div>
      )}
      <div className='stock-list__grid-cell'>{props.symbol}</div>
      <div className='stock-list__grid-cell'>
        <TickerPriceDataWrapper symbol={props.symbol} />
      </div>
      <div className='stock-list__grid-cell'>
        <a onClick={() => toggleModal('buy')}>
          <span className='btn-transaction btn-transaction--buy'>buy</span>
        </a>
      </div>
      {props.amount && (
        <React.Fragment>
          <div className='stock-list__grid-cell'>
            <a onClick={() => toggleModal('sell')}>
              <span className='btn-transaction btn-transaction--sell'>
                sell
              </span>
            </a>
          </div>
          <div className='stock-list__grid-cell'>{props.amount}</div>
        </React.Fragment>
      )}
    </div>
  );
}
