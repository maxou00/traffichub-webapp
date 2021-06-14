import React from "react";
import { IProject, IWebTracker } from "../core";
import { Grid, GridRow, GridColumn, Header, Button, Modal, Form, List } from "semantic-ui-react";
import { useRouter } from "next/router";

export function ProjectTrackers(props: { project: IProject, trackers: IWebTracker[] }) {

    const router = useRouter();

    return <Grid>
        <GridRow>
            <GridColumn width="sixteen">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Header size="large">Point de suivi</Header>
                    
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
    </Grid>
}