import React from "react";
import { AuthProvider } from "../components/AuthContext";
import 'semantic-ui-css/semantic.min.css';
import '../styles/globals.scss'


function MyApp({ Component, pageProps }) {
  return <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
}

export default MyApp