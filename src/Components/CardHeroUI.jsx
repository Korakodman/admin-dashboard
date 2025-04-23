import { Card, CardHeader, CardBody, Image } from "@heroui/react";

export default function CardHeroUI({ header, description, footer }) {
  return (
    <Card className="py-4 w-[250px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{header}</p>
        <small className="text-default-500">{description}</small>
        <h4 className="font-bold text-large">{footer}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2"></CardBody>
    </Card>
  );
}
