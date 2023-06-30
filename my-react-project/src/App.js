import axios from 'axios';
import './App.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [customerName, setCustomerName] = useState('');
  const [price, setPrice] = useState(10);
  const [currency, setCurrency] = useState('SGD');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiryDate, setCardExpiryDate] = useState('DD/YYYY');
  const [cardCvv, setCardCvv] = useState('');
  const [disable, setDisable] = useState(false);

  const submitForm = async () => {
    try {
      setDisable(true)
      await axios({
        method: 'POST',
        url: 'http://localhost:5000/payment',
        data: {
          price,
          currency,
          customerName,
          cardHolderName,
          cardNumber,
          expiryDate: cardExpiryDate,
          cvv: cardCvv,
          referencedId: Math.random().toPrecision(8).toString()
        }
      })
      toast.success('Payment successfully')
    } catch (error) {
      const message = error.response.data.message;
      if (message.constructor === String) {
        toast.error(message)
      }

      if (message.constructor === Array) {
        message.forEach(item => {
          toast.error(item)
        })
      }
    } finally {
      setDisable(false)
    }
  }
  return (
    <div className="App">
      <h2>This is the title</h2>
      <div className="main">
        <form>
          <div class="order section">
            <div className="form-control">
              <input name="constomer-name" type="text" placeholder="Customer name" value={customerName} onChange={(e) => setCustomerName(e.target.value)}/>
            </div>
            <div className="price">
              <input name="price" type="number" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="AUD">AUD</option>
                <option value="EUR">EUR</option>
                <option value="THB">THB</option>
                <option value="HKD">HKD</option>
                <option value="SGD">SGD</option>
              </select>
            </div>
          </div>
          <div class="payment section">
            <div className="form-control">
              <input type="text" name="card-holder-name" placeholder="Card Holder Name" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)}/>
            </div>
            <div className="form-control">
              <input type="text" name="card-number" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}/>
            </div>
            <div className="form-control">
              <input type="text" name="card-expiry date" placeholder="Card Expiry Date" value={cardExpiryDate} onChange={(e) => setCardExpiryDate(e.target.value)}/>
            </div>
            <div className="form-control">
              <input type="text" name="card-cvv" placeholder="Cvv" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)}/>
            </div>
          </div>
          <button type="button" onClick={submitForm} disabled={disable}>Submit</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
