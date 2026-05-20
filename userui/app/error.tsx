"use client";

import { Button, Container, Text, Box } from "@radix-ui/themes";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      <h1>Error</h1>
      <Box py="5">
        <Text>{error.message}</Text>
      </Box>
      <Button onClick={() => reset()}>Try again</Button>
    </Container>
  );
}
