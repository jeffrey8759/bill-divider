import { useState } from 'react';
import styles from './calculate-cost.module.css'

export default function Form() {
    const [subtotal , setSubtotal] = useState(null);
    const [tax, setTax] = useState(null);
    const [tip, setTip] = useState(null);
    const [individualCost, setIndividualCost] = useState(null);

    function setDefaultTaxTip(subtotal) {
        setTax(parseFloat(subtotal * .101).toFixed(2));
        setTip(parseFloat(subtotal * .15).toFixed(2));
    }

    return (
        <form className={styles.calculationForm}>
            <div className={styles.formDiv}>
                <label className={styles.formLabel}> Subtotal: </label>
                <span>$ </span>
                <input className={styles.formInput} type = "number" inputmode="decimal" value = {subtotal} onChange = {e => {
                    setSubtotal(e.target.value);
                    setDefaultTaxTip(e.target.value);
                }} />
            </div>
            <div className={styles.formDiv}>
                <label className={styles.formLabel}> Tax (default 10.1%): </label>
                <span>$ </span>
                <input className={styles.formInput} type = "number" inputmode="decimal" defaultValue = {tax} value = {tax} onChange = {e => setTax(e.target.value)} />
            </div>
            <div className={styles.formDiv}>
                <label className={styles.formLabel}> Tip (default 15%): </label>
                <span>$ </span>
                <input className={styles.formInput} type = "number" inputmode="decimal" defaultValue = {tip} value = {tip} onChange = {e => setTip(e.target.value)} />
            </div>
            <div className={styles.formDiv} id='itemList'>
                <label className={styles.formLabel}> Individual Cost: </label>
                <span>$ </span>
                <input className={styles.formInput} type = "number" inputmode="decimal" value = {individualCost} onChange = {e => setIndividualCost(e.target.value)} />
            </div>
            <div className={styles.formDiv}>
                <label className={styles.formLabel}> Amount Owed: </label>
                $ {calculateAmount(parseInt(subtotal), parseInt(tax), parseInt(tip), parseInt(individualCost))}
            </div>
        </form>
    );
}

function handleAddItem(){

}

function calculateAmount(subtotal, tax, tip, individualCost) {
    return parseFloat(individualCost + (individualCost / subtotal) * (tax + tip)).toFixed(2);
}


