declare global {
  interface CaneleRenderContext {
    url: string;
  }
}

export interface AccordionProps {
  items: Array<{
    title: string;
    children: JSX.Children;
  }>;
}

export const Accordion: JSX.FC<AccordionProps> = ({ items }, ctx) => {
  return (
    <div>
      <div>URL: {ctx.url}</div>

      {items.map((item) => (
        <div>
          <div>{item.title}</div>
          <div>{item.children}</div>
        </div>
      ))}
    </div>
  );
};
