import { useState } from 'react';
import styles from './calculate-cost.module.css'

let nextItemId = 0;
let nextSharedItemId = 0;
export default function Form() {
    const [subtotal , setSubtotal] = useState('');
    const [tax, setTax] = useState('');
    const [tip, setTip] = useState('');
    const [itemCost, setItemCost] = useState('');
    const [itemList, setItemList] = useState([]);
    const [sharedItemCost, setSharedItemCost] = useState('');
    const [shareeCount, setShareeCount] = useState('');
    const [sharedItemList, setSharedItemList] = useState([]);

    function setDefaultTax(subtotal) {
        setTax(parseFloat(subtotal * .101).toFixed(2));
    }

    return (
        <form className={styles.calculationForm} action="venmo://paycharge">
            <h1 className={styles.header}>Bill Divider</h1>
            
            <div className={styles.inputSection} id='item'>
                <h2>
                    Individual Items
                </h2>
                <div className={styles.inputDiv} id='itemInput'>
                    <label className={styles.label}> Item Cost: </label>
                    <div className={styles.inputContainer}>
                        <span>$ </span>
                        <input
                            className={styles.addItemInput}
                            type = "text"
                            inputMode="decimal"
                            value={itemCost}
                            onChange={e => setItemCost(e.target.value)}
                        >
                        </input>
                    </div>
                </div>
                <div className={styles.addItemDiv}>
                    <button className={styles.addItemButton} type="button" onClick={() => {
                        setItemList([
                        ...itemList,
                        { id: nextItemId++, itemCost: itemCost }
                        ]);
                        setItemCost("");
                    }}>Add item to list</button>
                </div>
                <div className={styles.itemList} id='itemList'>
                    <label className={styles.itemListLabel}>Item List:</label>
                    <ul>
                        {itemList.map(item => (
                            <li className={styles.listItem} key={item.id}>
                                $ {item.itemCost}{' '}
                                <button onClick={() => {
                                    setItemList(
                                        itemList.filter(a =>
                                        a.id !== item.id
                                        )
                                    );
                                }}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles.inputSection} id='sharedItem'>
                <h2>
                    Shared Items
                </h2>
                
                <div className={styles.inputDiv} id='sharedItemInput'>
                    <label className={styles.label}> Shared Item Cost: </label>
                    <div className={styles.inputContainer}>
                        <span>$ </span>
                        <input
                            className={styles.addItemInput}
                            type = "text"
                            inputMode="decimal"
                            value={sharedItemCost}
                            onChange={e => setSharedItemCost(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.inputDiv} id='shareeCountInput'>
                    <label className={styles.label}> # of People Sharing: </label>
                    <div className={styles.inputContainer}>
                        <span>&nbsp;&nbsp; </span>
                        <input
                            className={styles.input}
                            type = "text"
                            inputMode="numeric"
                            value={shareeCount}
                            onChange={e => setShareeCount(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.addItemDiv}>
                    <button className={styles.addItemButton} type="button" onClick={() => {
                        setSharedItemList([
                        ...sharedItemList,
                        { id: nextSharedItemId++, sharedItemCost: sharedItemCost, shareeCount: shareeCount}
                        ]);
                        setSharedItemCost("");
                    }}>Add Item To List</button>
                </div>
                <div className={styles.itemList} id='sharedItemList'>
                    <label className={styles.itemListLabel}>Shared Item List:</label>
                    <ul>
                        {sharedItemList.map(item => (
                            <li className={styles.listItem} key={item.id}>
                                $ {item.sharedItemCost}, shared {item.shareeCount > 2 ? "among": "between"} {item.shareeCount} people.{' '}
                                <button onClick={() => {
                                    setSharedItemList(
                                        sharedItemList.filter(a =>
                                        a.id !== item.id
                                        )
                                    );
                                }}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles.inputSection} id='billSummary'>
                <h2>Bill Summary</h2>
                <div className={styles.inputDiv}>
                    <label className={styles.label}> Subtotal: </label>
                        <div className={styles.inputContainer}>
                            <span>$ </span>
                            <input className={styles.input} type = "text" inputMode="decimal" value = {subtotal} onChange = {e => {
                                setSubtotal(e.target.value);
                                setDefaultTax(e.target.value);
                            }} />
                        </div>
                </div>
                <div className={styles.inputDiv}>
                    <label className={styles.label}> Tax (Default 10.1%): </label>
                    <div className={styles.inputContainer}>
                        <span>$ </span>
                        <input className={styles.input} type = "text" inputMode="decimal" value = {tax} onChange = {e => setTax(e.target.value)} />
                        
                    </div>
                </div>
                
                <div className={styles.inputDiv}>
                    <label className={styles.label}> Tip: </label>
                    <div className={styles.inputContainer}>
                        <span>$ </span>
                        <input className={styles.input} type = "text" inputMode="decimal" value = {tip} onChange = {e => setTip(e.target.value)} />
                    </div>
                </div>
                <div className={styles.selectionDiv}>
                    <button className={styles.tipPercentageButton} type="button" onClick={() => {
                        setTip(roundToHundredth(subtotal * 0.15));
                    }}>15%</button>
                    <button className={styles.tipPercentageButton} type="button" onClick={() => {
                        setTip(roundToHundredth(subtotal * 0.18));
                    }}>18%</button>
                    <button className={styles.tipPercentageButton} type="button" onClick={() => {
                        setTip(roundToHundredth(subtotal * 0.20));
                    }}>20%</button>
                </div>
            </div>

            <br/>
            <div className={styles.inputDiv}>
                <label className={styles.label}> <b>Amount Owed:</b> </label>
                $ {calculateAmount(parseFloat(subtotal), parseFloat(tax), parseFloat(tip), itemList, sharedItemList).toFixed(2)}
            </div>
            

            <input className={styles.formButton} type="submit" value="Go to Venmo" />
        </form>
    );
}

function calculateAmount(subtotal, tax, tip, itemList, sharedItemList) {
    let itemCostSum = itemList.reduce((partialSum, a) => partialSum + parseFloat(a.itemCost), 0);
    let sharedItemCostSum = sharedItemList.reduce((partialSum, a) => partialSum + parseFloat(a.sharedItemCost / a.shareeCount), 0);
    let result = parseFloat(itemCostSum + sharedItemCostSum + (tax + tip) * ((itemCostSum + sharedItemCostSum) / subtotal));
    if (isNaN(result)){
        return 0;
    } else {
        return result;
    } 
}

function roundToHundredth(amount) {
    return parseFloat(amount).toFixed(2);
}
