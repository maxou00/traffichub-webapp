import Cookies from "cookies";
import { GetServerSideProps } from "next";
import React from "react";
import Head from "next/head";
import jwt from "jsonwebtoken";
import { AuthProvider } from "../../components/AuthContext";
import { AppHeader } from "../../components/AppHeader";
import { database } from "../../core/database";
import { IUser } from "../../core";
import styles from "../../styles/Dashboard.module.scss";

import { Container } from "semantic-ui-react";
import { Protected } from "../../components/Protected";
import { combineInjectors, userProfilePropsInjector } from "../../core/authentication-utils";

export default function Dashboard(props: { profile: IUser }) {
    return <AuthProvider profile={props.profile}>
        <Protected>
            <div className={styles.dashboard}>
                <Head>
                    <title>TrafficHub - Tableau de bord</title>
                </Head>
                <div>
                    <AppHeader />
                </div>
                <div className={styles.content_wrapper}>
                    <Container>
                        <div className={styles.content}>
                            <h1>
                                Bienvenue, {' '}
                                {props.profile.firstName}
                            </h1>
                        </div>
                    </Container>
                </div>
            </div>
        </Protected>
    </AuthProvider>
}

export const getServerSideProps: GetServerSideProps = combineInjectors(userProfilePropsInjector);