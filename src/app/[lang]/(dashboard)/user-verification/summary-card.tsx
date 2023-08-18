export interface SummaryCardProps {
  title: string;
  value: string | number;
}

export default function SummaryCard(props: SummaryCardProps) {
  const { title, value } = props;

  return (
    <div className="w-full rounded-md flex flex-col px-6 py-3 gap-4 bg-[#2C2C2E]">
      <p>{title}</p>
      <p className="font-semibold text-2xl">{value}</p>
    </div>
  );
}
