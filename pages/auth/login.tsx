import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { InputField } from "../../components/InputField";
import styles from "../../styles/Login.module.scss";
import { Logo } from "../../components/Logo";
import { Form } from "semantic-ui-react";
import { database } from "../../core/database";

export default function Login() {
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState<any>({});
    const router = useRouter();

    function onSubmit(ev: React.ChangeEvent<HTMLFormElement>) {
        ev.preventDefault();
        let signup = {
            email: ev.target.email.value as string,
            password: ev.target.password.value as string
        }
        let newErrors: any = {};
        if (!signup.email) {
            newErrors.email = "Indiquez votre email";
        }
        if (!signup.password || signup.password.length < 8) {
            newErrors.password = "Votre mot de passe doit contenir au moins 08 caractères";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setLoading(true);
        fetch(
            "/api/auth/signin",
            {
                body: JSON.stringify(signup),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )
            .then((res) => res.json())
            .then((done) => {
                setLoading(false);
                if (done.success) {
                    if (window) {
                        window.localStorage.setItem("profile", JSON.stringify(done.data.profile));
                        window.localStorage.setItem("token", done.data.token);
                    }
                    router.replace("/app/dashboard");
                }
                else {
                    setErrors(done.errors);
                }
            })
    }

    return <div className={styles.login}>
        <Head>
            <title>TrafficHub - Connexion</title>
        </Head>
        <div className={styles.left}>
            <div className={styles.create_account}>
                <h1>Démarrez avec TrafficHub</h1>
                <div style={{ height: '16px' }}></div>
                <span>Commencez à optimiser vos sites, suivez votre traffic en temps réel et boostez votre productivité.</span>
                <div style={{ height: '32px' }}></div>
                <div className={styles.actions}>
                    <Link href="/auth/signup"><span className={styles.create}>commencer</span></Link>
                </div>
            </div>
        </div>
        <div className={styles.content_wrapper}>
            <div className={styles.content}>
                <div className={styles.logo_row}>
                    <Logo />
                    <h1>TrafficHub</h1>
                </div>
                <div style={{ height: '32px' }}></div>
                <h2>Connectez-vous à votre compte</h2>
                <div style={{ height: '32px' }}></div>
                <Form onSubmit={onSubmit} className={styles.login_form}>
                    <Form.Input error={errors.email} name="email" type="email" label="Adresse électronique" />
                    <div style={{ height: '8px' }}></div>
                    <Form.Input error={errors.password} name="password" type="password" label="Mot de passe" />
                    <div style={{ height: '32px' }}></div>
                    <Form.Button loading={loading} fluid color='blue' type="submit">Connexion</Form.Button>
                    <div style={{ height: '32px' }}></div>
                    <div className={styles.helps}>
                        <Link href="/auth/forgotten-password">Mot de passe oublié ?</Link>
                        <Link href="/auth/signup">Pas de compte ? commençer</Link>
                    </div>
                </Form>
            </div>
        </div>
    </div>
}