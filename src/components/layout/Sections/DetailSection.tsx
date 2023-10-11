function DetailSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <section className="max-w-[800px] p-4 m-auto my-5 rounded-lg shadow-custom bg-secondary-50">
      {title && <h2 className="mb-4">{title}</h2>}
      {children}
    </section>
  );
}

DetailSection.defaultProps = {
  title: null,
};

export default DetailSection;
