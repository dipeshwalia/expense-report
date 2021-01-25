import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "../components/Link";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>Expense Report - Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            naked
            href="/"
          >
            Go to the main page
          </Button>
        </Box>
      </Container>
    </>
  );
}
