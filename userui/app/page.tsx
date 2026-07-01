import { Container, Flex, Heading } from "@radix-ui/themes";
import { auth } from "./actions";

export default async function Home() {
  const subject = await auth();
  return (
    <main>
      <Container size="1">
        <Flex direction="column" align="center">
          <Heading size="6" wrap="wrap">
            {!subject ? "Wildman Stack" : "You are now logged in"}
          </Heading>
        </Flex>
      </Container>
    </main>
  );
}
