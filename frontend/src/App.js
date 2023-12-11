import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/PriceConsumerV3.json';
import { ethers } from 'ethers';

// this is the address of the deployed contract on sepolia
const contractAddress = '0xb897fa528853A6Be65dE636A341992bDfDd39AbC';

const abi = contract.abi;

function App() {
    const [selectedPair, setSelectedPair] = useState('BTC/USD');
    const [price, setPrice] = useState('');
    const [currentAccount, setCurrentAccount] = useState(null);

    // Check if wallet is connected
    const checkWalletIsConnected = async () => {
        const { ethereum } = window;
        if (!ethereum) {
            console.log('🦊 Install the Metamask browser extension.');
            return;
        } else {
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length !== 0) {
            const account = accounts[0];
            setCurrentAccount(account);
        } else {
        }
    };

    // Connect wallet - metamask
    const connectWalletHandler = async () => {
        const { ethereum } = window;
        if (!ethereum) {
            return;
        }

        try {
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });

            setCurrentAccount(accounts[0]);
        } catch (err) {
            console.log(err);
        }
    };

    // Fetch price from Chainlink of sepolida feeds
    const fetchPrice = async (event) => {
        event.preventDefault();
      if (!currentAccount) {
        alert("Please connect your wallet first.");
        return;
      }
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const priceBigNumber = await contract.getLatestPrice(selectedPair);
        
        // Format the price as needed
        const price = ethers.utils.formatUnits(priceBigNumber, 8);
        let displayPrice;
        // handle this pair specially because it is not a USD pair
        if (selectedPair === 'BTC/ETH') {
            const priceFormatted = parseFloat(ethers.utils.formatUnits(priceBigNumber, 18));
                displayPrice = (priceFormatted).toFixed(2);
                setPrice(displayPrice);
        } else {
            displayPrice = price.split('.')[0];
            setPrice('$' + displayPrice);
        }

      } catch (err) {
          console.log(err);
      }
    };

    // Handle radio button change
    const handleRadioChange = (event) => {
        setSelectedPair(event.target.value);
        setPrice('');
    };
    
    // Connect wallet - metamask
    const connectWalletButton = () => {
        return (
            <div>
                <button
                    onClick={connectWalletHandler}
                    className='cta-button connect-wallet-button'>
                    Connect Wallet
                </button>
            </div>
        );
    };

    // Check if wallet is connected
    useEffect(() => {
        checkWalletIsConnected();
    }, []);

    return (
        <div className="container bg-primary text-white vh-100 d-flex align-items-center justify-content-center">
            <div className="card shadow p-4 mb-5 bg-white rounded" style={{ width: '100%', maxWidth: '600px' }}>
                <header className='text-center mb-4'>
                    <h2>BCDV4023 Week 3 Assignment by Xiaogang Dong 101492108</h2>
                    <hr></hr>
                    <div className='mb-3'>
                        <h3>Chainlink - Conversion Pair</h3>
                        
                        <form>
                            <div className="radio">
                                <label>
                                    <input type="radio" value="BTC/USD" checked={selectedPair === 'BTC/USD'} onChange={handleRadioChange} />
                                    BTC/USD
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" value="ETH/USD" checked={selectedPair === 'ETH/USD'} onChange={handleRadioChange} />
                                    ETH/USD
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" value="LINK/USD" checked={selectedPair === 'LINK/USD'} onChange={handleRadioChange} />
                                    LINK/USD
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" value="BTC/ETH" checked={selectedPair === 'BTC/ETH'} onChange={handleRadioChange} />
                                    BTC/ETH
                                </label>
                            </div>
                            <button type="button" onClick={fetchPrice} className='btn btn-info mb-3'>Get Answer From Price Oracle</button>
                        </form>
                    </div>
                    <div className='result'>
                        <h3>Result</h3>
                        {price && <p>{selectedPair} ➡️ {price}</p>}
                    </div>
                </header>
                {/* Conditionally render the Connect Wallet button */}
                {!currentAccount && connectWalletButton()}
                <div className="footer-note text-muted mt-5">
                    <p>Note: The value returned from Chainlink has been converted for better readability.</p>
                </div>
            </div>
        </div>
    );
    
}

export default App;
