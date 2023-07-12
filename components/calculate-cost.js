import { useState } from 'react';
import styles from './calculate-cost.module.css'

let nextIdIndividual = 0;
let nextIdCommunal = 0;
export default function Form() {
    const [subtotal , setSubtotal] = useState('');
    const [tax, setTax] = useState('');
    const [tip, setTip] = useState('');
    const [participant, setParticipant] = useState(1);
    const [IndividualItemCost, setIndividualItemCost] = useState('');
    const [IndividualItemList, setIndividualItemList] = useState([]);
    const [communalItemCost, setCommunalItemCost] = useState('');
    const [communalItemList, setCommunalItemList] = useState([]);
    const [showCommunalItemSection, setShowCommunalItemSection] = useState(false)

    function setDefaultTaxTip(subtotal) {
        setTax(parseFloat(subtotal * .101).toFixed(2));
        setTip(parseFloat(subtotal * .15).toFixed(2));
    }

    return (
        <form className={styles.calculationForm} action="https://account.venmo.com">
            <h1>Bill Divider</h1>
            <div className={styles.formSection} id='billSummary'>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel}> Subtotal: </label>
                        <span>$ </span>
                        <input className={styles.formInput} type = "text" inputMode="decimal" value = {subtotal} onChange = {e => {
                            setSubtotal(e.target.value);
                            setDefaultTaxTip(e.target.value);
                        }} />
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel}> Tax (default 10.1%): </label>
                    <span>$ </span>
                    <input className={styles.formInput} type = "text" inputMode="decimal" value = {tax} onChange = {e => setTax(e.target.value)} />
                </div>
                <div className={styles.formDiv}>
                    <label className={styles.formLabel}> Tip (default 15%): </label>
                    <span>$ </span>
                    <input className={styles.formInput} type = "text" inputMode="decimal" value = {tip} onChange = {e => setTip(e.target.value)} />
                </div>
            </div>
            
            <div div className={styles.formSection} id='individualItem'>
                <div className={styles.formDiv} id='individualItemInput'>
                    <label className={styles.formLabel}> Individual Item Cost: </label>
                    <span>$ </span>
                    <input
                        className={styles.formInput}
                        type = "text"
                        inputMode="decimal"
                        value={IndividualItemCost}
                        onChange={e => setIndividualItemCost(e.target.value)}
                    />
                    <button className={styles.addItemButton} type="button" onClick={() => {
                        setIndividualItemList([
                        ...IndividualItemList,
                        { id: nextIdIndividual++, itemCost: IndividualItemCost }
                        ]);
                        setIndividualItemCost("");
                    }}>Add</button>
                    
                </div>
                <div className={styles.formList} id='individualItemList'>
                    <label>Individual Item List:</label>
                    <ul>
                        {IndividualItemList.map(item => (
                            <li className={styles.listItem} key={item.id}>
                                $ {item.itemCost}{' '}
                                <button onClick={() => {
                                    setIndividualItemList(
                                        IndividualItemList.filter(a =>
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

            <br/>
            <button type="button" onClick={() => {
                setShowCommunalItemSection(!showCommunalItemSection);
            }}
                >{ showCommunalItemSection ? "Hide Communal Items" : "Show Communal Items" }
            </button>

            { showCommunalItemSection ?
                <div className={styles.formSection} id='communalItem'>
                    <div className={styles.formDiv} id='communalParticipantInput'>
                        <label className={styles.formLabel}> # of Participants: </label>
                        <input
                            className={styles.participantInput}
                            type = "text"
                            inputMode="numeric"
                            value={participant}
                            onChange={e => setParticipant(e.target.value)}
                        />
                    </div>
                    <div className={styles.formDiv} id='communalItemInput'>
                        <label className={styles.formLabel}> Communal Item Cost: </label>
                        <span>$ </span>
                        <input
                            className={styles.formInput}
                            type = "text"
                            inputMode="decimal"
                            value={communalItemCost}
                            onChange={e => setCommunalItemCost(e.target.value)}
                        />
                        <button className={styles.addItemButton} type="button" onClick={() => {
                            setCommunalItemList([
                            ...communalItemList,
                            { id: nextIdCommunal++, communalItemCost: communalItemCost }
                            ]);
                            setCommunalItemCost("");
                        }}>Add</button>
                        
                    </div>
                    <div className={styles.formList} id='communalItemList'>
                        <label>Communal Item List:</label>
                        <ul>
                            {communalItemList.map(item => (
                                <li className={styles.listItem} key={item.id}>
                                    $ {item.communalItemCost}{' '}
                                    <button onClick={() => {
                                        setCommunalItemList(
                                            communalItemList.filter(a =>
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
            : null }
            
            <div className={styles.formDiv}>
                <label className={styles.formLabel}> Amount Owed: </label>
                $ {calculateAmount(parseFloat(subtotal), parseFloat(tax), parseFloat(tip), parseFloat(participant), IndividualItemList, communalItemList).toFixed(2)}
            </div>

            <input type="submit" value="Go to Venmo" />
        </form>
    );
}



function calculateAmount(subtotal, tax, tip, participant, individualItemList, communalItemList) {
    let individualItemCostSum = individualItemList.reduce((partialSum, a) => partialSum + parseFloat(a.itemCost), 0);
    let communalItemCostSum = communalItemList.reduce((partialSum, a) => partialSum + parseFloat(a.communalItemCost), 0);
    let result = parseFloat(individualItemCostSum + communalItemCostSum / participant + (tax + tip) * ((individualItemCostSum + communalItemCostSum / participant) / subtotal));
    if (isNaN(result)){
        return 0;
    } else {
        return result;
    } 
}


