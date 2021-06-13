import React from "react";
import { IProject, IWebTracker } from "../core";
import { Grid, GridRow, GridColumn, Header, Button, Modal, Form, List } from "semantic-ui-react";
import { useRouter } from "next/router";

export function ProjectTrackers(props: { project: IProject, trackers: IWebTracker[] }) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [isCreating, setIsCreating] = React.useState(false);
    const [errors, setErrors] = React.useState<any>({});

    const router = useRouter();

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

    return <Grid>
        <GridRow>
            <GridColumn width="sixteen">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Header size="large">Point de suivi</Header>
                    <Button color="blue" onClick={() => setDialogOpen(true)}>Créer</Button>
                </div>
            </GridColumn>
        </GridRow>
        <GridRow>
            <GridColumn width="sixteen">
                <List>
                    {
                        props.trackers.map((t) => {
                            return <List.Item key={t._id}>
                                <List.Content style={{padding: '8px'}}>
                                    <List.Header>
                                        <Header color="blue" size="medium">{t.title}</Header>
                                    </List.Header>
                                    <List.Description>
                                        {t.url}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        })
                    }
                </List>
            </GridColumn>
        </GridRow>
        <Modal open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <Modal.Header>
                Ajouter un point de suivi
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
    </Grid>
}