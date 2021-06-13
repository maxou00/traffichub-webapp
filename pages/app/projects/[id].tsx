import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { Protected } from "../../../components/Protected";
import styles from "../../../styles/Dashboard.module.scss";
import { AuthProvider } from "../../../components/AuthContext";
import { AppHeader } from "../../../components/AppHeader";
import { Container, Grid, GridRow, GridColumn, Header, List } from "semantic-ui-react";
import { combineInjectors, extractUserFromContext, InjectorProps, singleProjectByUser, userProfilePropsInjector } from "../../../core/authentication-utils";
import { database } from "../../../core/database";
import { IProject, IUser } from "../../../core";
import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";
import { ProjectTrackers } from "../../../components/ProjectTrackers";

export default function SingleProject(props: {profile: IUser, project?: IProject}) {
    const router = useRouter();

    React.useEffect(() => {
        if(!props.project) {
            router.replace("/app/projects");
        }
    }, []);

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
                        <div>
                            <Header>
                                {props.project.title}
                            </Header>
                            <Header>
                                {props.project.comment}
                            </Header>
                        </div>
                        <div>
                            <List>
                                <List.Item>
                                    <List.Content>
                                        <List.Header>Points de suivi</List.Header>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <List.Header>Visites</List.Header>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <List.Header>Journaux</List.Header>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <List.Header>Intégration</List.Header>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </div>
                        <div>
                            <ProjectTrackers project={props.project}/>
                        </div>
                    </Container>
                </div>
            </div>
        </Protected>
    </AuthProvider>
}

export const getServerSideProps: GetServerSideProps = combineInjectors(userProfilePropsInjector, singleProjectByUser)