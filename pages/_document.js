import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* ✅ Load Pi SDK Correctly */}
                <script
                    src="https://sdk.minepi.com/pi-sdk.js"
                    async
                    defer
                ></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
