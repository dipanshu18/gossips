import { OutlineButton } from "@repo/ui/outlineButton";
import { PrimaryButton } from "@repo/ui/primaryButton";
import { SecondaryButton } from "@repo/ui/secondaryButton";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl">Hello, world!</h1>
      <PrimaryButton text="Noice" />
      <SecondaryButton text="Good" />
      <OutlineButton text="Great" />
    </>
  );
}
