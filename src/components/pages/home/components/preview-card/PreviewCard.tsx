import Image from "next/image";
import { Card } from "components/Card/Card";

export function PreviewCard() {
  return (
    <Card>
      <Image
        src="/images/illustration-phone-mockup.svg"
        height={500}
        width={500}
        alt="mockup"
      />
    </Card>
  );
}
