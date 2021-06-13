import Cookies from "cookies";
import { GetServerSideProps } from "next";
import React from "react";
import Head from "next/head";
import jwt from "jsonwebtoken";
import { AuthProvider } from "../../../components/AuthContext";
import { AppHeader } from "../../../components/AppHeader";
import { database } from "../../../core/database";
import { IProject, IUser } from "../../../core";
import { Button, Form, Modal, Icon, Grid, GridColumn, GridRow, List, Header } from "semantic-ui-react";
import styles from "../../../styles/Dashboard.module.scss";

import { Container } from "semantic-ui-react";
import { useRouter } from "next/router";
import { combineInjectors, extractUser, extractUserFromContext, projectsByUser, userProfilePropsInjector } from "../../../core/authentication-utils";
import { Protected } from "../../../components/Protected";

export default function Projects(props: { profile: IUser, projects: IProject[] }) {
    const [creationDialogOpen, setCreationDialogOpen] = React.useState(false);
    const [creating, setCreating] = React.useState(false);
    const [errors, setErrors] = React.useState<any>({});

    const router = useRouter();

    function onProjectSelected(p: IProject) {
        router.push(`/app/projects/${p._id}`);
    }

    function onSubmit(ev: React.ChangeEvent<HTMLFormElement>) {
        ev.preventDefault();
        let content = {
            title: ev.target.projectTitle.value as string,
            comment: ev.target.projectComment.value as string,
        }

        let newErrors: any = {};
        if (!content.title) {
            newErrors.title = "Indiquez le titre de votre projet";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }


        setCreating(true);
        fetch(
            "/api/projects",
            {
                method: "POST",
                body: JSON.stringify(content),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        )
            .then((res) => res.json())
            .then((done) => {
                setCreating(false);
                if (done.success) {
                    router.push(`/app/projects/${done.data}`);
                }
                else {
                    setErrors(done.errors);
                }
            })
    }

    return <AuthProvider profile={props.profile}>
        <Protected>
            <div className={styles.dashboard}>
                <Head>
                    <title>TrafficHub - Mes Projets</title>
                </Head>
                <div>
                    <AppHeader />
                </div>
                <div className={styles.content_wrapper}>
                    <Container>
                        <Grid>
                            <GridRow>
                                <GridColumn width="sixteen">
                                    <div className={styles.content}>
                                        <Header size="huge" color="blue">
                                            Mes Projets
                                        </Header>
                                    </div>
                                </GridColumn>
                            </GridRow>
                            {props.projects.length > 0 && <GridRow>
                                <GridColumn width="sixteen">
                                    <List>
                                        {
                                            props.projects.map((p) => {
                                                return <List.Item onClick={() => onProjectSelected(p)} key={p._id}>
                                                    <List.Content>
                                                        <List.Header>
                                                            <Header color="grey" size="large">{p.title}</Header>
                                                        </List.Header>
                                                        <List.Description>
                                                            {p.comment}
                                                        </List.Description>
                                                    </List.Content>
                                                </List.Item>
                                            })
                                        }
                                    </List>
                                </GridColumn>
                            </GridRow>}
                            {
                                props.projects.length > 0 && <GridRow>
                                    <GridColumn width="sixteen">
                                        <Button color="blue" onClick={() => setCreationDialogOpen(true)}>
                                            <Icon name="add" style={{color: 'white'}}/>
                                            Créer un nouveau projet
                                        </Button>
                                    </GridColumn>
                                </GridRow>
                            }
                            {
                                props.projects.length === 0 && <GridRow>
                                    <GridColumn width="sixteen">
                                        <p>Vous n'avez encore créé aucune application.</p>
                                        <Button color="blue" inverted onClick={() => setCreationDialogOpen(true)}>
                                            <Icon name="add" style={{color: 'white'}}/>
                                            Créer mon premier projet
                                        </Button>
                                    </GridColumn>
                                </GridRow>
                            }
                        </Grid>
                    </Container>
                    <Modal open={creationDialogOpen} onClose={() => setCreationDialogOpen(false)}>
                        <Modal.Header>Créer un projet</Modal.Header>
                        <Modal.Content>
                            <Form onSubmit={onSubmit}>
                                <Form.Input error={errors.title} type="text" label="Titre de votre projet" name="projectTitle" required />
                                <Form.TextArea error={errors.comment} label="Commentaire" name="projectComment"></Form.TextArea>
                                <Form.Button loading={creating} color="orange" onClick={() => setCreating(true)}>
                                    Créer le projet
                                </Form.Button>
                            </Form>
                        </Modal.Content>
                    </Modal>
                </div>
            </div>
        </Protected>
    </AuthProvider>
}

export const getServerSideProps: GetServerSideProps = combineInjectors(userProfilePropsInjector, projectsByUser);