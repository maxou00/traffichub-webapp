import React from "react";
import { Grid, Message, Button, Icon } from "semantic-ui-react";
import { IProject, IWebTracker } from "../core";
import { generateObfuscatedReporter } from "../core/utils";

export function TrackingPointIntegration(props: { project: IProject, tracker: IWebTracker }) {
    const [copied, setCopied] = React.useState(false);

    let code = `
        <script 
            type="text/javascript">
            ${
                generateObfuscatedReporter(props.tracker.tag)
            }
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
                    Intégrez ce point de suivi sur les pages à suivre, en ajoutant le script suivant dans la balise {'<body></body>'} ou {'<head></head>'} <br/>
                </p>
                <Button disabled={copied} color={copied ? "green" : "blue"} onClick={onCopyScript} >
                    <Icon name={copied ? "check" : "copy"} style={{color: 'white'}}/>
                    {copied ? "Script copié !" : "Copier le script"}
                </Button>
            </Message>
        </Grid.Column>
    </Grid>
}