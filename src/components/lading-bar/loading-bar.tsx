import styles from "./loading-bar.module.css";

export const LoadingBar = () => {
   return (
      <>
         <div className="fixed w-full h-[6px] bg-background top-1 left-1">
            <div className={styles.bar} />
            <div className={styles.bar} />
         </div>
      </>
   );
};
