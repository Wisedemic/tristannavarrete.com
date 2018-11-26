import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {

    // Setup Documents props, getting the render ctx from the server
    static async getInitialProps(ctx) {

        // Generate SSR styled-components Context
        const sheet = new ServerStyleSheet();

        // Get the page to be rendered
        const originalRenderPage = ctx.renderPage;

        // Render the page with all available styled-components found.
        ctx.renderPage = () => originalRenderPage({
            enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

        // Fetch inital Props
        const initialProps = await Document.getInitialProps(ctx);

        // Merge and return propsList
        return { ...initialProps, styles: [...initialProps.styles, ...sheet.getStyleElement()] };
    }

    // Render the doucment with any additional styles or links. 
    render() {
        return (
            <html lang='en'>
                {/* These are made global */}
                <Head>
                    {/* Metadata */}
                    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                    {/* Font Awesome */}
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous" />
                    {/* Open Sans Font */}
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" />
                </Head>
                <body>
                    {/* Our application is contained inside Main */}
                    <Main />

                    {/* Next.js Framework Logic: after the <Main /> component has mounted */}
                    <NextScript />
                </body>
            </html>
        );
    }
}