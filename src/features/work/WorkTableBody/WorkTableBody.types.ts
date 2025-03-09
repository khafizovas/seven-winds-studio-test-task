// TODO
export interface WorkTableBodyProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  workRenderer: (props: any) => JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messageRenderer: (props: any) => JSX.Element | null;
}
