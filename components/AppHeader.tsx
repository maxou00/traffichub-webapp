import React from "react";
import Link from "next/link";
import styles from "../styles/AppHeader.module.scss";

export function AppHeader() {
    return <div className={styles.appHeader}>
        <div className={styles.logo_wrapper}>
            <span className={styles.title}>TrafficHub</span>
        </div>
        <div className={styles.right}>
            <div className={styles.navlink}>
                <Link href="/app/dashboard">Tableau de bord</Link>
            </div>
            <div className={styles.navlink}>
                <Link href="/app/projects">Projets</Link>
            </div>
            <div className={styles.navlink}>
                <Link href="/app/settings">Paramètres</Link>
            </div>
            <div className={styles.navlink}>
                <Link href="/app/profile">Notifications</Link>
            </div>
        </div>
    </div>
}
