import React from "react";
import { IProject, IWebTracker } from "../core";
import { Grid, GridColumn, Header, Card } from "semantic-ui-react";

export function TrackingPointStats(props: { project: IProject, tracker: IWebTracker }) {
    return <div>
        <Header color="grey">Vos statistiques sur {props.tracker.url}</Header>
        2560 Visiteurs [progression / diminution] de 30%
        <Card fluid>
            <Card.Header>
                <div style={{ padding: '24px' }}>
                    <Header>Visites enregistrées</Header>
                </div>
            </Card.Header>
            <Card.Content>
                <div style={{width: '100%', height: '350px' }}>
                    <p>Graphe</p>
                </div>
            </Card.Content>
        </Card>
        <Card fluid>
            <Card.Header>
                <div style={{ padding: '24px' }}>
                    <Header>Tailles d'écran ayant affiché votre site</Header>
                </div>
            </Card.Header>
            <Card.Content>
                <div style={{width: '100%', height: '350px' }}>
                    <p>Graphe</p>
                </div>
            </Card.Content>
        </Card>
        <Card fluid>
            <Card.Header>
                <div style={{ padding: '24px' }}>
                    <Header>Systèmes d'exploitation utilisés</Header>
                </div>
            </Card.Header>
            <Card.Content>
                <div style={{width: '100%', height: '160px' }}>
                    <p>Graphe</p>
                </div>
            </Card.Content>
        </Card>
        <Card fluid>
            <Card.Header>
                <div style={{ padding: '24px' }}>
                    <Header>Navigateurs utilisés</Header>
                </div>
            </Card.Header>
            <Card.Content>
                <div style={{width: '100%', height: '160px' }}>
                    <p>Graphe</p>
                </div>
            </Card.Content>
        </Card>
        <Card fluid>
            <Card.Header>
                <div style={{ padding: '24px' }}>
                    <Header>URL les plus souvent consultés</Header>
                </div>
            </Card.Header>
            <Card.Content>
                <div style={{width: '100%', height: '160px' }}>
                    <p>Graphe</p>
                </div>
            </Card.Content>
        </Card>
        <Card fluid>
            <Card.Header>
                <div style={{ padding: '24px' }}>
                    <Header>Positions géographiques de vos visiteurs</Header>
                </div>
            </Card.Header>
            <Card.Content>
                <div style={{width: '100%', height: '160px' }}>
                    <p>Graphe</p>
                </div>
            </Card.Content>
        </Card>
        <Card fluid>
            <Card.Header>
                <div style={{ padding: '24px' }}>
                    <Header>Journal complet des visites</Header>
                </div>
            </Card.Header>
            <Card.Content>
                <div style={{width: '100%', height: '160px' }}>
                    <p>Tableau complet des visites avec datation</p>
                </div>
            </Card.Content>
        </Card>
    </div>
}
