// === TYPESCRIPT === //
interface ActionSectionProps {
  icon: string;
  title: string;
  children: React.ReactNode;
  nbrOfActionsToDo?: number;
}

function ActionSection({
  icon,
  title,
  children,
  nbrOfActionsToDo,
}: ActionSectionProps) {
  return (
    <section className="p-4 rounded-lg shadow-custom bg-secondary-50 h-[250px] overflow-y-auto overflow-x-hidden relative">
      {nbrOfActionsToDo && nbrOfActionsToDo >= 1 ? (
        <aside className="absolute flex items-center justify-center w-8 text-white bg-red-500 rounded-full right-1 aspect-square top-1">
          <p className="font-semibold font-poppins">{nbrOfActionsToDo}</p>
        </aside>
      ) : undefined}

      <div className="flex gap-2 mb-4">
        <img src={icon} alt="Icon d'action" />
        <h1 className="text-lg font-semibold font-poppins">{title}</h1>
      </div>

      <ul className="flex flex-col gap-2">{children}</ul>
    </section>
  );
}

ActionSection.defaultProps = {
  nbrOfActionsToDo: null,
};

export default ActionSection;
