import React from "react";
import { IProject, IWebTracker } from "../core";
import { Grid, Header, Card, Container } from "semantic-ui-react";

export function TrackingPointStats(props: { project: IProject, tracker: IWebTracker }) {
    return <div style={{ padding: '16px' }}>
        <Grid>
            <Grid.Column mobile={16}>
                <div style={{ padding: '24px' }}>
                    <Header color="grey" size="large">Vos statistiques sur {props.tracker.title} ({props.tracker.url})</Header>
                    <p>
                        2560 Visiteurs [progression / diminution] de 30%
                    </p>
                </div>
            </Grid.Column>
            <Grid.Column mobile={16} computer={10}>
                <Card fluid>
                    <Card.Header>
                        <div style={{ padding: '24px' }}>
                            <Header>Visites enregistrées</Header>
                        </div>
                    </Card.Header>
                    <Card.Content>
                        <div style={{ width: '100%', height: '400px' }}>
                            <p>Graphe</p>
                        </div>
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column mobile={16} computer={6}>
                <Card fluid>
                    <Card.Header>
                        <div style={{ padding: '24px' }}>
                            <Header>URL les plus souvent consultés</Header>
                        </div>
                    </Card.Header>
                    <Card.Content>
                        <div style={{ width: '100%', height: '400px' }}>
                            <p>Graphe</p>
                        </div>
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column mobile={16} computer={4}>
                <Card fluid>
                    <Card.Header>
                        <div style={{ padding: '24px' }}>
                            <Header>Écrans de vos visiteurs</Header>
                        </div>
                    </Card.Header>
                    <Card.Content>
                        <div style={{ width: '100%', height: '250px' }}>
                            <p>Graphe</p>
                        </div>
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column mobile={16} computer={8}>
                <Card fluid>
                    <Card.Header>
                        <div style={{ padding: '24px' }}>
                            <Header>Systèmes d'exploitation utilisés</Header>
                        </div>
                    </Card.Header>
                    <Card.Content>
                        <div style={{ width: '100%', height: '250px' }}>
                            <p>Graphe</p>
                        </div>
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column mobile={16} computer={4}>
                <Card fluid>
                    <Card.Header>
                        <div style={{ padding: '24px' }}>
                            <Header>Navigateurs utilisés</Header>
                        </div>
                    </Card.Header>
                    <Card.Content>
                        <div style={{ width: '100%', height: '250px' }}>
                            <p>Graphe</p>
                        </div>
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column mobile={16}>
                <Card fluid>
                    <Card.Header>
                        <div style={{ padding: '24px' }}>
                            <Header>Positions géographiques de vos visiteurs</Header>
                        </div>
                    </Card.Header>
                    <Card.Content>
                        <div style={{ width: '100%', height: '400px' }}>
                            <p>Graphe</p>
                        </div>
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column mobile={16}>
                <Card fluid>
                    <Card.Header>
                        <div style={{ padding: '24px' }}>
                            <Header>Journal complet des visites</Header>
                        </div>
                    </Card.Header>
                    <Card.Content>
                        <div style={{ width: '100%', height: '250px' }}>
                            <p>Tableau complet des visites avec datation</p>
                        </div>
                    </Card.Content>
                </Card>
            </Grid.Column>
        </Grid>
    </div>
}
