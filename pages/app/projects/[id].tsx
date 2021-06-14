import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { Protected } from "../../../components/Protected";
import styles from "../../../styles/Dashboard.module.scss";
import { AuthProvider } from "../../../components/AuthContext";
import { AppHeader } from "../../../components/AppHeader";
import { Container, Header } from "semantic-ui-react";
import { combineInjectors, singleProjectByUser, userProfilePropsInjector } from "../../../core/authentication-utils";
import { IProject, IUser, IWebTracker } from "../../../core";
import { useRouter } from "next/router";
import { Button, Dropdown, Modal, Form } from "semantic-ui-react";
import { ProjectTrackers } from "../../../components/ProjectTrackers";
import { TrackingPointStats } from "../../../components/TrackingPointStats";

export default function SingleProject(props: { profile: IUser, project?: IProject, trackers: IWebTracker[] }) {
    const [selectedTracker, setSelectedTracker] = React.useState<IWebTracker | undefined>(props.trackers[0] || undefined);

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [isCreating, setIsCreating] = React.useState(false);
    const [errors, setErrors] = React.useState<any>({});

    const router = useRouter();

    React.useEffect(() => {
        if (!props.project) {
            router.replace("/app/projects");
        }
    }, []);

    function handleTrackerSelection(id: string) {
        let trackr = props.trackers.find((t) => t._id === id);
        setSelectedTracker(trackr);
    }

    function onCreate(ev: React.ChangeEvent<HTMLFormElement>) {
        ev.preventDefault();
        let content = {
            title: ev.target.trackerTitle.value,
            type: 'web',
            url: ev.target.url.value
        }

        let errs: any = {};
        if (!content.title) {
            errs.title = "Indiquez un titre pour rapidement retrouver ce projet";
        }
        if (!content.url) {
            errs.url = "Définissez l'url de ce suiveur afin d'éviter les usages intrusifs";
        }

        setErrors(errs);

        if (Object.keys(errs).length > 0) {
            return;
        }

        fetch(
            `/api/projects/${props.project._id}/tracker`,
            {
                method: 'POST',
                body: JSON.stringify(content),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        )
            .then((res) => res.json())
            .then((done) => {
                if (done) {
                    setIsCreating(false);
                    setDialogOpen(false);
                    router.reload();
                }
            })
    }

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
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Header color="blue" size="large">PROJET {props.project.title.toUpperCase()}</Header>
                                <div className="actions">
                                    <Dropdown selection value={selectedTracker._id} options={props.trackers.map((t) => {
                                        return {
                                            key: t._id,
                                            text: t.title,
                                            value: t._id
                                        }
                                    })} onChange={(ev, v) => handleTrackerSelection(v.value as string)}>
                                    </Dropdown>
                                    <Button color="blue" onClick={() => setDialogOpen(true)}>Créer un traqueur</Button>
                                </div>
                            </div>
                            <div>
                                <span>{props.project.comment}</span>
                            </div>
                        </div>
                        <div style={{ height: '24px' }}></div>
                        {
                            selectedTracker && <div>
                                <TrackingPointStats project={props.project} tracker={selectedTracker} />
                            </div>
                        }
                    </Container>
                </div>
            </div>
            <Modal open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <Modal.Header>
                    Ajouter un traqueur
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={onCreate}>
                        <Form.Input name="trackerTitle" label="Titre du point de suivi" type="text" />
                        <Form.Input name="url" label="Lien du site sur lequel vous définissez votre traqueur" type="text" />
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Form.Button color="blue">
                                Créer ce point de suivi
                            </Form.Button>
                        </div>
                    </Form>
                </Modal.Content>
            </Modal>
        </Protected>
    </AuthProvider>
}

export const getServerSideProps: GetServerSideProps = combineInjectors(userProfilePropsInjector, singleProjectByUser)