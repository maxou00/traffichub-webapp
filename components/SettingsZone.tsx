import React from "react";
import { InputField } from "./InputField";
import styles from "../styles/SettingsZone.module.scss";
import { useAuthProfile } from "./AuthContext";
import { IUser } from "../core";

export function SettingsZone() {
    const [errors, setErrors] = React.useState<any>({});
    const profile = useAuthProfile();

    function onSubmit( ev: React.ChangeEvent<HTMLFormElement> ){
        ev.preventDefault();

        let profileUpdate:IUser = {
            ...profile,
            firstName: ev.target.firstName.value as string,
            lastName: ev.target.lastName.value as string,
        }
    }

    return <div className={styles.settings_zone}>
        <div>
            <h2>Paramètres</h2>
        </div>
        <form onSubmit={onSubmit} className={styles.profile}>
            <InputField 
                name="firstName" 
                defaultValue={profile.firstName} 
                label="Prénom"
                type="text"/>
            <InputField 
                name="lastName" 
                defaultValue={profile.lastName} 
                label="Nom" 
                type="text"/>
            <InputField 
                name="email" 
                defaultValue={profile.email} 
                label="Adresse électronique" 
                type="email"/>
            <InputField 
                name="password" 
                label="Mot de passe" 
                type="password"/>
            <InputField 
                name="password" 
                label="Confirmez votre mot de passe" 
                type="password"/>
            <div className={styles.actions}>
                <button className={styles.submit}>Mettre à jour mon profil</button>
            </div>
        </form>
    </div>
}