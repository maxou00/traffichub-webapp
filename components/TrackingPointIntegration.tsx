import React from "react";
import { Grid, Message, Button, Icon } from "semantic-ui-react";
import { IProject, IWebTracker } from "../core";

export function TrackingPointIntegration(props: { project: IProject, tracker: IWebTracker }) {
    const [copied, setCopied] = React.useState(false);

    let code = `
        <script 
            src="https://cdn.traffichub.co/report?tag=${props.tracker.tag}" 
            defer>
        </script>
    `;

    function onCopyScript() {
        navigator.clipboard.writeText(code).then((done) => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 3000);
        })
    }

    return <Grid container>
        <Grid.Column mobile={16}>
            <Message color="blue">
                <Message.Header>Activez le traqueur sur votre site</Message.Header>
                <p>
                    Intégrez ce point de suivi sur les pages html à suivre, en mettant la balise suivante dans la balise {'<head></head>'} <br/>
                    <code>
                        {code}
                    </code>
                </p>
                <Button disabled={copied} color={copied ? "green" : "blue"} onClick={onCopyScript} >
                    <Icon name={copied ? "check" : "copy"} style={{color: 'white'}}/>
                    {copied ? "Copié !" : "Copier"}
                </Button>
            </Message>
        </Grid.Column>
    </Grid>
}