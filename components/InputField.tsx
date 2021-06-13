import React from "react";
import styles from "./InputField.module.scss";

interface InputFieldProps {
    id?: string;
    name: string;
    type: string;
    label?: string;
    hint?: string;
    error?: string;
    required?: boolean;
    value?: string;
    defaultValue?:string;
    onChange?(ev: React.ChangeEvent<HTMLInputElement>): void;
}

export function InputField(props: InputFieldProps) {
    return <div className={styles.input__wrapper}>
        {
            props.label && <span className={styles.label}>{props.label}</span>
        }
        <div className={styles.field}>
            <input 
                id={props.id} 
                type={props.type} 
                name={props.name}
                required={props.required} 
                value={props.value} 
                defaultValue={props.defaultValue} 
                onChange={props.onChange}/>
        </div>
        {
            props.hint && <span className={styles.hint}>{props.hint}</span>
        }
        {
            props.error && <span className={styles.error}>{props.error}</span>
        }
    </div>
}