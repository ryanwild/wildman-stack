import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export default function InputError({
  inputError,
}: {
  inputError?: string | string[] | undefined;
}) {
  return inputError && inputError.length ? (
    <Callout.Root color="red" size="1">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      {Array.isArray(inputError) ? (
        <Callout.Text>{inputError[0]}</Callout.Text>
      ) : (
        <Callout.Text>{inputError}</Callout.Text>
      )}
    </Callout.Root>
  ) : (
    <></>
  );
}
