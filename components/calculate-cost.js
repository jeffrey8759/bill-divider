import { useState } from 'react';
import styles from './calculate-cost.module.css'

export default function Form() {
    const [subtotal , setSubtotal] = useState(null);
    const [tax, setTax] = useState(null);
    const [tip, setTip] = useState(null);
    const [individualCost, setIndividualCost] = useState(null);

    function setDefaultTaxTip(subtotal) {
        setTax(subtotal * .10);
        setTip(subtotal * .15);
    }

    return (
        <form className={styles.calculationForm}>
            <div className={styles.formDiv}>
                <label className={styles.formLabel}> Subtotal: </label>
                <span>$</span>
                <input className={styles.formInput} type = "text" pattern = "/d*" value = {subtotal} onChange = {e => {
                    setSubtotal(e.target.value);
                    setDefaultTaxTip(e.target.value);
                }} />
            </div>
            <div className={styles.formDiv}>
                <label className={styles.formLabel}> Tax (default 10%): </label>
                <span>$</span>
                <input className={styles.formInput} type = "text" pattern = "/d*" defaultValue = {tax} value = {tax} onChange = {e => setTax(e.target.value)} />
            </div>
            <div className={styles.formDiv}>
                <label className={styles.formLabel}> Tip (default 15%): </label>
                <span>$</span>
                <input className={styles.formInput} type = "text" pattern = "/d*" defaultValue = {tip} value = {tip} onChange = {e => setTip(e.target.value)} />
            </div>
            <div className={styles.formDiv} id='itemList'>
                <label className={styles.formLabel}> Individual Cost: </label>
                <span>$</span>
                <input className={styles.formInput} type = "text" pattern = "/d*" value = {individualCost} onChange = {e => setIndividualCost(e.target.value)} />
            </div>
            <div className={styles.formDiv}>
                Amount Owed: ${calculateAmount(parseInt(subtotal), parseInt(tax), parseInt(tip), parseInt(individualCost))}
            </div>
        </form>
    );
}

function handleAddItem(){

}

function calculateAmount(subtotal, tax, tip, individualCost) {
    return parseFloat(individualCost + (individualCost / subtotal) * (tax + tip)).toFixed(2);
}


