import classes from "./event-content.module.css";

function EventContent(props: { children: React.ReactNode; content: string }) {
  return <section className={classes.content}>{props.children}</section>;
}

export default EventContent;
