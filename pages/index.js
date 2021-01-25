import React from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import Head from "next/head";
import { Report } from "../components/Report";
import { Typography } from "@material-ui/core";

export default function Home() {
  return (
    <>
      <Head>
        <title>Expense Report - Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container style={{ margin: "20px" }}>
        <Typography variant="h6" component="h2">
          You are allowed to submit upload 5 expense
        </Typography>
        <Box display="flex" flexGrow="1" display="flex" justifyContent="center">
          <Report />
        </Box>
      </Container>
    </>
  );
}
