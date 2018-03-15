import React from 'react';
import { format } from 'date-fns';
import s from './styles.css';
import Button from '../../common/Button';

const GatewayTransaction = (props) => {
  const {
    openDetailsPopup
  } = props;

  const {
    id,
    status,
    currency,
    totalAmount,
    expiredOn,
    txnId,
    timestamp
  } = props.paymentData;

  const renderLabel = (status) => {
    switch (status) {
      case '-1':
        return (<span className={s.failure}>CANCELLED / TIMED OUT</span>);
      case '0':
        return (<span className={s.pending}>WAITING FOR FUNDS</span>);
      case '1':
        return (<span className={s.success}>CONFIRMED, SENDING</span>);
      case '100':
        return (<span className={s.success}>COMPLETE</span>);
      default:
        return null;
    }
  };

  const renderName = () => (
    <div className={s.name}>{currency} purchase ({totalAmount} {currency})</div>
  );

  return (
    <div className={s.transaction}>
      <div className={s.info}>
        <div className={s.date}>{format(new Date(timestamp * 1000), 'DD/MM/YYYY hh:mm:ss')}
          <span className={s.dateCaption}>Expire on: </span>
          {format(new Date(expiredOn * 1000), 'DD/MM/YYYY hh:mm:ss')}
        </div>
        {renderName()}
        <div className={s.address}>
          <span>Transaction ID — {txnId}</span>
          {renderLabel(status)}
        </div>
        <div className={s.button}>
          <Button size="small" onClick={() => openDetailsPopup(id)}>Show details</Button>
        </div>
      </div>
    </div>
  );
};

export default GatewayTransaction;
