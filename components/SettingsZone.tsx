import React from "react";
import styles from "../styles/SettingsZone.module.scss";
import { useAuthProfile } from "./AuthContext";
import { Form } from "semantic-ui-react";
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
        <Form onSubmit={onSubmit} className={styles.profile}>
            <Form.Input 
                name="firstName" 
                width="8"
                defaultValue={profile.firstName} 
                label="Prénom"
                type="text"/>
            <Form.Input 
                name="lastName" 
                width="8"
                defaultValue={profile.lastName} 
                label="Nom" 
                type="text"/>
            <Form.Input 
                name="email" 
                fluid
                defaultValue={profile.email} 
                label="Adresse électronique" 
                type="email"/>
            <Form.Input 
                name="password" 
                width="8"
                label="Mot de passe" 
                type="password"/>
            <Form.Input 
                name="password" 
                width="8"
                label="Confirmez votre mot de passe" 
                type="password"/>
            <div className={styles.actions}>
                <Form.Button className={styles.submit}>Mettre à jour mon profil</Form.Button>
            </div>
        </Form>
    </div>
}