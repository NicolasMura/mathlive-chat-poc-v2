import styles from './frontend-tools-react.module.scss';

/* eslint-disable-next-line */
export interface FrontendToolsReactProps {}

export function FrontendToolsReact(props: FrontendToolsReactProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FrontendToolsReact!</h1>
    </div>
  );
}

export default FrontendToolsReact;
