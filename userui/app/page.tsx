import { Container, Flex } from "@radix-ui/themes";
import { auth } from "./actions";

export default async function Home() {
  const subject = await auth();
  return (
    <main>
      <Container size="1">
        <Flex direction="column" align="center">
          {!subject ? <h1>Wildman Stack</h1> : <h1>You are now logged in</h1>}
        </Flex>
      </Container>
    </main>
  );
}
