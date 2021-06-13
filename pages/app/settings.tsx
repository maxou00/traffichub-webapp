import Cookies from "cookies";
import { GetServerSideProps } from "next";
import React from "react";
import Head from "next/head";
import jwt from "jsonwebtoken";
import { AuthProvider } from "../../components/AuthContext";
import { AppHeader } from "../../components/AppHeader";
import { database } from "../../core/database";
import { IUser } from "../../core";
import { SettingsZone } from "../../components/SettingsZone";
import styles from "../../styles/Dashboard.module.scss";
import { combineInjectors, userProfilePropsInjector } from "../../core/authentication-utils";

export default function Settings(props: { profile: IUser }) {
    return <AuthProvider profile={props.profile}>
        <div className={styles.dashboard}>
            <Head>
                <title>TrafficHub - Tableau de bord</title>
            </Head>
            <div className={styles.header}>
                <AppHeader/>
            </div>
            <div className={styles.content_wrapper}>
                <div className={styles.content}>
                    <SettingsZone/>
                </div>
            </div>
        </div>
    </AuthProvider>
}

export const getServerSideProps: GetServerSideProps = combineInjectors(userProfilePropsInjector);